FROM node:20-alpine

WORKDIR /var/www/pokedex

COPY package.json yarn.lock ./

RUN yarn config set network-timeout 600000
RUN yarn install --verbose

COPY . .

RUN yarn build

RUN adduser -D pokeuser
RUN chown -R pokeuser:pokeuser /var/www/pokedex

USER pokeuser

RUN yarn cache clean --force

EXPOSE 3000

CMD ["yarn", "start:prod"]