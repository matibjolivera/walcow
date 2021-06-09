# Descripción

Walcow es una wallet de criptodivisas orientada a ser sencilla y facil de usar, el MVP contara con una autenticación de usuario segura y funcionalidades basicas.

## Funcionalidades

- Registro de usuario

- Inicio de sesion

- Visualizacion historial compra/venta

- Transferencia dinero a wallet externa

- Conversión entre criptomonedas

- Compra de criptomoneda directa con tarjeta de credito

- Listado de criptomonedas con sus cotizaciones actuales

## Actores/roles

- Usuarios/Clientes

## Entidades
- Token/criptomoneda

- Usuario

- Wallet

## Instalación



```bash
npm install
```

```bash
npm start
```


## Endpoints

- POST /api/users/login

- POST /api/users/register

- GET /api/users/:id

- GET /api/tokens/

- GET /api/tokens/:code

- POST /api/tokens/buy

- POST /api/tokens/sell
