FROM node:8

COPY ./src /src
WORKDIR /src

RUN yarn global add gulp
RUN yarn --flat
RUN gulp

EXPOSE 3003 

CMD ["node", "./build/express/index.js"]   


