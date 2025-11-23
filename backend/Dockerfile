# Dockerfile para el backend Flask
FROM python:3.11-slim

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements.txt
COPY requirements.txt .

# Instalar dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación
COPY . .

# Exponer el puerto (Railway usa PORT, por defecto 5000)
EXPOSE 5000

# Usar gunicorn para producción (servidor WSGI)
# Railway inyecta PORT automáticamente, usar sh para expandir la variable
CMD sh -c 'gunicorn --bind "0.0.0.0:${PORT:-5000}" --workers 2 --threads 2 --timeout 120 app:app'

