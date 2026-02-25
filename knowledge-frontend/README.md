# Knowledge Sharing Platform - Frontend

A modern, high-performance web application designed for technical experts to share their insights. Built with a focus on rich aesthetics, seamless user experience, and **AI-powered writing assistance**.

## 1️⃣ Approach

### Architecture Overview
The frontend is built as a Single Page Application (SPA) using **React 19** and **Vite**. It follows a service-oriented architecture where UI components are decoupled from business logic and API communication.

- **Component Layer**: Modular React components using functional patterns and hooks.
- **Service Layer**: Centralized API handlers (Axios) for seamless communication with the backend.
- **Config & Interceptors**: Global request/response management for authentication and error handling.
- **AI Integration**: A dedicated AI service layer that facilitates real-time content improvement through debounced state merging.

### Folder Structure
```text
knowledge-frontend/src/
├── components/     # UI Building blocks (Navbar, AIAssistant, Cards)
├── pages/          # View components and route handlers (Home, Dashboard, Articles)
├── services/       # API abstraction layer (Article, Auth, AI)
├── config/         # System configurations (Axios Interceptors)
├── utils/          # Standalone helper functions
├── assets/         # Global styles and static media
├── App.jsx         # Root component and Routing configuration
└── main.jsx        # Application entry point
```

### Key Design Decisions
- **Tailwind CSS 4**: Utilized for its cutting-edge utility-first approach and lightning-fast build performance.
- **React-Quill-New**: Selected to provide a robust, familiar, and customizable rich-text editing experience for technical authors.
- **Glassmorphism & Zinc Theme**: A custom design system focusing on high contrast, deep blacks, and subtle translucency for a premium "developer-centric" look.
- **Concurrent AI State Merging**: Implemented a `useRef` based merge strategy to ensure user typing is never lost while AI processing is in flight.

---

## 2️⃣ AI Usage (Mandatory Section)

### AI Tools Used
- **Antigravity (Google DeepMind)**: Used for end-to-end development, architecture planning, and feature implementation.

### Where AI Helped
- **Code Generation**: Generated highly-styled UI components like `AIAssistant` and `CreateArticle` with a focus on premium aesthetics.
- **Refactoring**: Specialized in refactoring component states to handle concurrent user input during async AI operations.
- **API Design**: Designed the `AIService` structure to be easily pluggable with various LLM providers.
- **UI Ideas**: Proposed and implemented the "Zinc & Blue" dark theme and the unified "Improve with AI" dropdown interface.
- **Refinement**: Optimized the responsive layouts for mobile and tablet views.

### Manual Reviews & Corrections
- **HTML/Quill Sanitization**: Manually reviewed and optimized the HTML merging logic to handle ReactQuill's specific tag wrapping, ensuring perfect text alignment after AI edits.
- **Navigation Logic**: Manually verified and corrected redirect flows in `EditArticle.jsx` to ensure UX consistency after saving.
- **Interceptors**: Manually configured Axios interceptors to handle 401 Unauthorized errors and redirect users to the login page.

---

## 3️⃣ Setup Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Environment Variables
The application expects the backend API to be available. By default, it communicates with `http://localhost:8080/api`. Ensure the backend is running before starting the frontend.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd knowledge-sharing-platform/knowledge-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
The frontend requires a running backend instance. Please refer to the [Backend Repository Documentation](https://github.com/Amreetsinha/knowledge-sharing-platform-backend) for instructions on setting up the Spring Boot server and database.

---
*Created with focus on technical excellence and author productivity.*
