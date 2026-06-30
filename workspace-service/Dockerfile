FROM node:22-bookworm

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4004

CMD ["npm", "run", "dev"]
