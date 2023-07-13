FROM nginx:alpine
ENV TZ='Asia/Shanghai'
ENV TIMEZONE Asia/Shanghai
RUN apk update && apk upgrade && \
    apk add tzdata bash-doc bash && \
    ln -snf /usr/share/zoneinfo/$TIMEZONE /etc/localtime && \
    echo $TIMEZONE > /etc/timezone && \
    mkdir -p /data/html/
    
COPY dist/  /data/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
