FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copia el JAR y el archivo de propiedades
COPY diagnostico-cds-0.0.1-SNAPSHOT.jar app.jar
COPY src/main/resources/railway-env.properties .  # Ajusta la ruta según tu proyecto

# Asegura permisos y expone el puerto
RUN chmod +x app.jar
EXPOSE 8080

# Inicia la aplicación con el perfil "prod" y debug (opcional)
CMD ["java", "-jar", "app.jar", "--spring.config.location=file:./railway-env.properties", "--spring.profiles.active=prod", "--debug"]