<?php
$signature = new LDSignature();

# Generate key pair PEM
$signature->generate_key_pair("public_key.pem", "secret_key.pem", "PEM");

# Generate key pair DER
$signature->generate_key_pair("public_key.bin", "secret_key.bin", "DER");

# Load key pair PEM
$check = $signature->load_key_pair("public_key.pem", "secret_key.pem", "PEM");
var_dump($check);

# Sign and verify
var_dump($signature->sign("test.txt", "signature.bin"));
var_dump($signature->verify("test.txt", "signature.bin"));

# Load key pair DER
$check = $signature->load_key_pair("public_key.bin", "secret_key.bin", "DER");
var_dump($check);

# Sign and verify
var_dump($signature->sign("test.txt", "signature.bin"));
var_dump($signature->verify("test.txt", "signature.bin"));

# Load public key PEM from file
$check = $signature->load_public_key_from_file("public_key.pem", "PEM");
var_dump($check);
var_dump($signature->verify("test.txt", "signature.bin"));

# Load public key DER from file
$check = $signature->load_public_key_from_file("public_key.bin", "DER");
var_dump($check);
var_dump($signature->verify("test.txt", "signature.bin"));

# Load secret key PEM from file
$check = $signature->load_secret_key_from_file("secret_key.pem", "PEM");
var_dump($check);

# Load secret key DER from file
$check = $signature->load_secret_key_from_file("secret_key.bin", "DER");
var_dump($check);

# Load public key PEM from string
$check = $signature->load_public_key_from_string("-----BEGIN PUBLIC KEY-----
OsHQ8bUrOYTWC4BryygGP7zZ87uYfxbdCTo+oL/gcM1lz2gd0XaF1I5IKLvehzA6
RcLV+4FiNa2cOamn1SPQl/ruxYoISI48F6kwwL0YhA5430KhxX3/+tyP1Wks6vs+
4Gw4WjgQy850nHhJ7+mEYWZNmTLoWJ1MgefabSdDUp4yZSEOMYJIq5LxjJj2E66M
kjDgVZ0S70Vt3KEIrXxMMCx7Cf5HbcC2gInBtI/gXaJEKCm3l5fbEWx26k5+3cTZ
bMX47hK9gd+1DbdS16q9LIs1l30wZG6QscYYX9r3HHXeF4FObCHbKiA03mKeXOQ+
rx8qzLwNi4pI0LzrJQNOR4rh7Nm8yh3tDRI8VepNqMBpeAfPuCJlqawQfOmHzfTZ
DQskzzHuJHfXxPYV0ZPzI/tzsCGawoi6CGmsUcih1isL7ZkKYW4Py4W0MwSQ8K6d
n6q0anILiK+x4gS9OQXGsXE4vUOBpN6zROUy/l41sIhrNW25gq92qO62RnKxcNQf
R1dozePQrupOwter0Tk4SKCaQDlvmZEnTNuFug10Kl4D0GyDr+Zubs7iyJi+GKw9
8qPe0u0359lgR/1fz/MkhUjuUs9xp5dK65vMpmgjnkmmkB2jWx8IBJKt9lZFDQa6
cG0chNn5cTo7mQR5iYMtsmitw09i2dQ/68UC+qlIZfRo5Wcb1tIzS+ifXN0bjqwK
puSHMay9BlBKoQb17vpUnoxaAQCT6VVD3rMApzGVSRDbtIL9DblXRCW+Jw/Titmm
FTb4k4IVycHPQO+omEASTW4BpNC3X9cZ3a3bsTMq4/snIbqkm4ajC/7iNDgkeVEJ
1x1JgGb4o3Efx9y9bnPNDhXwXTCBi9P0H8CbkWHivrJ94l5C3ChYxfmYH7EAaKC2
V8myc2uiK4PQwidzHEFFf98+girriA5Ul5xyr2YD2EohqXFlXuekrBxpVLGM0kAF
IUrnOIyHvd7nTtiZsmj6FIdZPSd9aCrBlK2kM8gWY+C0N5xjQZ5ePwjp5UzyM3NJ
Aip7f5qV8qE6RnwhJpEzewJ7S4ZmxMF+gWeleYjvcnH+rgEB4UogJPix2/yKq+/F
q5kT4NwYe24K23pK9VthpMrjZrTbGZ2a4PBWE6oFVwB80TzUX6uDmhAWiou3HDvX
svlBybkuiuamhgQu9yZn3bfM9LEGUK46dUt2WERrfS7Da5Wi70xza9eJ/bEI4ujc
tl5oxx4Nfw8PoA3kyV92aTkm8edEQkJSQayMexyecBn5JemqSetf9wXKSYWpjKQC
/6LBEKhpu1QHWq2TBsHdBG1NkfUowdfQTmzS3gOJPZNPiTH/lVkL1CWQyGsTMcUv
6Nzw7Hy1kaLhRC0W5ypeeSSc2vXRXJaFPtO3dF1PpPRRWtTnU1eQY8yfMMz4i+WL
TJ/7gcdglMIY6lEh8YOjvi+cfz2U+NumoU2Wzz+24jhZJOeJ08UC6u3D7jiGyAId
PiDgazYjR5DjsRzGT+W6yow6wrkr3b9Ow/rEQDhK56lRBlpOK7ckbCI+nT10PvJA
wC+ZYK0CYo184GTAzT0xJIz2t7zLtabR9mkVAwNxJLG8S/i1oqsZ0s5dVi28Hfg4
372dw7cF6LdFZYGNneq26OsVoVnShamHDa4TuaGu6w1l+jmXsrYVs74HZgm/8vtl
TqFEJs5LjS5QLRHxCng3SMTvZL6PyeNtISX+LME5DRy1trlUryItSRTLje/U4M5S
/gDhSvWgjyphLUiT6XZbRw==
-----END PUBLIC KEY-----
");
var_dump($check);

# Load secret key PEM from string
$check = $signature->load_secret_key_from_string("-----BEGIN SECRET KEY-----
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
-----END SECRET KEY-----
");
var_dump($check);

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World!</title>
</head>

<body>

</body>

</html>