#!/bin/sh

set -e

echo "Starting entrypoint.sh"

# Create reflex config directory
mkdir -p /src/reflex

# Run PHP-FPM background
php-fpm &

# Get PHP-FPM PID
PHP_FPM_PID=$!

echo "PHP-FPM PID: ${PHP_FPM_PID}"

# Create reflex config
cat << EOF > /src/reflex/reflex.conf
-r '\.(cpp|h)$' -s -- sh -c "make -j8 -B && make install && kill -USR2 ${PHP_FPM_PID}"
EOF

echo "Starting reflex..."

cd /src_extensions/ledung_oqs
reflex -c /src/reflex/reflex.conf

