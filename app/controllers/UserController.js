const db = require('../../database');
const UsersRepository = require('../repositories/UsersRepository');

class UserController {
    async index(req, res) {
        const sql = 'SELECT * FROM users';
        const result = await db.query(sql);
        res.send(result);
    }

    async store(req, res) {
        const { name, email, password } = req.body;

        const hasUser = await UsersRepository.findByEmail(email);

        if (hasUser) {
            return res.status(400).json({ message: 'This user already exists' });
        }

        await UsersRepository.create({ name, email, password })
        res.json({ message: 'user created' });
    }
}

module.exports = new UserController;