# Descripción

Walcow es una plataforma de exchange centralizado (CEX) de criptomonedas, orientada a ser sencilla y fácil de usar.

El MVP contará con una autenticación de usuario segura y funcionalidades basicas de depósito/retiro y compra/venta.

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

- GET /api/tokens/price/:id
