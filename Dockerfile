FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY diagnostico-cds-0.0.1-SNAPSHOT.jar app.jar
# Copia el archivo .properties desde la ruta correcta
COPY railway-env.properties .
EXPOSE 8080
CMD ["java", "-jar", "app.jar", "--spring.config.location=file:./railway-env.properties"]