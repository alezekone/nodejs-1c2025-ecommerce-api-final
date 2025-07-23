import jwt from 'jsonwebtoken';

const defaultUser = {
    id: 1,
    email: 'usuario@example.com',
    password: 'mipassword123',
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (email === defaultUser.email && password === defaultUser.password) {
        const payload = { id: defaultUser.id};
        const expiration = {expiresIn: '60 days'};

        // const token = jwt.sign({ id: defaultUser.id, email: defaultUser.email }, 'secretKey', { expiresIn: '1h' });
        const token = jwt.sign(payload, process.env.JWT_SECRET, expiration);
        return res.json({ token });
    }

    return res.status(401).json({ message: 'Credenciales inválidas' });
}