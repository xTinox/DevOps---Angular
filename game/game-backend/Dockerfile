FROM maven:3.8.3-openjdk-17

WORKDIR /app
COPY . .

RUN mvn package

EXPOSE 4445

CMD ["java", "-jar","-Dserver.port=4445","/app/target/game-backend-0.0.1.jar"]
