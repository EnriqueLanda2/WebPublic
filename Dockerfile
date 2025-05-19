FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY target/diagnostico-cds-*.jar app.jar
COPY src/main/resources/railway-env.properties .
EXPOSE 8080
CMD ["java", "-jar", "app.jar", "--spring.config.location=file:./railway-env.properties"]