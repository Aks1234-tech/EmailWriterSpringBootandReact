console.log("Email Writer Extension - Content Script Loaded");
function createAiButton() {
   const button = document.createElement('div');
   button.className = 'T-J J-J5-Ji aoO v7 T-I-atl L3';
   button.style.marginRight= '8px';
   button.innerHTML = 'AI Reply';
   button.setAttribute('role','button');
   button.setAttribute('data-tooltip', 'Generate AI Reply');
   return button;
}

function getEmailContent() {
   const selectors = [
      '.h7',
      '.a3s.aiL',
      '.gmail_quote',
      '[role="presentation"]'
   ];
   for(const selector of selectors) {
      const content = document.querySelector(selector);
      if(content) {
         return content.innerText.trim();
      }
   }
   return '';
}
function findComposeToolbar() {
   const selectors = [
      '.btC',
      '.aDh',
      '[role="toolbar"]',
      '.gU.Up'
   ];
   for(const selector of selectors) {
      const toolbar = document.querySelector(selector);
      if(toolbar) {
         console.log(`Compose toolbar found using selector: ${selector}`);
         return toolbar;
      }
   }
   return null;
}
function injectButton() {
   const existingButton = document.querySelector('.ai-reply-button');
   if(existingButton) existingButton.remove();
   const toolbar = findComposeToolbar();
   if(!toolbar) {
      console.log("Compose toolbar not found");
      return;
   }
   console.log("Compose toolbar found, Creating AI Button");
   const button = createAiButton();
   button.classList.add('ai-reply-button');
   // Add debug style to make button visible
   button.style.background = '#4285f4';
   button.style.color = '#fff';
   button.style.borderRadius = '4px';
   button.style.padding = '4px 12px';
   button.style.cursor = 'pointer';
   button.addEventListener('click', async () => {
      try {
         button.innerHTML = 'Generating...';
         button.disabled = true;
         const emailContent = getEmailContent();
         const response = await fetch('http://localhost:8080/api/email/generate',{
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
               emailContent: emailContent,
               tone: "professional"
            })
         });
         if(!response.ok) {
            throw new Error('API request failed');
         }

         const generatedReply = await response.text();
         const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
         if(composeBox) {
            composeBox.focus();
            document.execCommand('insertText', false, generatedReply);
         } else {
            console.error("Compose box not found");
         }
      } catch (error) {
         console.error("Error generating reply:", error);
         alert("failed to generate the reply:");
      }
      finally {
         button.innerHTML = 'AI Reply';
         button.disabled = false;
      }
   });
   toolbar.insertBefore(button, toolbar.firstChild);

}
//Mutation observer to detect changes in the DOM
const observer = new MutationObserver((mutations) => {
   for(const mutation of mutations) {
     const addedNodes = Array.from(mutation.addedNodes);
     const hasComposeElements = addedNodes.some(node => 
        node.nodeType === Node.ELEMENT_NODE && 
        (node.matches('.aDh, .btC, [role="dialog"]')
    || node.querySelector('.aDh, .btC, [role="dialog"]'))
     );
     if(hasComposeElements){
        console.log("Compose elements detected");
        setTimeout(injectButton, 500);
     }
   }
});

observer.observe(document.body, {
   childList: true,
   subtree: true
});

// Initial injection in case compose is already open
setTimeout(injectButton, 1000);