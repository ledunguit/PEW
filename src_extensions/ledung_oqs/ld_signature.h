#ifndef LEDUNGOQS_LD_SIGNATURE_H
#define LEDUNGOQS_LD_SIGNATURE_H

#include <openssl/bio.h>
#include <openssl/buffer.h>
#include <openssl/ec.h>
#include <openssl/evp.h>
#include <openssl/pem.h>
#include <oqs/oqs.h>
#include <phpcpp.h>

#include <algorithm>
#include <cctype>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

using namespace std;

class LDSignature : public Php::Base
{
   public:
    LDSignature();
    virtual ~LDSignature();
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
    string _algorithm;
    const char *_private_key;
    const char *_public_key;
    int _key_size;
    EVP_PKEY_CTX *_pctx;
};

#endif