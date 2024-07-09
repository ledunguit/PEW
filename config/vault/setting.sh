#!/usr/bin/env sh

chown -v -R vault:vault /vault/data

vault server -config=/vault/config/config.hcl
