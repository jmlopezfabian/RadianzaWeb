# Configuración de Variables de Entorno

Este documento explica cómo configurar las variables de entorno para la aplicación.

## Archivos de Configuración

- **`.env.example`**: Plantilla con ejemplos de todas las variables necesarias
- **`.env`**: Archivo real con tus credenciales (NO se sube a Git)

## Configuración Inicial

1. **Copia el archivo de ejemplo:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Edita `.env` con tus valores reales:**
   ```bash
   # Abre el archivo en tu editor
   nano .env
   # o
   code .env
   ```

3. **Configura las variables necesarias:**
   - `STORAGE_ACCOUNT_KEY`: Tu clave de acceso de Azure Blob Storage
   - `CORS_ORIGINS`: Orígenes permitidos para CORS (usa `*` para desarrollo)

## Variables Disponibles

### Azure Blob Storage

| Variable | Descripción | Valor por Defecto | Requerida |
|----------|-------------|-------------------|-----------|
| `STORAGE_ACCOUNT_NAME` | Nombre de la cuenta de Azure Storage | `trabajoterminal` | No |
| `STORAGE_ACCOUNT_KEY` | Clave de acceso de Azure Storage | - | **Sí** |
| `CONTAINER_NAME` | Nombre del contenedor en Blob Storage | `radianza` | No |
| `BLOB_NAME` | Nombre del archivo CSV | `municipios_completos_limpio.csv` | No |

### Flask

| Variable | Descripción | Valor por Defecto | Requerida |
|----------|-------------|-------------------|-----------|
| `FLASK_ENV` | Entorno de ejecución | `development` | No |
| `FLASK_HOST` | Host donde escuchar | `0.0.0.0` | No |
| `FLASK_PORT` | Puerto donde escuchar | `5000` | No |
| `FLASK_DEBUG` | Modo debug (True/False) | `False` | No |

### CORS

| Variable | Descripción | Valor por Defecto | Requerida |
|----------|-------------|-------------------|-----------|
| `CORS_ORIGINS` | Orígenes permitidos (separados por comas) | `*` | No |

**Ejemplos:**
- Desarrollo: `CORS_ORIGINS=*`
- Producción: `CORS_ORIGINS=https://tu-dominio.com,https://www.tu-dominio.com`

### Cache

| Variable | Descripción | Valor por Defecto | Requerida |
|----------|-------------|-------------------|-----------|
| `CACHE_TTL_SECONDS` | Tiempo de vida del cache en segundos | `300` | No |

## Uso con Docker

El archivo `docker-compose.yml` carga automáticamente las variables del archivo `.env`.

```bash
# Las variables se cargan automáticamente
docker-compose up
```

## Uso en Desarrollo Local

Si ejecutas el backend sin Docker:

```bash
# Instalar python-dotenv (ya está en requirements.txt)
pip install python-dotenv

# Ejecutar la aplicación
python app.py
# Las variables se cargarán automáticamente desde .env
```

## Uso en Producción

### Opción 1: Variables de Entorno del Sistema

```bash
export STORAGE_ACCOUNT_KEY="tu-clave-aqui"
export FLASK_ENV="production"
# ... etc
python app.py
```

### Opción 2: Archivo .env

Crea el archivo `.env` en el servidor con los valores de producción.

### Opción 3: Plataformas Cloud

Configura las variables de entorno en el dashboard de tu plataforma:

- **Azure App Service**: Settings > Configuration > Application settings
- **Railway**: Variables tab
- **Render**: Environment tab
- **DigitalOcean**: App Platform > Settings > Environment Variables

## Seguridad

⚠️ **IMPORTANTE:**
- **NUNCA** subas el archivo `.env` al repositorio Git
- El archivo `.env` está en `.gitignore` por seguridad
- Usa `.env.example` como plantilla para documentar las variables necesarias
- En producción, usa variables de entorno del sistema o las opciones de tu plataforma

## Verificación

Para verificar que las variables se están cargando correctamente:

```python
# En una terminal Python
from config import *
print(f"Storage Account: {STORAGE_ACCOUNT_NAME}")
print(f"Container: {CONTAINER_NAME}")
print(f"Blob: {BLOB_NAME}")
```

O ejecuta el endpoint de debug:

```bash
curl http://localhost:5000/api/debug
```

## Troubleshooting

### Error: "STORAGE_ACCOUNT_KEY no está configurada"
- Verifica que el archivo `.env` existe en el directorio `backend/`
- Verifica que la variable `STORAGE_ACCOUNT_KEY` está definida en el archivo
- No debe tener comillas alrededor del valor

### Las variables no se cargan
- Verifica que `python-dotenv` está instalado: `pip install python-dotenv`
- Verifica que el archivo `.env` está en el mismo directorio que `config.py`
- Verifica que no hay errores de sintaxis en el archivo `.env`

### Variables de Docker no funcionan
- Verifica que `env_file` está configurado en `docker-compose.yml`
- Reinicia los contenedores: `docker-compose down && docker-compose up`

