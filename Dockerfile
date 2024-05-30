FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm ci --only=production

RUN ls -la /usr/src/app/*

FROM gcr.io/distroless/nodejs20-debian12

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/pictures ./pictures

EXPOSE 8000

CMD ["dist/server.js"]
