FROM node:22-bookworm

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4002

CMD ["npm", "run", "dev"]
