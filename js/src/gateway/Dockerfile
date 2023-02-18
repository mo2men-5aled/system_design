# define from what image we want to build from
FROM node:16

# create a directory to hold the application code inside the image
WORKDIR /app

# install your app dependencies 
COPY . /app

RUN npm install --legacy-peer-deps


# Bundle app source

EXPOSE 8080

CMD [ "npm", "start" ]
