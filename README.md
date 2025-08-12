# AI Email Reply Generator

An AI-powered email reply generator that integrates with Gmail to automatically generate replies using **Google Gemini API**.

This project contains:
- **email-writer-sb** → Spring Boot backend
- **email-writer-react** → Vite + React frontend
- **email-writer-extension** → Chrome Extension for Gmail

---

## ✨ Features
- Generate AI-powered email replies
- Multiple tones (Formal, Informal, Friendly)
- Chrome extension adds **AI Reply** button directly in Gmail
- Backend built with **Spring Boot**
- Frontend built with **Vite + React**
- Secure API key usage with `.env` files

---

## 📂 Folder Structure
EmailWriterSpringBootandReact/
│
├── email-writer-sb # Spring Boot backend
├── email-writer-react # React frontend
└── email-writer-extension # Chrome extension

---

## ⚙️ Prerequisites
- Java 17+ (for Spring Boot backend)
- Node.js 18+ (for React frontend)
- Google Gemini API key → [Get from Google AI Studio](https://makersuite.google.com/app/apikey)

---

## 🔑 Setting Up Your Gemini API Key
**DO NOT commit your API key to GitHub.**  
This project uses environment variables to keep it safe.

### 1. Backend (Spring Boot)
Create a file:
email-writer-sb/src/main/resources/application.properties

Add:
```properties
gemini.api.key=YOUR_GEMINI_API_KEY
2. Frontend (React + Vite)
In email-writer-react/ create a file named .env:

VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
3. Chrome Extension
In email-writer-extension/ create a file named .env:

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
🚀 How to Run
1. Backend (Spring Boot)
cd email-writer-sb
./mvnw spring-boot:run
The backend will run on http://localhost:8080.

2. Frontend (React)

cd email-writer-react
npm install
npm run dev
The frontend will run on http://localhost:5173.

3. Chrome Extension
Open Chrome and go to chrome://extensions/

Enable Developer Mode

Click Load Unpacked

Select the email-writer-extension folder

The AI Reply button will appear in Gmail

🛡️ Security
.env and application.properties files are ignored using .gitignore

Never push API keys to GitHub

Always use placeholders in public repositories

