const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {validationResult, body} = require('express-validator')
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET


//sign up
router.post('/signup', 
    [
        body('name').isString().withMessage('Name must be a string'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
   ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    };

    // Check for existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
     
        return res.status(400).json({ message: 'Email is already in use' });
    }

    try {
    
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        console.log(newUser)
        res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
})


router.post('/login', async (req, res) => {
    const { email, password} = req.body;
    
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
  
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });

    return res.json({
        token,
    }); 
})



module.exports = router;