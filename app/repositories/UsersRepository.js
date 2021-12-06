const db = require('../../database');
const bcrypt = require('bcrypt');

class UsersRepository {
    async create({ name, email, password }) {
        const hashedPass = await bcrypt.hash(password, 10);
        const sql = `
            INSERT INTO users 
            VALUES (default, ?, ?, ?)
        `;

        const result = await db.query(sql, [name, email, hashedPass]);
        return result;
    }

    async findByEmail(email) {
        const sql = `
            SELECT * 
            FROM users
            WHERE users.email = ?
        `;

        const [user] = await db.query(sql, [email]);
        return user;
    }
}

module.exports = new UsersRepository;