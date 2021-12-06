const jwt = require('jsonwebtoken');

exports.createToken = ({ id, name }) => {
    const token = jwt.sign({ id, name }, process.env.JWT_SECRET);
    return token;
}