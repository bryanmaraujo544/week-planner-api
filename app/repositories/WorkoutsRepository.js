const db = require('../../database');

class WorkoutsRepository {
  async findAll() {
    const sql = 'SELECT * FROM workouts';
    const workouts = await db.query(sql);
    return workouts;
  }

  async create({ name, day, createdAt, wasTrained, userId }) {
    console.log({ name, day, createdAt, wasTrained, userId })
    const sql = `
      INSERT INTO workouts
      VALUES (default, ?, ?, ?, ?, ?);
    `;
    await db.query(sql, [name, day, createdAt, wasTrained, userId])

    const getUserCreated = `
      SELECT *
      FROM workouts
      WHERE name = ? AND day = ? AND user_id = ?;
    `;

    const [user] = await db.query(getUserCreated, [name, day, userId]);
    return user;
  }

  async findByUserId(userId) {
    const sql = `
      SELECT * 
      FROM workouts
      WHERE user_id = ?
    `;
    const workouts = await db.query(sql, [userId]);
    return workouts;
  }

  async update(id) {
    const sql = `
      UPDATE workouts
      SET was_trained = if(was_trained=1, 0, 1)
      WHERE id = ?
    `;

    await db.query(sql, [id]);
  }

  async delete(id) {
    const sql = `
      DELETE FROM workouts
      WHERE id = ?
    `;

    await db.query(sql, [id]);
  }

  async deleteAll(userId) {
    const sql = `
      DELETE FROM workouts
      WHERE user_id = ?;
    `;

    await db.query(sql, [userId]);
  }
}

module.exports = new WorkoutsRepository;