# 📝 BloggingHub

A full-stack **Personal Blog Platform** that allows users to create, view, and manage blog posts. The platform leverages modern technologies like **Vite**, **Node.js**, **MongoDB**, and **Google Gemini API** to deliver an interactive and feature-rich blogging experience.

## 🌟 Features

### Frontend
- 🏠 **Homepage** displaying all blog posts.
- ✍️ **Blog Post Creation Form** for creating new posts.
- 📱 **Responsive Design** for a seamless experience on all devices.
- 🧭 **Navigation Menu** for intuitive site navigation.
- Built with **Vite**, **React**, **HTML5**, **CSS3**, and **JavaScript**.

### Backend
- 🔗 **REST API**:
  - `GET /api/posts` - Fetch all posts.
  - `POST /api/posts` - Create a new post.
  - `GET /api/posts/{id}` - Fetch a single post.
- 🛠️ **Node.js** backend with **Express.js** for API routes.
- 💾 **MongoDB** database for robust and scalable data storage.
- 🔒 Basic **authentication implementation** for secure access.

### LLM Integration
- ✨ Integrated with **Google Gemini API** to:
  - Generate a **blog summary** based on the title entered.
  - Auto-generate blog **content** based on the title and summary.

## 🚀 Technologies Used

| **Frontend**  | **Backend**  | **Database**  | **LLM Integration** |
|---------------|--------------|---------------|----------------------|
| React (Vite)  | Node.js      | MongoDB       | Google Gemini API    |

## 📦 Installation and Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/personal-blog-platform.git
cd personal-blog-platform
```
### 2️⃣ Install Dependencies
For the Frontend
```bash

cd frontend
npm install
```
For the Backend
```bash
Copy code
cd backend
npm install
```
### 3️⃣ Environment Variables
Create a .env file in the backend directory and add the following:

MONGO_URI=your-mongodb-connection-string

GEMINI_API_KEY=your-gemini-api-key

JWT_SECRET=your-secret-key

### 4️⃣ Start the Application
Start the Backend
```bash
cd backend
npm start
```
Start the Frontend
```bash
cd frontend
npm run dev
```
### 5️⃣ Open in Browser
Visit http://localhost:5173 to access the platform.

🎨 Screenshots

🌟 Homepage

![image](https://github.com/user-attachments/assets/8cd47982-240f-4c93-8cd9-e72b4b1e52e5)

✍️ Blog Creation

![image](https://github.com/user-attachments/assets/8f2d1f29-8031-44c4-b903-b96ab11f00cb)

🌐 Deployment

🔗 Live Demo: [(https://blogging-hub-dcb6.onrender.com/)](https://blogging-hub-dcb6.onrender.com/)

🤝 Contribution
Feel free to fork this repository, submit issues, or make pull requests. Contributions are highly appreciated! 🎉

🛠️ Future Enhancements
Adding user profiles.
Implementing tags and categories for posts.
Enhancing blog post search functionality.

👨‍💻 Developed by Satyam Shukla
💬 Feel free to reach out for collaboration or suggestions!


