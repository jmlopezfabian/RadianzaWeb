# Guía de Despliegue en Railway

## Configuración del Backend

1. **Crear un nuevo proyecto en Railway**
   - Ve a [railway.app](https://railway.app)
   - Crea un nuevo proyecto
   - Conecta tu repositorio de GitHub

2. **Configurar el servicio Backend**
   - Agrega un nuevo servicio desde el repositorio
   - Railway detectará automáticamente el Dockerfile en `backend/Dockerfile`
   - O configura manualmente:
     - **Root Directory**: `backend`
     - **Dockerfile Path**: `Dockerfile`

3. **Variables de Entorno del Backend**
   Configura las siguientes variables en Railway Dashboard:
   ```
   FLASK_ENV=production
   FLASK_HOST=0.0.0.0
   PYTHONUNBUFFERED=1
   STORAGE_ACCOUNT_NAME=trabajoterminal
   STORAGE_ACCOUNT_KEY=<tu-clave-de-azure>
   CONTAINER_NAME=radianza
   BLOB_NAME=municipios_completos_limpio.csv
   CORS_ORIGINS=<url-del-frontend> (se actualizará después)
   ```
   
   **Nota**: Railway inyecta automáticamente la variable `PORT`, que el backend usará automáticamente. No es necesario configurar `FLASK_PORT` manualmente.

## Configuración del Frontend

1. **Crear servicio Frontend**
   - Agrega otro servicio desde el mismo repositorio
   - Railway detectará el Dockerfile en `frontend/Dockerfile`
   - O configura manualmente:
     - **Root Directory**: `frontend`
     - **Dockerfile Path**: `Dockerfile`

2. **Variables de Entorno del Frontend**
   ```
   REACT_APP_API_URL=<url-del-backend-en-railway>
   NODE_ENV=production
   ```

3. **Build Args**
   - En Railway, configura el build arg:
     - `REACT_APP_API_URL` = URL del backend (ej: `https://radianza-backend.railway.app`)

## Notas Importantes

- Railway asigna URLs automáticamente (ej: `https://radianza-backend.railway.app`)
- Railway inyecta automáticamente la variable `PORT` que el backend usa (ya configurado en `config.py`)
- El backend usa **gunicorn** como servidor WSGI en producción (no el servidor de desarrollo de Flask)
- Asegúrate de configurar `FLASK_ENV=production` para desactivar el modo debug
- Después de desplegar el backend, actualiza `CORS_ORIGINS` con la URL del frontend
- Después de desplegar el frontend, actualiza `REACT_APP_API_URL` con la URL del backend

## Verificación

1. Verifica que el backend responda en: `https://tu-backend.railway.app/api/health`
2. Verifica que el frontend cargue correctamente
3. Verifica que las peticiones del frontend al backend funcionen

