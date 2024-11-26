const express = require('express');
const app = express()
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes/indexRoutes')


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use('/', indexRoutes);
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});