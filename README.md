# ReWear 🌱

> **Sustainable Fashion Exchange Platform** - Give your clothes a second life while saving the planet

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green.svg)](https://www.mongodb.com/)
[![Python](https://img.shields.io/badge/Python-3.7+-blue.svg)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

ReWear is a full-stack eco-friendly clothing exchange platform that enables users to swap pre-owned fashion items while tracking their environmental impact through ML-powered sustainability metrics. Built with the MERN stack and integrated with machine learning for environmental impact prediction.

---

## 📸 Screenshots

### Homepage
![Homepage](screenshots/homepage.png)
*Clean, eco-friendly landing page with sustainable fashion messaging*

### User Dashboard
![Dashboard](screenshots/dashboard.png)
*Track your environmental impact: items listed, swaps completed, CO₂ saved, and water saved*

### Profile Management
![Profile Edit](screenshots/profile-edit.png)
*Comprehensive user profile with environmental statistics and editable information*

### API Performance Testing
![API Testing](screenshots/api-testing.png)
*Robust API endpoints tested with Postman - 6,131 requests with 48.50 req/s*

---

## 🌟 Features

### Core Functionality
- **🛍️ Smart Marketplace** - Browse and exchange clothing with multi-image support
- **🤖 ML Environmental Tracking** - Automatic CO₂ and water savings calculations based on brand and category
- **💬 Real-Time Chat** - WebSocket-based messaging between users for seamless communication
- **🔄 Exchange System** - Secure OTP-verified transactions with point-based economy
- **🎮 Gamification** - Points system rewarding sustainable behavior
- **👤 User Profiles** - Track personal environmental impact and swap history
- **❤️ Wishlist** - Save favorite items for later browsing
- **🔔 Notifications** - Real-time system notifications for requests, transactions, and messages
- **🔍 Search & Filter** - Advanced product search capabilities

### Environmental Impact
Each product exchange tracks:
- **Carbon Footprint Reduction** - ML-predicted CO₂ emissions saved (in kg)
- **Water Conservation** - ML-predicted water consumption saved (in liters)
- **User Statistics** - Cumulative environmental impact per user
- **Community Impact** - Platform-wide sustainability metrics

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 19 with Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context API
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Notifications**: Sonner toast library
- **HTTP Client**: Fetch API with credentials

### Backend
- **Runtime**: Node.js + Express.js 5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with HTTP-only cookies
- **Real-time Communication**: WebSocket (ws)
- **File Storage**: Cloudinary for image uploads
- **Security**: bcrypt password hashing, CORS protection
- **Validation**: Custom middleware for request validation

### ML Service
- **Framework**: Python Flask
- **ML Library**: scikit-learn 1.6.1
- **Model**: Pre-trained pipeline for environmental impact prediction
- **Server**: Waitress WSGI production server
- **Data Processing**: pandas for data manipulation

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v14.0.0 or higher
- **Python** 3.7 or higher
- **MongoDB** 4.4+ (local installation or MongoDB Atlas account)
- **Cloudinary Account** (for image storage)
- **npm** or **yarn** package manager

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/gopikiran22001/ReWear.git
cd ReWear
```

### 2. Backend Setup

```bash
cd Server

# Install Node.js dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
MONGODB_URI=mongodb://localhost:27017/reware
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRES_IN=3d
ORIGIN=http://localhost:5173
NODE_ENV=development
EOF
```

### 3. Frontend Setup

```bash
cd ../Client

# Install dependencies
npm install
```

### 4. Run Application

You'll need **three separate terminal windows**:

**Terminal 1 - Backend Server:**
```bash
cd Server
npm start
# Server runs on http://localhost:3000
```

**Terminal 2 - ML Server:**
```bash
cd Server
npm run ml
# ML server runs on http://localhost:5000
```

**Terminal 3 - Frontend:**
```bash
cd Client
npm start
# Frontend runs on http://localhost:5173
```

### 5. Access Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **ML Service**: http://localhost:5000

---

## 📁 Project Structure

```
ReWear/
├── Client/                    # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/          # shadcn/ui components (Button, Card, etc.)
│   │   │   └── footer.jsx   # Footer component
│   │   ├── pages/           # Page components
│   │   │   ├── Register.jsx      # User registration
│   │   │   ├── Dashboard.jsx     # User dashboard
│   │   │   ├── Profile.jsx       # User profile management
│   │   │   ├── AddItem.jsx       # Add new product
│   │   │   ├── ProductDetail.jsx # Product details view
│   │   │   ├── Requests.jsx      # Exchange requests
│   │   │   ├── Transactions.jsx  # Transaction history
│   │   │   ├── Notifications.jsx # User notifications
│   │   │   └── Chat.jsx          # Real-time messaging
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useAuth.js        # Authentication context
│   │   │   └── use-toast.js      # Toast notifications
│   │   ├── config/          # Configuration files
│   │   │   └── api.js            # API endpoints
│   │   ├── lib/             # Utility functions
│   │   │   └── utils.js
│   │   ├── App.jsx          # Main app with routing
│   │   ├── main.jsx         # Application entry point
│   │   └── index.css        # Global styles
│   ├── public/              # Static assets
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   ├── vite.config.js       # Vite configuration
│   └── package.json
│
├── Server/                    # Node.js backend application
│   ├── Cloud/
│   │   └── cloudinary.js    # Cloudinary configuration
│   ├── DataBase/
│   │   └── Connection.js    # MongoDB connection setup
│   ├── MiddleWare/          # Express middleware
│   │   ├── Authentication.js      # JWT authentication
│   │   ├── Attach_Owner.js        # Attach user to request
│   │   ├── User_Validate.js       # User input validation
│   │   ├── Product_Validate.js    # Product input validation
│   │   ├── multer.js              # File upload config
│   │   ├── upload_images.js       # Multiple image upload
│   │   └── upload_profile_picture.js # Profile picture upload
│   ├── Models/              # Mongoose schemas
│   │   ├── User_Model.js          # User schema
│   │   ├── Product_Model.js       # Product schema
│   │   ├── Request_Model.js       # Exchange request schema
│   │   ├── Transaction_Model.js   # Transaction schema
│   │   ├── OTP_Model.js           # One-time password schema
│   │   ├── Notification_Model.js  # Notification schema
│   │   ├── Message_Model.js       # Chat message schema
│   │   └── Conversation_Model.js  # Conversation schema
│   ├── Routes/              # API routes
│   │   ├── User_Route.js          # User endpoints
│   │   ├── Product_Route.js       # Product endpoints
│   │   ├── Request_Route.js       # Request endpoints
│   │   ├── Transaction_Route.js   # Transaction endpoints
│   │   ├── Notification_Route.js  # Notification endpoints
│   │   └── Chat_Socket.js         # WebSocket chat server
│   ├── index.js             # Server entry point
│   ├── ml_server.py         # ML prediction server
│   ├── model_pipeline.pkl   # Trained ML model (4.5MB)
│   ├── requirements.txt     # Python dependencies
│   └── package.json
│
├── screenshots/             # Application screenshots
├── package.json            # Root package.json
└── README.md              # This file
```

---

## 🔌 API Endpoints

### User Routes (`/reware/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | User login | ❌ |
| GET | `/login` | Check authentication status | ✅ |
| GET | `/` | Get user profile | ✅ |
| PUT | `/` | Update user profile | ✅ |
| GET | `/logout` | Logout user | ✅ |
| PUT | `/wishlist` | Add item to wishlist | ✅ |
| DELETE | `/wishlist` | Remove item from wishlist | ✅ |
| GET | `/wishlist` | Get wishlist items | ✅ |

### Product Routes (`/reware/product`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all products | ❌ |
| POST | `/` | Add new product (with ML prediction) | ✅ |
| DELETE | `/` | Delete product | ✅ |
| GET | `/search` | Search products | ❌ |
| GET | `/my-products` | Get user's products | ✅ |
| GET | `/byId` | Get product by ID | ❌ |

### Request Routes (`/reware/request`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/all` | Get all user requests | ✅ |
| GET | `/` | Get specific request | ✅ |
| POST | `/` | Create exchange request | ✅ |
| PUT | `/accept` | Accept request (creates transaction) | ✅ |
| PUT | `/reject` | Reject request | ✅ |
| PUT | `/cancel` | Cancel request | ✅ |

### Transaction Routes (`/reware/transaction`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all transactions | ✅ |
| PUT | `/` | Process transaction (OTP) | ✅ |
| DELETE | `/` | Cancel transaction | ✅ |

### Notification Routes (`/reware/notification`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get user notifications | ✅ |
| PUT | `/` | Mark notification as read | ✅ |

### WebSocket (`ws://localhost:3000/ws`)

**Connection**: `ws://localhost:3000/ws?userId=<userId>`

**Message Types**:
- `SEND_MESSAGE` - Send chat message
- `GET_MESSAGES` - Retrieve message history
- `GET_CONVERSATIONS` - Get all conversations
- `GET_CONVERSATION` - Get/create conversation
- `MARK_SEEN` - Mark message as seen
- `PING/PONG` - Connection health check

---

## 🤖 ML Environmental Impact Prediction

The ML server predicts environmental savings based on clothing brand and category using a pre-trained scikit-learn model.

### Endpoint

**POST** `http://localhost:5000/predict`

### Request Example

```json
{
  "brand": "Nike",
  "category": "shirt"
}
```

### Response Example

```json
{
  "co2_emissions": 15.2,
  "water_consumption": 1800.5
}
```

### How It Works

1. Product is added with brand and category
2. Backend calls ML service
3. ML model predicts environmental impact
4. Values stored in product document
5. User's cumulative stats updated on successful exchange

---

## 🗄️ Database Schema

### User Model

```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  address: String,
  password: String (hashed with bcrypt),
  gender: Enum ['male', 'female', 'other'],
  dateOfBirth: Date,
  profilePhoto: String (Cloudinary URL),
  role: Enum ['user', 'admin'],
  wishlist: [ProductId],
  notifications: [NotificationId],
  points: Number (default: 0),
  waterSaved: Number (default: 0),
  co2Saved: Number (default: 0),
  totalSwaps: Number (default: 0),
  timestamps: true
}
```

### Product Model

```javascript
{
  name: String,
  brand: String,
  size: String,
  condition: String,
  images: [String] (Cloudinary URLs),
  colors: [String],
  description: String,
  tags: [String],
  cost: Number (in points),
  status: Enum ['available', 'sold'],
  category: String,
  carbonFootprint: Number (ML predicted, in kg),
  waterUsage: Number (ML predicted, in liters),
  owner: { _id: UserId, name: String },
  customer: { _id: UserId, name: String },
  timestamps: true
}
```

### Request Model

```javascript
{
  owner: UserId,
  customer: UserId,
  product: ProductId,
  transactionId: TransactionId,
  status: Enum ['pending', 'accepted', 'rejected', 'cancelled'],
  createdAt: Date
}
```

### Transaction Model

```javascript
{
  customer: UserId,
  owner: UserId,
  product: ProductId,
  onetimePasscode: OTPId,
  status: Enum ['pending', 'confirmed', 'expired', 'cancelled'],
  createdAt: Date
}
```

---

## 🔐 Authentication Flow

ReWear uses JWT-based authentication with HTTP-only cookies for security.

### Registration Flow
1. User submits registration form
2. Password hashed with bcrypt (10 salt rounds)
3. User document created in MongoDB
4. Welcome notification created
5. JWT token generated and set in HTTP-only cookie
6. User automatically logged in
7. Redirected to dashboard

### Login Flow
1. User submits credentials
2. Email lookup in database
3. Password verified with bcrypt
4. JWT token generated (expires in 3 days)
5. Token set in HTTP-only cookie
6. User data returned (excluding password)
7. Redirected to dashboard

### Protected Routes
1. Client checks for user in localStorage
2. Server validates JWT from cookie
3. User data attached to request object
4. Route handler processes request

### Logout Flow
1. HTTP-only cookie cleared
2. localStorage cleared
3. Session storage cleared
4. Redirected to homepage

---

## 🔄 Key User Flows

### Product Exchange Flow

```
1. User A lists a product
   ↓
2. ML service predicts environmental impact
   ↓
3. Product saved with CO₂ and water savings
   ↓
4. User B sends exchange request
   ↓
5. User A receives notification
   ↓
6. User A accepts request → Transaction created
   ↓
7. User B generates OTP
   ↓
8. User B shares OTP with User A (offline)
   ↓
9. User A verifies OTP
   ↓
10. Points transferred (User B → User A)
    ↓
11. Product marked as sold
    ↓
12. Environmental stats updated for both users
    ↓
13. Both users receive completion notification
```

### Real-Time Chat Flow

```
1. User connects to WebSocket with userId
   ↓
2. User requests conversation with product owner
   ↓
3. Server finds or creates conversation
   ↓
4. Conversation details sent to user
   ↓
5. User sends message
   ↓
6. Message saved to database
   ↓
7. Conversation's lastMessage updated
   ↓
8. Message sent to receiver (if online)
   ↓
9. Sender receives confirmation
```

---

## 🔐 Environment Variables

### Server (.env)

Create a `.env` file in the `Server` directory:

```env
# Cloudinary Configuration
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

# Database
MONGODB_URI=mongodb://localhost:27017/reware
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/reware

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_minimum_32_characters
JWT_EXPIRES_IN=3d

# CORS Configuration
ORIGIN=http://localhost:5173

# Environment
NODE_ENV=development
```

### Client (.env.local) - Optional

Create a `.env.local` file in the `Client` directory if you need custom API URLs:

```env
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

---

## 📦 Dependencies

### Client Dependencies

```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.7.0",
  "@radix-ui/react-label": "^2.1.7",
  "@radix-ui/react-slot": "^1.2.3",
  "@radix-ui/react-tabs": "^1.1.12",
  "@radix-ui/react-toast": "^1.2.14",
  "axios": "^1.11.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "lucide-react": "^0.525.0",
  "sonner": "^2.0.6",
  "tailwind-merge": "^3.3.1",
  "tailwindcss-animate": "^1.0.7"
}
```

### Server Dependencies

```json
{
  "express": "^5.1.0",
  "mongoose": "^8.16.3",
  "bcrypt": "^6.0.0",
  "jsonwebtoken": "^9.0.2",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^17.2.0",
  "cloudinary": "^2.7.0",
  "multer": "^2.0.1",
  "ws": "^8.18.3",
  "nodemon": "^3.1.10"
}
```

### ML Service Dependencies

```
flask
pandas
scikit-learn==1.6.1
waitress
joblib
```

---

## 🧪 Testing

### Backend API Testing

The API has been thoroughly tested using Postman:

- **Total Requests**: 6,131
- **Requests/Second**: 48.50
- **Average Response Time**: 447ms
- **P90**: 1,787ms
- **P95**: 1,868ms
- **P99**: 1,987ms
- **Error Rate**: 0.00%

![API Testing Results](screenshots/api-testing.png)

### Running Tests

```bash
# Backend tests
cd Server
npm test

# Frontend tests
cd Client
npm test
```

---

## 📦 Deployment

### Backend Deployment (Node.js + Python)

#### Using PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start Node.js server
cd Server
pm2 start index.js --name "reware-api"

# Start ML server
pm2 start ml_server.py --name "reware-ml" --interpreter python3

# Save PM2 configuration
pm2 save
pm2 startup
```

#### Using Docker

```dockerfile
# Dockerfile for Node.js backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

```dockerfile
# Dockerfile for ML service
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "ml_server.py"]
```

### Frontend Deployment

```bash
cd Client
npm run build
# Deploy dist/ folder to:
# - Vercel
# - Netlify
# - AWS S3 + CloudFront
# - GitHub Pages
```

### Environment Variables for Production

Update `.env` for production:

```env
NODE_ENV=production
ORIGIN=https://your-production-domain.com
MONGODB_URI=mongodb+srv://...
```

---

## 🎨 Design System

ReWear features an eco-friendly design system with:

### Color Palette
- **Primary Green**: `hsl(142 76% 36%)` - Main eco-green
- **Eco Shades**: 50-900 gradient scale
- **Secondary**: `hsl(140 20% 92%)` - Soft sage
- **Accent**: `hsl(35 40% 88%)` - Warm earth tone

### Typography
- **Hero Heading**: 36px-72px (responsive)
- **Section Headings**: 30px
- **Body Text**: 18-20px
- **System Font**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto

### Components
- Built with shadcn/ui and Radix UI
- Tailwind CSS for styling
- Responsive design (mobile-first)
- Accessibility-focused (WCAG AA compliant)

For complete design documentation, see [UI-DOCUMENTATION.md](Client/UI-DOCUMENTATION.md)

---

## 🤝 Contributing

We welcome contributions to ReWear! Here's how you can help:

### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/ReWear.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Wait for review

### Code Style Guidelines

- **JavaScript**: Use ES6+ syntax
- **React**: Functional components with hooks
- **Naming**: camelCase for variables, PascalCase for components
- **Comments**: Document complex logic
- **Commits**: Use conventional commit messages

---

## 📝 License

This project is licensed under the **ISC License**.

---

## 👥 Team

**Scout Regiment Team**

- **Lead Developer**: [Gopi Kiran](https://github.com/gopikiran22001)
- **Email**: gopikiran22001@gmail.com

---

## 🔮 Roadmap

### Phase 1 - Current ✅
- [x] User authentication and profiles
- [x] Product listing and browsing
- [x] Exchange request system
- [x] OTP-verified transactions
- [x] Real-time chat
- [x] ML environmental impact prediction
- [x] Wishlist functionality
- [x] Notification system

### Phase 2 - In Progress 🚧
- [ ] Mobile app development (React Native)
- [ ] Advanced ML recommendations (personalized suggestions)
- [ ] Social features (reviews, ratings, user following)
- [ ] Enhanced search with filters
- [ ] Admin dashboard with analytics

### Phase 3 - Planned 📋
- [ ] Payment integration (for premium features)
- [ ] Multi-language support
- [ ] Advanced analytics API
- [ ] Community forums
- [ ] Sustainability badges and achievements
- [ ] Integration with local recycling centers

---

## 📧 Support

For issues, questions, or suggestions:

- **GitHub Issues**: [Create an issue](https://github.com/gopikiran22001/ReWear/issues)
- **Email**: Contact through GitHub profile
- **Documentation**: Check the [Wiki](https://github.com/gopikiran22001/ReWear/wiki)

---

## 🌍 Environmental Impact

### Platform Statistics (Example)

- **CO₂ Saved**: 12,847 kg
- **Water Saved**: 985,432 liters
- **Users Joined**: 2,847
- **Items Swapped**: 5,692

*Every swap makes a difference. Together, we're building a more sustainable future.*

---

## 🙏 Acknowledgments

- **shadcn/ui** - Beautiful UI components
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Cloudinary** - Image hosting and optimization
- **MongoDB** - Flexible database solution
- **scikit-learn** - Machine learning library

---

## 📚 Additional Resources

- [API Documentation](Server/README.md)
- [UI Design System](Client/UI-DOCUMENTATION.md)
- [Setup Guide](Server/setup.md)
- [Contributing Guidelines](CONTRIBUTING.md)

---

<div align="center">

**Made with 💚 for a sustainable future**

*ReWear - Transforming fashion consumption through technology and community*

[⬆ Back to Top](#rewear-)

</div>
