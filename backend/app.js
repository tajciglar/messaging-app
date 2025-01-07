const express = require('express');
const app = express()
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes/userRoutes')


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3002",  // For local development
    "https://tajs-messaging-app.netlify.app/"  // For production on Netlify
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies and authentication headers
}));
app.options('*', cors());  


app.use('/users', indexRoutes);
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});