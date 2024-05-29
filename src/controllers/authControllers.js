import bcrypt from 'bcrypt';
import Users from '../models/Users.js';
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
        const user = await Users.findOne({ where: { email } });
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
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000});

        // Respond with a success message and token
        res.status(200).json({
            status: 'success',
            message: 'Login successful.',
            token
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
        // Check if the user with the provided email already exists
        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ status: 'fail', message: 'Email already exists.' });
        }

        // Create the user
        await Users.create({
            name,
            phone,
            birthday,
            email,
            password: bcrypt.hashSync(password, 10)
        });

        // Return success response
        res.status(200).json({
            status: 'success',
            message: 'Register successful.'
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
    const { user_id, session_token } = req.body;

    try {
        // Check if the session token matches the one stored for the user_id (assuming session management)
        if (session_token !== "r4nd0mstr1ng") {
            return res.status(400).json({ status: 'fail', message: 'Logout failed.' });
        }

        // Perform logout actions, such as clearing session data or cookies
        // For example, if using cookies:
        res.clearCookie('token');

        // Return success response
        res.status(200).json({
            status: 'success',
            message: 'Logout successful.'
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