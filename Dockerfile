FROM node:6
RUN mkdir -p /var/log/pm2
ADD package.json package.json
RUN npm install pm2@latest -g
RUN npm install
ADD . /application
WORKDIR /application
ENV HOSTNAME node-geeks
EXPOSE  5005

CMD ["pm2","start","bin/www"]
