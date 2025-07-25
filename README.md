# Proyecto de API para E-Commerce
El presente es un proyecto de API para E-Commerce desarrollado en JS sobre Node.js con Express.js, utilizando ES6 Modules.

## Proyecto en funcionamiento
El proyecto está funcionando en Vercel, accesible en la siguiente dirección:

https://nodejs-1c2025-ecommerce-api-final.vercel.app

Al tratarse de una API, se espera que sea objeto de requests a través de un programa como Postman, Imsomnia, Curl, o similar.

## Instalación en servidor propio
Paso 1 - Clonar el presente repositorio.
Paso 2 - Una vez situado en la correspondiente carpeta, instalar las dependencias mediante:
```bash
npm i
```
Paso 3 - Configurar las variables de entorno. Para ello, renombrar el archivo .env.example como .env y escribir el valor correspondiente para las variables indicadas. Muchas de estas variables implicarán que cree un proyecto en Firebase (de Firestore) para contar allí con una BD (si ya cuenta con una, podrá utilizar las definiciones de esta).
Paso 4 - Ejecutar en modo desarrollo:
```bash
npm run dev
```
## Documentación de la API
### Obtener todos los productos
- GET /api/products
- Descripción: devuelve todos los prpoductos de la BD.
- Response de ejemplo:
`status 200 OK`
```json
[
    {
        "id": "0kPdlYKgwvYv0IiEuiYy",
        "price": 60,
        "category": [
            "Software",
            "Development"
        ],
        "name": "Java Generic and Collections"
    },
    {
        "id": "2nGtSnXCtVmqxy0n3w7J",
        "price": 40,
        "category": [
            "Software",
            "Development"
        ],
        "name": "Mastering Go"
    }
]
```
### Obtener un producto por su id
- GET /api/products/0kPdlYKgwvYv0IiEuiYy
- Descripción: devuelve el poducto con id 0kPdlYKgwvYv0IiEuiYy de la BD.
- Response de ejemplo:
`status 200 OK`
```json
[
    {
        "id": "0kPdlYKgwvYv0IiEuiYy",
        "price": 60,
        "category": [
            "Software",
            "Development"
        ],
        "name": "Java Generic and Collections"
    }
]

### Loggearse
Esta opción es necesaria para obtener un token y acceder al resto de los endpoint de esta API, los cuales se encuentran en rutas protegidas. A modo de ejemplo, puede hacer uso de un usuario y password por default, a saber:
```json
{
    "email": "usuario@example.com",
    "password": "mipassword123",
}
```
- POST /auth/login
En el cuerpo de la request irá el json anterior.

### Crear un producto
- POST /api/products
No olvidar el jwt token en el header authorization (antes del token debe estar la palabra Bearer).
### Reemplazar un producto (PUT)
PUT /api/products/0kPdlYKgwvYv0IiEuiYy
(con token)
### Actualizar un producto (PATCH)
PATCH /api/products/0kPdlYKgwvYv0IiEuiYy
(con token)

## Futuras mejoras
- Mejorar el Readme.
- Limpiar el código.
- Agregar Swagger (OpenAPI) para la documentación y prueba de los endpoints.
- Agregar opciones de filtrado.
- Agregar la posibilidad de registrar nuevos usuarios (en vez de usar el hardcodeado utilizado en esta demo), con registro vía mail.
- Agregar roles.
- Agregar otras autenticaciones (OAuth, etc).
- Desarrollar un Front-End para esta API.
- Agregar una pasarela de pagos (Stripe, MercadoPago, PayPal, etc).


