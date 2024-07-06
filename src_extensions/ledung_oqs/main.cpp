#include "main.h"

#include "signature.h"
#include "stub.h"

extern "C"
{
    PHPCPP_EXPORT void* get_module()
    {
        static Php::Extension extension("ledungoqs", "1.0");

        Php::Class<LDSignature> signature("LDSignature");

        signature.method<&LDSignature::__construct>(
            "__construct", {Php::ByVal("algorithm", Php::Type::String, false)});

        signature.method<&LDSignature::generate_key_pair>(
            "generate_key_pair", {Php::ByVal("public_file_path", Php::Type::String, false),
                                  Php::ByVal("secret_file_path", Php::Type::String, false),
                                  Php::ByVal("format", Php::Type::String, false)});

        signature.method<&LDSignature::sign>("sign",
                                             {Php::ByVal("filename", Php::Type::String),
                                              Php::ByVal("signature_filename", Php::Type::String)});

        signature.method<&LDSignature::verify>(
            "verify", {Php::ByVal("filename", Php::Type::String),
                       Php::ByVal("signature_filename", Php::Type::String)});

        signature.method<&LDSignature::load_key_pair>(
            "load_key_pair", {Php::ByVal("public_key_filename", Php::Type::String),
                              Php::ByVal("secret_key_filename", Php::Type::String),
                              Php::ByVal("format", Php::Type::String)});

        signature.method<&LDSignature::load_public_key_from_string>(
            "load_public_key_from_string", {Php::ByVal("b64_key", Php::Type::String)});

        signature.method<&LDSignature::load_public_key_from_file>(
            "load_public_key_from_file", {Php::ByVal("public_key_filename", Php::Type::String)});

        signature.method<&LDSignature::load_secret_key_from_string>(
            "load_secret_key_from_string", {Php::ByVal("b64_key", Php::Type::String)});

        signature.method<&LDSignature::load_secret_key_from_file>(
            "load_secret_key_from_file", {Php::ByVal("secret_key_filename", Php::Type::String)});

        generateStub("ledungoqs-stub.php");

        extension.add(std::move(signature));

        return extension;
    }
}