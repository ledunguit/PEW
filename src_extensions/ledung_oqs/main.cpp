#include "main.h"

#include "ld_dilithium.h"
#include "ld_signature.h"
#include "stub.h"

void init_ld_dilithium_signature(Php::Extension& ext, Php::Class<LDDilithium>& signature)
{
    signature.method<&LDDilithium::__construct>("__construct", {Php::ByVal("algorithm", Php::Type::String, false)});

    signature.method<&LDDilithium::generate_key_pair>(
        "generate_key_pair", {Php::ByVal("public_file_path", Php::Type::String, false), Php::ByVal("secret_file_path", Php::Type::String, false),
                              Php::ByVal("format", Php::Type::String, false)});

    signature.method<&LDDilithium::sign>("sign", {Php::ByVal("filename", Php::Type::String), Php::ByVal("signature_filename", Php::Type::String)});

    signature.method<&LDDilithium::verify>("verify",
                                           {Php::ByVal("filename", Php::Type::String), Php::ByVal("signature_filename", Php::Type::String)});

    signature.method<&LDDilithium::load_key_pair>(
        "load_key_pair", {Php::ByVal("public_key_filename", Php::Type::String), Php::ByVal("secret_key_filename", Php::Type::String),
                          Php::ByVal("format", Php::Type::String)});

    signature.method<&LDDilithium::load_public_key_from_string>("load_public_key_from_string", {Php::ByVal("b64_key", Php::Type::String)});

    signature.method<&LDDilithium::load_public_key_from_file>("load_public_key_from_file", {Php::ByVal("public_key_filename", Php::Type::String)});

    signature.method<&LDDilithium::load_secret_key_from_string>("load_secret_key_from_string", {Php::ByVal("b64_key", Php::Type::String)});

    signature.method<&LDDilithium::load_secret_key_from_file>("load_secret_key_from_file", {Php::ByVal("secret_key_filename", Php::Type::String)});

    ext.add(std::move(signature));
}

void init_ld_signature(Php::Extension& ext, Php::Class<LDSignature>& signature)
{
    signature.method<&LDSignature::__construct>(
        "__construct", {Php::ByVal("algorithm", Php::Type::String, false), Php::ByVal("key_size", Php::Type::Numeric, false)});
    signature.method<&LDSignature::generate_key_pair>("generate_key_pair");

    ext.add(std::move(signature));
}

extern "C"
{
    PHPCPP_EXPORT void* get_module()
    {
        static Php::Extension extension("ledungoqs", "1.0");
        Php::Class<LDDilithium> ld_dilithium("LDDilithium");
        Php::Class<LDSignature> ld_signature("LDSignature");

        init_ld_dilithium_signature(extension, ld_dilithium);
        init_ld_signature(extension, ld_signature);

        generateStub("ledungoqs-stub.php");

        return extension;
    }
}