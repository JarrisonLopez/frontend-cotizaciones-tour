# Frontend Cotizaciones Tour

Frontend en React + Vite para consumir el backend de cotizaciones.

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre:

```txt
http://localhost:5173
```

## Conectar con backend local

Por defecto consume:

```txt
http://localhost:3000
```

Asegúrate de tener corriendo el backend con:

```bash
npm start
```

## Conectar con backend de Render

Crea un archivo `.env` en la raíz del frontend:

```env
VITE_API_URL=https://tu-backend.onrender.com
```

Luego ejecuta:

```bash
npm run dev
```

## Endpoints usados

- `POST /api/cotizar`
- `POST /api/cotizar/pdf`

## Importante

El PDF se descarga como archivo usando `fetch` y `Blob`, por eso el backend debe tener habilitado CORS.
