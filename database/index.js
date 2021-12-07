const mysql = require('mysql');

const db = mysql.createPool({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b14f3403ab38f1',
    password: 'aeeb33e3',
    database: 'heroku_0884759a7091ce7'
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