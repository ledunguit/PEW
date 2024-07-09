ui = true

storage "file" {
    path = "/vault/data"
}

listener "tcp" {
    address = "[::]:8200"
    tls_disable = true
}

default_lease_ttl = "168h"
max_lease_ttl = "720h"