FROM tutum/nginx
RUN rm /etc/nginx/sites-enabled/default
COPY sites-enabled/ /etc/nginx/sites-enabled
COPY certs /etc/ssl/certs
ARG SETUP_DOMAIN
RUN sed -i -e 's/DOMAIN_TO_BE_REPLACED/'"$SETUP_DOMAIN"'/g' /etc/nginx/sites-enabled/app
