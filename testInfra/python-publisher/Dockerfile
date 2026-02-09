FROM python:3.11-alpine

WORKDIR /app

# Copiar requirements
COPY requirements.txt .

# Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar script
COPY publisher.py .

# Ejecutar el script
CMD ["python", "publisher.py"]