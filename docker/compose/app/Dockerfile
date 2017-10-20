FROM node:8

COPY ./src /src
COPY ./override.start.sh /start.sh
RUN rm -rf /src/node_modules
WORKDIR /src

EXPOSE 3003 
VOLUME /org-src

RUN yarn global add gulp

RUN yarn --flat --non-interactive; exit 0
RUN mkdir /build

RUN ln -s /src/node_modules /build/node_modules
RUN chmod +x /start.sh
RUN gulp

CMD ["/start.sh"]
