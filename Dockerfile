FROM node:argon

# Bundle app source
RUN mkdir -p /srv/www/reactr
WORKDIR /srv/www/reactr
COPY app/ .
