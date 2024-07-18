#include "ld_dilithium.h"

#include "helpers.h"

LDDilithium::LDDilithium() {}

LDDilithium::~LDDilithium()
{
    OQS_SIG_free(_sig);
    _public_key.clear();
    _secret_key.clear();
}

void LDDilithium::_write_pem_file(const string &filename, const vector<uint8_t> &data, bool is_public_key)
{
    try
    {
        if (!directory_exists(filename))
        {
            create_directory(filename);
        }

        std::ofstream file(filename);

        if (!file.is_open())
        {
            throw std::runtime_error("Failed to open file for writing");
        }

        std::string b64_key = base64_encode(data);

        const std::string header = is_public_key ? public_header : secret_header;
        const std::string footer = is_public_key ? public_footer : secret_footer;

        file << header << "\n";

        for (size_t i = 0; i < b64_key.length(); i += 64)
        {
            file << b64_key.substr(i, 64) << "\n";
        }

        file << footer << "\n";

        file.close();
    }
    catch (const std::exception &e)
    {
        throw Php::Exception(e.what());
    }
}

void LDDilithium::_read_pem_file(const string &filename, const bool is_public_key)
{
    ifstream file(filename);

    if (!file.is_open())
    {
        throw Php::Exception("Failed to open file for reading");
    }

    const string header = is_public_key ? public_header : secret_header;
    const string footer = is_public_key ? public_footer : secret_footer;

    string b64_key((istreambuf_iterator<char>(file)), istreambuf_iterator<char>());

    file.close();

    size_t header_pos = b64_key.find(header);
    size_t footer_pos = b64_key.find(footer);

    if (header_pos == string::npos || footer_pos == string::npos)
    {
        throw Php::Exception("Invalid PEM file");
    }

    size_t start = header_pos + header.length();
    size_t end = footer_pos;

    std::string base64_content = b64_key.substr(start, end - start);

    base64_content.erase(std::remove_if(base64_content.begin(), base64_content.end(), [](unsigned char x) { return std::isspace(x); }),
                         base64_content.end());

    vector<uint8_t> decoded_content = base64_decode(base64_content);

    if (is_public_key)
    {
        _public_key = decoded_content;
    }
    else
    {
        _secret_key = decoded_content;
    }
}

void LDDilithium::__construct(Php::Parameters &params)
{
    const auto algorithm_name = empty(params) ? "dilithium2" : params[0].stringValue();

    if (!OQS_SIG_alg_is_enabled(algorithm_name.c_str()))
    {
        throw Php::Exception("Signature algorithm not enabled or unsupported: " + algorithm_name);
    }

    _sig = OQS_SIG_new(algorithm_name.c_str());

    if (_sig == nullptr)
    {
        throw Php::Exception("Failed to initialize signature algorithm");
    }
}

Php::Value LDDilithium::generate_key_pair(Php::Parameters &params)
{
    if (empty(params))
    {
        _public_key.resize(_sig->length_public_key);
        _secret_key.resize(_sig->length_secret_key);

        if (OQS_SIG_keypair(_sig, _public_key.data(), _secret_key.data()) != OQS_SUCCESS)
        {
            throw Php::Exception("Failed to generate key pair");
        }

        return {base64_encode(_public_key), base64_encode(_secret_key)};
    }
    else
    {
        if (params.size() != 3)
        {
            throw Php::Exception("Invalid number of parameters");
        }

        _public_key.resize(_sig->length_public_key);
        _secret_key.resize(_sig->length_secret_key);

        if (OQS_SIG_keypair(_sig, _public_key.data(), _secret_key.data()) != OQS_SUCCESS)
        {
            throw Php::Exception("Failed to generate key pair");
        }

        const auto output_format = params[2].stringValue();

        if (output_format == "PEM")
        {
            _write_pem_file(params[0].stringValue(), _public_key, true);
            _write_pem_file(params[1].stringValue(), _secret_key, false);
        }
        else if (output_format == "DER")
        {
            ofstream public_key_file(params[0].stringValue(), ios::binary);
            ofstream secret_key_file(params[1].stringValue(), ios::binary);

            if (!public_key_file || !secret_key_file)
            {
                throw Php::Exception("Failed to open output files");
            }

            public_key_file.write(reinterpret_cast<char *>(_public_key.data()), _public_key.size());
            secret_key_file.write(reinterpret_cast<char *>(_secret_key.data()), _secret_key.size());
        }
        else
        {
            throw Php::Exception("Invalid output format, must be PEM or DER");
        }
    }

    return Php::Value();
}

Php::Value LDDilithium::sign(Php::Parameters &params)
{
    if (!_secret_key.size())
    {
        throw Php::Exception("Secret key not loaded, please load existing secret key or generate a new one first");
    }

    ifstream input_file(params[0].stringValue(), ios::binary);

    if (!input_file)
    {
        throw Php::Exception("Failed to open input file");
    }

    vector<uint8_t> message((istreambuf_iterator<char>(input_file)), istreambuf_iterator<char>());

    vector<uint8_t> signature(_sig->length_signature);
    size_t signature_length;

    if (OQS_SIG_sign(_sig, signature.data(), &signature_length, message.data(), message.size(), _secret_key.data()) != OQS_SUCCESS)
    {
        throw Php::Exception("Failed to sign message");
    }

    input_file.close();

    ofstream output_file(params[1].stringValue(), ios::binary);

    if (!output_file)
    {
        throw Php::Exception("Failed to open output file");
    }

    output_file.write((char *)signature.data(), signature_length);

    output_file.close();
    return true;
}

Php::Value LDDilithium::verify(Php::Parameters &params)
{
    if (!_public_key.size())
    {
        throw Php::Exception("Public key not loaded, please load existing public key or generate a new one first");
    }

    ifstream input_file(params[0].stringValue(), ios::binary);
    ifstream signature_file(params[1].stringValue(), ios::binary);

    if (!input_file || !signature_file)
    {
        Php::error << "Failed to open input or signature file" << endl;
        return false;
    }

    vector<uint8_t> message((istreambuf_iterator<char>(input_file)), istreambuf_iterator<char>());
    vector<uint8_t> signature((istreambuf_iterator<char>(signature_file)), istreambuf_iterator<char>());

    input_file.close();
    signature_file.close();

    if (OQS_SIG_verify(_sig, message.data(), message.size(), signature.data(), signature.size(), _public_key.data()) != OQS_SUCCESS)
    {
        return false;
    }

    return true;
}

Php::Value LDDilithium::load_key_pair(Php::Parameters &params)
{
    if (params.size() != 3)
    {
        throw Php::Exception("Invalid number of parameters");
    }

    const auto public_key_file = params[0].stringValue();
    const auto secret_key_file = params[1].stringValue();
    const auto load_format = params[2].stringValue();

    if (load_format != "PEM" && load_format != "DER")
    {
        throw Php::Exception("Invalid format, must be PEM or DER");
    }

    if (load_format == "DER")
    {
        ifstream public_key_file_handle(public_key_file);
        ifstream secret_key_file_handle(secret_key_file);

        if (!public_key_file_handle || !secret_key_file_handle)
        {
            throw Php::Exception("Failed to open input files");
        }

        vector<uint8_t> public_key((istreambuf_iterator<char>(public_key_file_handle)), istreambuf_iterator<char>());
        vector<uint8_t> secret_key((istreambuf_iterator<char>(secret_key_file_handle)), istreambuf_iterator<char>());

        public_key_file_handle.close();
        secret_key_file_handle.close();

        _public_key = public_key;
        _secret_key = secret_key;

        return true;
    }
    else
    {
        _read_pem_file(public_key_file, true);
        _read_pem_file(secret_key_file, false);

        return true;
    }
}

Php::Value LDDilithium::load_public_key_from_string(Php::Parameters &params)
{
    if (params.size() != 1)
    {
        throw Php::Exception("Invalid number of parameters");
    }

    const string b64_key = params[0].stringValue();

    _public_key = base64_decode(b64_key);

    return true;
}

Php::Value LDDilithium::load_secret_key_from_string(Php::Parameters &params)
{
    if (params.size() != 1)
    {
        throw Php::Exception("Invalid number of parameters");
    }

    const string b64_key = params[0].stringValue();

    _secret_key = base64_decode(b64_key);

    return true;
}

Php::Value LDDilithium::load_public_key_from_file(Php::Parameters &params)
{
    if (params.size() != 2)
    {
        throw Php::Exception("Invalid number of parameters");
    }

    const string public_key_file = params[0].stringValue();
    const string load_format = params[1].stringValue();

    if (load_format != "PEM" && load_format != "DER")
    {
        throw Php::Exception("Invalid format, must be PEM or DER");
    }

    if (load_format == "DER")
    {
        ifstream public_key_file_handle(public_key_file);

        if (!public_key_file_handle)
        {
            throw Php::Exception("Failed to open input file");
        }

        vector<uint8_t> public_key((istreambuf_iterator<char>(public_key_file_handle)), istreambuf_iterator<char>());

        public_key_file_handle.close();

        _public_key = public_key;

        return true;
    }
    else
    {
        _read_pem_file(public_key_file, true);
    }

    return true;
}

Php::Value LDDilithium::load_secret_key_from_file(Php::Parameters &params)
{
    if (params.size() != 2)
    {
        throw Php::Exception("Invalid number of parameters");
    }

    const string secret_key_file = params[0].stringValue();
    const string load_format = params[1].stringValue();

    if (load_format != "PEM" && load_format != "DER")
    {
        throw Php::Exception("Invalid format, must be PEM or DER");
    }

    if (load_format == "DER")
    {
        ifstream secret_key_file_handle(secret_key_file);

        if (!secret_key_file_handle)
        {
            throw Php::Exception("Failed to open input file");
        }

        vector<uint8_t> secret_key((istreambuf_iterator<char>(secret_key_file_handle)), istreambuf_iterator<char>());

        secret_key_file_handle.close();

        _secret_key = secret_key;

        return true;
    }
    else
    {
        _read_pem_file(secret_key_file, false);
    }

    return true;
}
