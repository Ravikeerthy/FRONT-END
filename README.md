# Email Builder Frontend 🎯

This is the frontend application for the **Email Builder**, designed to help users create, preview, and manage email templates efficiently. The application communicates with a backend API to provide a seamless user experience for building dynamic email templates.

## 🚀 Features
- **Template Builder 🛠️**: Create and customize email templates with rich text editing and image uploads.
- **Image Upload 📷**: Upload and manage images for inclusion in your email templates.
- **Real-Time Preview 👀**: See changes to your templates instantly as you make edits.
- **Template Management 📂**: Save, update, and delete email templates for future use.
- **HTML Export 🌐**: Download fully formatted email templates in HTML format.
- **User Authentication 🔐**: Secure login and registration with JWT-based authentication.
- **Responsive Design 📱**: Optimized for all devices, ensuring a great experience on desktops and mobiles.

## 🛠️ Tech Stack
- **React ⚛️**: Frontend framework leveraging TypeScript for type safety.
- **Axios 📡**: For making HTTP requests to the backend API.
- **React Router 🛣️**: To handle navigation and routing between different pages.
- **React Quill 🖋️**: For rich text editing and content formatting.
- **CSS Modules 🎨**: For modular and scoped styling of components.
- **Bootstrap 🎭**: Used for elegant and customizable UI components.
- **Netlify 🌐**: Deployed on Netlify for fast and reliable hosting.

## 🔧 API Endpoints
This project interacts with a backend server to handle template creation, updates, and management. Below are the major endpoints used:

### Template Management:
- `GET /api/templates`: Fetch all saved email templates for the logged-in user.
- `POST /api/templates`: Save a new email template.
- `POST /api/templates/renderAndDownloadTemplate`: Render and download a completed email template.

### Image Upload:
- `POST /api/newtemplates/uploadImages`: Upload an image to be used in an email template.

## 🔧 Setup & Installation

### Prerequisites
- Node.js
- MongoDB
- NPM

## 🌐 Live Demo
You can access the deployed website [here](https://e-mail-builder.netlify.app/).


### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
2. Install dependencies:
   ```bash
   npm install
3. Start the development server:
  ```bash
    npm run dev
