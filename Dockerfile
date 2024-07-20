FROM php:8.2-fpm

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update
RUN apt install -y git \
    procps \
    reflex \
    astyle \
    cmake \
    gcc \
    ninja-build \
    libssl-dev \
    python3-pytest \
    python3-pytest-xdist \
    unzip \
    xsltproc \
    doxygen \
    graphviz \
    python3-yaml \
    valgrind

RUN docker-php-ext-install pdo_mysql

COPY ./entrypoint.sh /helpers/entrypoint.sh

# Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

RUN php composer-setup.php --install-dir=/usr/local/bin --filename=composer

# Install nodejs through nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

RUN . ~/.nvm/nvm.sh && nvm install 20

RUN . ~/.nvm/nvm.sh && nvm use 20

RUN . ~/.nvm/nvm.sh && nvm alias default 20

# Clone php-cpp
WORKDIR /src

RUN git clone https://github.com/CopernicaMarketingSoftware/PHP-CPP

# Build php-cpp
WORKDIR /src/PHP-CPP

RUN make -j8
RUN make install

# Clone liboqs
WORKDIR /src

COPY ./src_extensions/liboqs /src/liboqs

# Build liboqs
WORKDIR /src/liboqs

RUN mkdir -p build
WORKDIR /src/liboqs/build

RUN cmake -GNinja ..
RUN ninja
RUN ninja install

WORKDIR /src

COPY ./src_extensions/openssl /src/openssl
# Install OpenSSL
WORKDIR /src/openssl
RUN ./config no-shared no-docs --prefix=/usr/local && make -j8 && make install

ENTRYPOINT [ "/helpers/entrypoint.sh" ]
