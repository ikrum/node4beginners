FROM node:6
ADD package.json package.json
RUN npm install
ADD . .
EXPOSE 3000
CMD ["sh","start.sh"]
