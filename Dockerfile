FROM node:carbon-slim
# Create app directory
WORKDIR /git/biciun-web

# Install app dependencies
COPY package.json /git/biciun-web
RUN npm install

# Bundle app source
COPY . /git/biciun-web
RUN npm run 

EXPOSE 3000

CMD [ "npm", "start" ]