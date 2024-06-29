FROM php:7.4-fpm

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update
RUN apt install git procps reflex -y

COPY ./entrypoint.sh /helpers/entrypoint.sh

# Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

RUN php composer-setup.php --install-dir=/usr/local/bin --filename=composer

# Clone php-cpp
WORKDIR /src

RUN git clone https://github.com/CopernicaMarketingSoftware/PHP-CPP

# Build php-cpp
WORKDIR /src/PHP-CPP

RUN make -j8
RUN make install

ENTRYPOINT [ "/helpers/entrypoint.sh" ]
