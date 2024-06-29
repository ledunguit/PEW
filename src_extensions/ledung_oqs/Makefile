CPP             = g++
RM              = rm -f
CPP_FLAGS       = -Wall -c -I. -I/usr/include/phpcpp -O2 -std=c++11

PHP_CONFIG      = $(shell which php-config)
LIBRARY_DIR		= $(shell ${PHP_CONFIG} --extension-dir)
PHP_CONFIG_DIR	= $(shell ${PHP_CONFIG} --ini-dir)
PHP_FPM_CONFIG_DIR = /usr/local/etc/php-fpm.d

LD              = g++
LD_FLAGS        = -Wall -Wl,-rpath,/usr/lib -shared -O2 -L/usr/lib
RESULT          = ledungoqs.so

PHPINIFILE		= 30-ledungoqs.ini

SOURCES			= $(wildcard *.cpp)
OBJECTS         = $(SOURCES:%.cpp=%.o)

all:	${OBJECTS} ${RESULT}

${RESULT}: ${OBJECTS}
		${LD} ${LD_FLAGS} -o $@ ${OBJECTS} -lphpcpp

clean:
		${RM} *.obj *~* ${OBJECTS} ${RESULT}

${OBJECTS}:
		${CPP} ${CPP_FLAGS} -fpic -o $@ ${@:%.o=%.cpp}

install:
		cp -f ${RESULT} ${LIBRARY_DIR}/
		cp -f ${PHPINIFILE}	${PHP_CONFIG_DIR}/
		cp -f ${PHPINIFILE}	${PHP_FPM_CONFIG_DIR}/

uninstall:
		rm ${LIBRARY_DIR}/${RESULT}
		rm ${PHP_CONFIG_DIR}/${PHPINIFILE}
		rm ${PHP_FPM_CONFIG_DIR}/${PHPINIFILE}
