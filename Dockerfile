FROM node

WORKDIR /app

COPY package*.json yarn.lock /./

RUN yarn install

COPY . .

EXPOSE 3000

ENV MONGODB_USERNAME=admin
ENV MONGODB_PASSWORD=password

RUN yarn build

CMD ["yarn", "start:prod"]



