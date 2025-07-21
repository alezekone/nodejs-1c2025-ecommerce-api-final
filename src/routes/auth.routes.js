import express from 'express';
const router = express.Router();

// El login va por post, nunca por get.
// Por lo dicho recién, lo siguiente es solo una prueba.
router.get('/login', (req, res) => {
    res.send('Página de login');
});

router.post('/login', (req, res) => {
    // Aquí iría la lógica para manejar el login
    res.status(200).json({
        message: 'Login exitoso',
        user: req.body // Supongamos que el usuario se envía en el body de la solicitud
    });
});

export default router;
