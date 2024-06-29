FROM ubuntu:22.04 as builder

ENV PHP_VERSION=8.2

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update && apt install software-properties-common -y

RUN apt-add-repository ppa:ondrej/php && apt update

RUN apt install build-essential \
    git -y

RUN apt install -y --no-install-recommends \
    php8.2-fpm \
    php8.2-common \
    php8.2-mysql \
    php8.2-xml \
    php8.2-xmlrpc \
    php8.2-curl\
    php8.2-gd \
    php8.2-imagick \
    php8.2-cli \
    php8.2-dev \
    php8.2-imap \
    php8.2-mbstring \
    php8.2-soap \
    php8.2-zip \
    php8.2-bcmath

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

RUN php composer-setup.php --install-dir=/usr/local/bin --filename=composer

WORKDIR /app

RUN git clone https://github.com/CopernicaMarketingSoftware/PHP-CPP

WORKDIR /app/PHP-CPP

RUN make -j4
RUN make install
