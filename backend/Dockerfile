FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

COPY target/diagnostico-cds-0.0.1-SNAPSHOT.jar app.jar
COPY railway-env.properties .

EXPOSE ${PORT}

ENTRYPOINT ["java", "-jar", "app.jar", "--spring.config.location=file:./railway-env.properties"]