FROM nginx:alpine

COPY nginx.conf /etc/nginx/

RUN echo '<html><body><h1>Hello world!</body></html>' > /usr/share/nginx/html/index.html

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
