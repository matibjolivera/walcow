# Descripción

Walcow es una plataforma de exchange centralizada (CEX) de criptomonedas, orientada a ser sencilla y fácil de usar, en la que se provee a los usuarios de una wallet propia para operar.

El MVP contará con una autenticación de usuario segura y funcionalidades basicas de depósito/retiro y compra/venta.

## Funcionalidades

- Registro de usuario

- Inicio de sesion

- Transferencia dinero a wallet externa

- Conversión entre criptomonedas

- Compra de criptomoneda directa con tarjeta de credito

- Listado de criptomonedas con sus cotizaciones actuales

## Actores/roles

- Usuarios/Clientes

## Entidades

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
- GET /api/users

- POST /api/users/login

- POST /api/users/register

- POST /api/users/changePassword

- POST /api/users/deposit

- POST /api/users/withdrawal

- POST /api/users/data

- POST /api/users/otp

- POST /api/users/validate-email

- GET /api/tokens

- GET /api/tokens/:code

- GET /api/tokens/price/:id

- GET /api/wallets

- GET /api/wallets/total

- POST /api/wallets

- POST /api/wallets/buy

- POST /api/wallets/sell

