const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const http = require('http');

dotenv.config();

const initializeChatServer = require('./Routes/Chat_Socket');
const productRoutes = require('./Routes/Product_Route');
const userRoutes = require('./Routes/User_Route');
const requestRoutes = require('./Routes/Request_Route');
const transactionRoutes = require('./Routes/Transaction_Route');
const notificationsRoutes = require('./Routes/Notification_Route');

const connectDB = require('./DataBase/Connection');
connectDB();

app.use(express.json());
app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/rewear/product', productRoutes);
app.use('/rewear/user', userRoutes);
app.use('/rewear/request', requestRoutes);
app.use('/rewear/transaction', transactionRoutes);
app.use('/rewear/notification', notificationsRoutes);

// Single HTTP server that also supports WebSocket
const server = http.createServer(app);

// Attach socket to same server
initializeChatServer(server);

app.get('/health', (req, res) => {
  console.log('Health API...');
  res.send('Server Running!...');
})

// Start one server only
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running with API and WebSocket on http://localhost:${PORT}`);
});
