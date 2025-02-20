# Instagram Clone Project

## 📸 Project Overview
This is a full-stack Instagram clone application developed to demonstrate modern web development techniques and social media platform features.

## 🚀 Tech Stack
### Frontend
- **Framework**: React (v19)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Additional Libraries**:
  - Axios (HTTP Requests)
  - React Hot Toast (Notifications)
  - React Icons
  - JWT Decode (Authentication)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Password Encryption**: Bcrypt
- **Image Hosting**: Cloudinary
- **Database**: (To be specified)

## 🌟 Features (Planned/Implemented)
- User Authentication
- Profile Management
- Post Creation and Sharing
- Image Upload
- User Interactions (Likes, Comments)

## 🔧 Prerequisites
- Node.js (v18+)
- npm or yarn
- Git

## 🛠️ Installation

### Clone the Repository
```bash
git clone https://github.com/yourusername/instagram-clone.git
cd instagram-clone
```

### Setup Frontend
```bash
cd client
npm install
npm run dev
```

### Setup Backend
```bash
cd ../server
npm install
npm run dev
```

## 🌈 Environment Variables
Create `.env` files in both `client` and `server` directories with necessary configurations:

### Client `.env`
- `VITE_API_URL`: Backend API Base URL

### Server `.env`
- `PORT`: Server Port
- `MONGODB_URI`: Database Connection String
- `JWT_SECRET`: JSON Web Token Secret
- `CLOUDINARY_CLOUD_NAME`: Cloudinary Cloud Name
- `CLOUDINARY_API_KEY`: Cloudinary API Key
- `CLOUDINARY_API_SECRET`: Cloudinary API Secret

## 📦 Project Structure
```
instagram-clone/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── utils/
│
└── server/                 # Node.js Backend
    ├── controllers/
    ├── models/
    ├── routes/
    └── middleware/
```

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
Distributed under the MIT License. See `LICENSE` for more information.

## 🙌 Acknowledgements
- React.js Community
- Express.js
- Redux Toolkit
- Tailwind CSS

## 🚧 Project Status
🟨 **In Active Development**

*Disclaimer: This is a learning project and not intended to be a full replacement for Instagram.*