FROM httpd:2.4
COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./build/ /usr/local/apache2/htdocs/
COPY .htaccess /usr/local/apache2/htdocs/.htaccess

EXPOSE 80