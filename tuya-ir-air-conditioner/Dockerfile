ARG BUILD_FROM
FROM $BUILD_FROM

RUN apk add --no-cache nodejs npm

WORKDIR /home/app

COPY . /home/app

RUN npm install

CMD [ "/home/app/run.sh" ]
