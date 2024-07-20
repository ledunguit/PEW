#ifndef LEDUNGOQS_LD_DILITHIUM_H
#define LEDUNGOQS_LD_DILITHIUM_H

#include <openssl/bio.h>
#include <openssl/buffer.h>
#include <openssl/evp.h>
#include <oqs/oqs.h>
#include <phpcpp.h>

#include <algorithm>
#include <cctype>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

using namespace std;

class LDDilithium : public Php::Base
{
   public:
    LDDilithium();
    virtual ~LDDilithium();
    void __construct(Php::Parameters &params);
    Php::Value generate_key_pair(Php::Parameters &params);
    Php::Value sign(Php::Parameters &params);
    Php::Value verify(Php::Parameters &params);
    Php::Value load_key_pair(Php::Parameters &params);
    Php::Value load_public_key_from_string(Php::Parameters &params);
    Php::Value load_secret_key_from_string(Php::Parameters &params);
    Php::Value load_public_key_from_file(Php::Parameters &params);
    Php::Value load_secret_key_from_file(Php::Parameters &params);

   private:
    OQS_SIG *_sig;
    string public_header = "-----BEGIN PUBLIC KEY-----";
    string secret_header = "-----BEGIN SECRET KEY-----";
    string public_footer = "-----END PUBLIC KEY-----";
    string secret_footer = "-----END SECRET KEY-----";
    vector<uint8_t> _public_key;
    vector<uint8_t> _secret_key;

    void _write_pem_file(const string &filename, const vector<uint8_t> &data, bool is_public_key);
    void _read_pem_file(const string &filename, const bool is_public_key);
};

#endif