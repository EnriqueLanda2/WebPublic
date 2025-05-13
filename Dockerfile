FROM eclipse-temurin:17-jdk-jammy  # Imagen con Java 17
WORKDIR /app
COPY diagnostico-cds-0.0.1-SNAPSHOT.jar app.jar
CMD ["java", "-jar", "app.jar"]