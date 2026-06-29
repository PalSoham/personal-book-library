const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

// Routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'BookLibrary API is running',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
