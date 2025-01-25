import User from '../model/User.js';
import bcrypt from 'bcrypt';

const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) return res.status(409).json({'message': 'Username already exists!'}); 

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            "username": username,
            "password": hashedPassword
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

export default { handleNewUser };