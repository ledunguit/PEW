<?php

$sig = new LDSignature("dilithium3");

$key_pair = $sig->generate_key_pair();

var_dump($key_pair);
// $sig->generate_key_pair("./test/generate/public.bin", "secret.bin", "DER");

echo "Passed\n";
