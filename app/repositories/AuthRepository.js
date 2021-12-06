class AuthRepository {
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

module.exports = new AuthRepository;