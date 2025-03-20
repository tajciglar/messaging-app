const express = require('express');
const app = express()
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes/userRoutes')


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3001", 
  "https://tajs-messaging-app.netlify.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use('/users', indexRoutes);
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});