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

- /api/users/login

- /api/users/register

- /api/users/:id

- /api/tokens/

- /api/tokens/:code

- /api/tokens/buy/:code

- /api/tokens/sell/:code
