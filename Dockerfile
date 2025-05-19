# Usa imagen oficial de Java 17
FROM eclipse-temurin:17-jre-jammy

# Configura el workspace
WORKDIR /app

# Copia SOLO los archivos necesarios (optimización de capas)
COPY diagnostico-cds-0.0.1-SNAPSHOT.jar app.jar
COPY railway-env.properties .

# Asegura permisos y prepara el entorno
RUN chmod +x app.jar && \
    mkdir -p /app/logs && \
    touch /app/logs/application.log

# Variables críticas (ajustables desde Railway)
ENV JAVA_OPTS="-Xmx512m -Xms256m -Dlogging.file=/app/logs/application.log"
ENV SPRING_CONFIG_LOCATION="file:./railway-env.properties"

# Expone puerto y define salud
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Comando de arranque mejorado
CMD ["sh", "-c", "java ${JAVA_OPTS} -jar app.jar --spring.profiles.active=prod --spring.config.location=${SPRING_CONFIG_LOCATION}"]