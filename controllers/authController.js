const User = require('../models/User');
const transporter = require('../config/emailConfig');

// Helper function to generate 6-digit code
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user
        user = new User({
            name,
            email,
            password
        });

        await user.save();

        res.status(201).json({
            message: 'Registration successful',
            userId: user._id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate verification code with 5-minute expiration
        const verificationCode = generateVerificationCode();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

        user.verificationCode = {
            code: verificationCode,
            expiresAt: expiresAt
        };
        await user.save();

        // Send verification email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Login Verification Code',
            text: `Your verification code is: ${verificationCode}. This code will expire in 5 minutes.`
        });

        res.json({ 
            message: 'Please check your email for verification code',
            userId: user._id 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.verifyCode = async (req, res) => {
    try {
        const { userId, code } = req.body;

        const user = await User.findById(userId);
        if (!user || !user.verificationCode) {
            return res.status(404).json({ error: 'User not found or no verification code set' });
        }

        // Check if code is expired
        if (Date.now() > user.verificationCode.expiresAt) {
            user.verificationCode = null; // Clear expired code
            await user.save();
            return res.status(400).json({ error: 'Verification code has expired' });
        }

        // Check if code matches
        if (user.verificationCode.code !== code) {
            return res.status(400).json({ error: 'Invalid verification code' });
        }

        // Clear the verification code after successful verification
        user.verificationCode = null;
        await user.save();

        // Return user data
        res.json({
            id: user._id,
            name: user.name,
            email: user.email
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Verification failed' });
    }
};
