<?php

$sig = new LDSignature("dilithium3");

$sig->generate_key_pair();
$sig->generate_key_pair();

$sig->sign("test.txt", "signature.bin");
$sig->verify("test.txt", "signature.bin");

echo "Passed\n";
