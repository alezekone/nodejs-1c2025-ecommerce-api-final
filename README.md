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
- GET /api/product/0kPdlYKgwvYv0IiEuiYy
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
```
### Loggearse
- POST /auth/login
    (En el cuerpo de la request irá el json que se muestra a continuación. Se trata de usuario y password por default.)
```json
{
    "email": "usuario@example.com",
    "password": "mipassword123",
}
```
- Descripción: esta opción permite obtener un token y acceder al resto de los endpoints de esta API, los cuales se encuentran en rutas protegidas.
- Response de ejemplo:
`status 200 OK`
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUzNDEzNDc4LCJleHAiOjE3NTg1OTc0Nzh9.MJFYAHyCjAkAaWIOHfBIH0R8QU9xSN6JchrTbWTOsU4"
}
```

### Crear un producto
- POST /api/product
(ruta protegida -> usar el jwt token en el header authorization)
- Descripción: crea un nuevo poducto en la BD.
- Response de ejemplo:
`status 201 Created`
```json
{
    "message": "Producto creado exitosamente",
    "product": {
        "id": "P88dkNYJpLT1k3fcm2b8",
        "name": "Perioperative Medicine - Vol II",
        "price": 100,
        "category": [
            "Medical",
            "Surgery"
        ]
    }
}
```
### Reemplazar un producto (PUT)
- PUT /api/product/0kPdlYKgwvYv0IiEuiYy
(ruta protegida -> usar el jwt token en el header authorization)
- Response de ejemplo:
    - Caso 1: Si el producto existía, lo reemplaza. En este caso, las response será: `status 204 No Content`
    - Caso 2: Si el producto no existía, lo crea (con el id que la BD decida, no con el proporcionado en la URL). Este caso, una response podría ser: `status 201 Created`

### Actualizar un producto (PATCH)
- PATCH /api/product/0kPdlYKgwvYv0IiEuiYy
(ruta protegida -> usar el jwt token en el header authorization)
- Response de ejemplo:
    - Caso 1: Si el producto existía, lo actualiza haciendo un merge del producto acutal con la información de producto sumunistrada en el body de la request. En este caso, las response será: `status 204 No Content`
    - Caso 2: Si el producto no existía, no hace nada. La response será: `status 400 Bad Request`

### Borrar un producto (DELETE)
- DELETE /api/product/0kPdlYKgwvYv0IiEuiYy
(ruta protegida -> usar el jwt token en el header authorization)
- Response de ejemplo:
    - Caso 1: Si el producto existía, lo elimina de la BD. En este caso, las response será: `status 204 No Content`
    - Caso 2: Si el producto no existía, no hace nada. La response será: `status 404 Not Found`

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


