FROM node:20 as development

WORKDIR /app

COPY tsconfig*.json ./
COPY package*json ./
COPY nest-cli*.json ./

RUN npm ci

COPY src/ src/
COPY .development.env ./

RUN npm run build

FROM node:20 as production

WORKDIR /app

COPY package*json ./

RUN npm ci --omit=dev

COPY --from=development /app/dist ./dist/

EXPOSE 3000

CMD ["npm", "run", "start:prod"]