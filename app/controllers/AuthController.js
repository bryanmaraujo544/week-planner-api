const UsersRepository = require("../repositories/UsersRepository");
const { createToken } = require("../utils/createToken");
const bcrypt = require('bcrypt');

class AuthController {
    
    async login(req, res) {
        const { email, password } = req.body;
        console.log({ email, password });
        const user = await UsersRepository.findByEmail(email);
        
        if (!user) {
            return res.status(400).json({ message: 'Não existe nenhum usuário com este email', token: null });
        }

        const passwordHashed = user.password;
        const isPasswordCorrect = await bcrypt.compare(password, passwordHashed);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Senha incorreta', token: null });
        }

        const token = await createToken({ id: user.id, name: user.name });
        res.json({ message: 'user logged-in', token });
    }
}

module.exports = new AuthController;