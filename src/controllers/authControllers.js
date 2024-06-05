import bcrypt from 'bcrypt';
import users from '../models/Users.js';
import jwt from 'jsonwebtoken';

async function login(req, res) {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ 
            status: 'fail',
            message: 'Email and password are required.' 
        });
    }

    try {
        // Find the user by email
        const user = await users.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ 
                status: 'fail',
                message: 'Invalid email or password.' 
            });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ 
                status: 'fail',
                message: 'Invalid email or password.' 
            });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000});

        // Respond with a success message and token
        res.status(200).json({
            status: 'success',
            message: 'Login successful.',
            body: { id: user.id, name: user.name, email: user.email, token }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message 
        });
    }
}

async function register(req, res) {
    const { name, phone, birthday, email, password } = req.body;

    try {
        // Check if user & phone is available
        const existingEmail = await users.findOne({ where: { email } });
        const existingPhone = await users.findOne({ where: { phone } });
        if (existingEmail) {
            return res.status(400).json({ status: 'fail', message: 'Email already exists.' });
        } else if (existingPhone) {
            return res.status(400).json({ status: 'fail', message: 'Phone number already exists.' });
        }

        // Create the user
        const newUser = await users.create({
            name,
            phone,
            birthday,
            email,
            password: bcrypt.hashSync(password, 10)
        });

        // Generate JWT
        const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Return success response
        res.status(200).json({
            status: 'success',
            message: 'Register successful.',
            body: { id: newUser.id, email: newUser.email, token }
        });
    } catch (error) {
        // Handle any errors
        console.error('Error registering user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

async function logout(req, res) {
    const { user_id } = req.body;
    console.log("token: " + req.body.token);    
    try {
        const user = await users.findOne({ where: { user_id } });
        if (!user) {
            return res.status(400).json({ status: 'fail', message: 'User ID not found.' });
        }

        // Return success response
        res.status(200).json({
            status: 'success',
            message: 'Logout successful.',
            body: { id: user.id, token: "" }
        });
    } catch (error) {
        // Handle any errors
        console.error('Error logging out user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

export default { register, login, logout };