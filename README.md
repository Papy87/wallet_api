Instractions
The application consists of 4 docker containers (rabbitmq, mongodb, wallet-api, wallet-processor). In order for the application to work, a docker image must be created and run. Below are the instructions

1.Install Docker (If you have docker on your machine you can skip this step).
  Website for downlaod: https://www.docker.com/products/docker-desktop/
2.Create docker network (If you already did this for wallet-processor you don't need to do it again).
  COMMAND: docker network create wallet-network
3.Create and run rabbitmq Image (If you already did this for wallet-processor you don't need to do it again).
  COMMAND: docker run --name rabbitmq --hostname rabbitmq -p 5672:5672 -p 15672:15672 -e RABBITMQ_DEFAULT_PASS=admin -e RABBITMQ_DEFAULT_USER=admin -v rabbit:/data/rabbitmq -d --network wallet-network rabbitmq:3-management
4.Create and run MongoDb image(If you already did this for wallet-processor you don't need to do it again).
  COMMAND: docker run --name mongodb -e MONGO_INITDB_DATABASE=wallets -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password -v data:/data/db --rm -d --network wallet-network mongo
5.Create Wallet API Image ( you need to be in folder where is the code for wallet api):
  COMMAND: docker build -t wallet-api .
6. Run Wallet API Image.
  COMMAND: docker run -p 3000:3000 -d --name wallet-api --network wallet-network wallet-api

