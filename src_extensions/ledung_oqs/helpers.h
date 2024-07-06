#ifndef LEDUNGOQS_HELPERS_H
#define LEDUNGOQS_HELPERS_H

#include <stdint.h>
#include <stdlib.h>

#include <filesystem>
#include <string>
#include <vector>

#include "openssl/bio.h"
#include "openssl/buffer.h"
#include "openssl/err.h"
#include "openssl/evp.h"

using namespace std;

string base64_encode(const vector<uint8_t> &input);
vector<uint8_t> base64_decode(const string &b64_key);
bool directory_exists(const string &path);
bool create_directory(const string &path);

#endif