#include "ld_signature.h"

#include "helpers.h"

LDSignature::LDSignature() {}

LDSignature::~LDSignature() { EVP_PKEY_CTX_free(_pctx); }

void LDSignature::__construct(Php::Parameters &params)
{
    if (params.size() != 2)
    {
        throw Php::Exception("Wrong number of parameters");
    }

    string algorithm = params[0].stringValue();
    int keySize = params[1].numericValue();

    EVP_PKEY_CTX *pctx = nullptr;

    if (algorithm == "ecdsa")
    {
        pctx = EVP_PKEY_CTX_new_id(EVP_PKEY_EC, nullptr);
    }
    else if (algorithm == "rsa")
    {
        pctx = EVP_PKEY_CTX_new_id(EVP_PKEY_RSA, nullptr);
    }
    else
    {
        throw Php::Exception("Unsupported algorithm: " + algorithm);
    }

    if (pctx == nullptr)
    {
        throw Php::Exception("Failed to create EVP_PKEY_CTX");
    }

    _pctx = pctx;
    _algorithm = algorithm;
    _key_size = keySize;
}

Php::Value LDSignature::generate_key_pair(Php::Parameters &params)
{
    if (_pctx == nullptr)
    {
        throw Php::Exception("EVP_PKEY_CTX not initialized");
    }

    if (_algorithm == "ecdsa")
    {
        EC_KEY *key = nullptr;

        switch (_key_size)
        {
            case 256:
                key = EC_KEY_new_by_curve_name(NID_X9_62_prime256v1);
                break;
            case 384:
                key = EC_KEY_new_by_curve_name(NID_secp384r1);
                break;
            case 521:
                key = EC_KEY_new_by_curve_name(NID_secp521r1);
                break;
            default:
                throw Php::Exception("Unsupported key size: " + std::to_string(_key_size));
                break;
        }

        if (key == nullptr)
        {
            throw Php::Exception("Failed to create EC_KEY");
        }

        if (1 != EC_KEY_generate_key(key))
        {
            throw Php::Exception("Failed to generate EC_KEY");
        }

        BIO *bio_private = BIO_new(BIO_s_mem());
        BIO *bio_public = BIO_new(BIO_s_mem());

        if (1 != PEM_write_bio_ECPrivateKey(bio_private, key, nullptr, nullptr, 0, nullptr, nullptr))
        {
            throw Php::Exception("Failed to write EC_KEY to BIO");
        }

        if (1 != PEM_write_bio_EC_PUBKEY(bio_public, key))
        {
            throw Php::Exception("Failed to write EC_KEY to BIO");
        }

        char *private_key = nullptr;
        char *public_key = nullptr;
        int private_key_len = BIO_get_mem_data(bio_private, &private_key);
        int public_key_len = BIO_get_mem_data(bio_public, &public_key);

        BIO_flush(bio_private);
        BIO_flush(bio_public);

        if (private_key == nullptr || public_key == nullptr)
        {
            throw Php::Exception("Failed to read EC_KEY from BIO");
        }

        _private_key = private_key;
        _public_key = public_key;
    }

    Php::out << "Key size: " << _key_size << std::endl;
    Php::out.flush();

    return {_private_key, _public_key};
}