<?php

class LDSignature {
    /**
     * __construct method.
     * @param string $algorithm [optional]
     * @return void
     */
    public function __construct($algorithm = "dilithium2"): void {}

    /**
     * generate_key_pair method.
     * @param string $public_file_path [optional]
     * @param string $secret_file_path [optional]
     * @param string $format [optional]
     * @return array|bool
     */
    public function generate_key_pair($public_file_path = "", $secret_file_path = "", $format = "PEM|DER"): array|bool {}

    /**
     * load_key_pair method.
     * @param string $public_key_filename
     * @param string $secret_key_filename
     * @param string $format
     * @return bool
     */
    public function load_key_pair($public_key_filename, $secret_key_filename, $format): bool {}

    /**
     * sign method.
     * @param string $filename
     * @param string $signature_filename
     * @return bool
     */
    public function sign($filename, $signature_filename): bool {}

    /**
     * verify method.
     * @param string $filename
     * @param string $signature_filename
     * @return bool
     */
    public function verify($filename, $signature_filename): bool {}

    /**
     * load_public_key_from_string method.
     * @param string $b64_key
     * @return bool
     */
    public function load_public_key_from_string($b64_key): bool {}

    /**
     * load_public_key_from_file method.
     * @param string $public_key_file
     * @param string $format
     * @return bool
     */
    public function load_public_key_from_file($public_key_file, $format): bool {}

    /**
     * load_secret_key_from_string method.
     * @param string $b64_key
     * @return bool
     */
    public function load_secret_key_from_string($b64_key): bool {}

    /**
     * load_secret_key_from_file method.
     * @param string $secret_key_file
     * @param string $format
     * @return bool
     */
    public function load_secret_key_from_file($secret_key_file, $format): bool {}

}

