FROM node:18.16 as build

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

COPY . .

RUN npm i -g prisma

# RUN npx prisma migrate dev

# RUN npx prisma generate

EXPOSE 3001

# CMD ["npm", "run", "start:dev"]
CMD ["sh", "-c", "npm run prisma:generate && npm run prisma:migrate && npm run start:dev"]