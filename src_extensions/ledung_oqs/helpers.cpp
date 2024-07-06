#include "helpers.h"

#include "phpcpp.h"

using namespace std;

namespace fs = std::filesystem;

string base64_encode(const vector<uint8_t> &input)
{
    BIO *bio, *b64;
    BUF_MEM *buffer_ptr;

    b64 = BIO_new(BIO_f_base64());
    bio = BIO_new(BIO_s_mem());
    bio = BIO_push(b64, bio);

    BIO_set_flags(bio, BIO_FLAGS_BASE64_NO_NL);
    BIO_write(bio, input.data(), input.size());
    BIO_flush(bio);
    BIO_get_mem_ptr(bio, &buffer_ptr);
    BIO_set_close(bio, BIO_NOCLOSE);

    std::string b64_text(buffer_ptr->data, buffer_ptr->length);
    BIO_free_all(bio);

    return b64_text;
}

vector<uint8_t> base64_decode(const string &b64_key)
{
    BIO *bio, *b64;

    b64 = BIO_new(BIO_f_base64());
    bio = BIO_new_mem_buf(b64_key.data(), static_cast<int>(b64_key.size()));
    bio = BIO_push(b64, bio);

    BIO_set_flags(bio, BIO_FLAGS_BASE64_NO_NL);

    vector<uint8_t> out(b64_key.size(), '\0');

    int decoded_length = BIO_read(bio, &out[0], static_cast<int>(b64_key.size()));
    if (decoded_length < 0)
    {
        BIO_free_all(bio);
        throw std::runtime_error("Failed to decode base64 content");
    }
    out.resize(decoded_length);

    BIO_free_all(bio);

    return out;
}

bool directory_exists(const string &path)
{
    fs::path dir = fs::path(path);

    if (dir.has_filename())
    {
        dir = dir.parent_path();
    }

    if (dir.has_relative_path())
    {
        dir = fs::absolute(dir);
    }

    return fs::exists(dir);
}

bool create_directory(const string &path)
{
    fs::path dir = fs::path(path);

    if (dir.has_filename())
    {
        dir = dir.parent_path();
    }

    if (dir.has_relative_path())
    {
        dir = fs::absolute(dir);
    }

    return fs::create_directories(dir);
}