# Usa la imagen oficial de OpenJDK 17
FROM eclipse-temurin:17-jdk-jammy

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copia el JAR al contenedor (asegúrate de que el nombre coincida)
COPY diagnostico-cds-0.0.1-SNAPSHOT.jar app.jar

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "app.jar"]