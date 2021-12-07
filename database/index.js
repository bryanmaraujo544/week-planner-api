const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'week_planner'
});

exports.query = async (query, values = []) => {
    try {
        const result = await new Promise((resolve, reject) => {
            db.query(query, values, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
        console.log({ result });
        return result;
    } catch (err) {
        console.log('This err happend on db query', err);
    }
};