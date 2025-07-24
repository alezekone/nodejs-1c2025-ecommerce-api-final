import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    // Asumiendo que el token se envía en el header Authorization...
    const token = req.headers['authorization']?.split(' ')[1];
    // console.log(req.headers);

    if (!token) {
        return res.status(401).json(
            { 
                message: 'Token no proporcionado',
                /*headers: req.headers*/
            });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        next();
    });
}
