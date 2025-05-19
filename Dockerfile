FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copia el JAR y el archivo de propiedades
COPY diagnostico-cds-0.0.1-SNAPSHOT.jar app.jar
COPY railway-env.properties .

# Puerto expuesto (debe coincidir con tu aplicación Spring Boot)
EXPOSE 8080

# Comando de ejecución
CMD ["java", "-jar", "app.jar", "--spring.config.location=file:./railway-env.properties"]