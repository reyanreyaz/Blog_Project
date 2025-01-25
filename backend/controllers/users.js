import User from "../model/User.js";

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users.length) {
            return res.status(204).json({ message: 'No users found!' });
        }
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

export default { getUsers }