FROM node:11.1.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#RUN npm install
# If you are building your code for production
#ENV NODE_ENV production
RUN npm ci --only=production

# Bundle app source
COPY . .

# env
ENV PRIVATE_KEY /tmp/.ssh/node-auth-private.key

ENV IISUSER a-million-projects
ENV SUBJECT some@user.com
ENV AUDIENCE http://admin.a-million-projects.com
ENV EXPIRESIN 12h

ENV MONGODB_URI "mongodb://mongo:27017/a-million-projects"
ENV PORT 3000

#expose
EXPOSE 3000

CMD [ "npm", "start" ]
