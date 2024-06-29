#!/bin/bash
read -p "Enter the name of the site you want to sign (example: mydomain.com): " site
echo "You enter sitename: $site"

read -p "Enter the name of the root CA (example: rootca): " rootca_name
echo "You enter sitename: $rootca_name"

echo "Generating private key for site $site..."
sleep 1
openssl ecparam -name secp384r1 -genkey -noout -out $site.key
echo "Generating CSR for site $site..."
sleep 1
openssl req -new -key $site.key -out $site.csr -subj "/CN=$site"
echo "Generating subjectAltName for site $site..."
sleep 1
cat << EOF > $site.ext
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = $site
EOF
echo "Generating certificate for site $site..."
sleep 1
openssl x509 -req -in $site.csr -CA $rootca_name.pem -CAkey $rootca_name.key -CAcreateserial \
-out $site.crt -days 1825 -sha256 -extfile $site.ext
mkdir $site
mv $site.key $site.crt $site.ext $site.csr $site/

echo "Done!"