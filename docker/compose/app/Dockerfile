FROM node:8

COPY ./src /src
ARG START_SCRIPT
RUN echo ${START_SCRIPT}
COPY ${START_SCRIPT} /start.sh
RUN ls /start.sh
RUN cat /start.sh
RUN rm -rf /src/node_modules
WORKDIR /src

EXPOSE 3003 
VOLUME /org-src
VOLUME /dist

RUN yarn global add gulp

RUN yarn --flat --non-interactive; exit 0
RUN yarn run lint
RUN yarn run test:coverage

RUN mkdir /build

RUN ln -s /src/node_modules /build/node_modules
RUN chmod +x /start.sh
RUN gulp

CMD ["/start.sh"]
