# AI Email Reply Generator

An AI-powered email reply generator that integrates with Gmail to automatically generate replies using **Google Gemini API**.

This project contains:
- **email-writer-sb** → Spring Boot backend
- **email-writer-react** → Vite + React frontend
- **email-writer-extension** → Chrome Extension for Gmail

---

## ✨ Features
- Generate AI-powered email replies instantly
- Choose different tones (Formal, Informal, Friendly)
- Chrome extension adds **AI Reply** button directly in Gmail
- Backend built with **Spring Boot**
- Frontend built with **Vite + React**
- Secure API key usage with `.env` files

---

## 📂 Folder Structure
```
EmailWriterSpringBootandReact/
│
├── email-writer-sb          # Spring Boot backend
├── email-writer-react       # React frontend
└── email-writer-extension   # Chrome extension
```

---

## ⚙️ Prerequisites
- Java 17+ (for Spring Boot backend)
- Node.js 18+ (for React frontend)
- Google Gemini API key → [Get your key here](https://makersuite.google.com/app/apikey)

---

## 🔑 Setting Up Your Gemini API Key
**Important:** DO NOT commit your API key to GitHub.  
This project uses environment variables to keep it safe.

### 1. Backend (Spring Boot)
Create the file:
```
email-writer-sb/src/main/resources/application.properties
```
Add:
```properties
gemini.api.key=YOUR_GEMINI_API_KEY
```


---

## 🚀 How to Run

### 1. Backend (Spring Boot)
```bash
cd email-writer-sb
./mvnw spring-boot:run
```
Backend runs on: `http://localhost:8080`

---

### 2. Frontend (React)
```bash
cd email-writer-react
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

### 3. Chrome Extension
1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load Unpacked**
4. Select the `email-writer-extension` folder
5. The **AI Reply** button will appear in Gmail

---

## 🛡️ Security Notes
- `.env` and `application.properties` are ignored via `.gitignore`
- Never push API keys to public repositories
- Always use placeholders like `YOUR_GEMINI_API_KEY` in committed files

---

## 📜 License
This project is licensed under the MIT License.
