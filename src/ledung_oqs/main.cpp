#include "phpcpp.h"
#include <stdlib.h>

Php::Value hello()
{
    return Php::Value("Hello World");
}

extern "C"
{
    PHPCPP_EXPORT void *get_module()
    {
        static Php::Extension extension("ledung_oqs", "1.0");

        extension.add<hello>("hello");

        return extension;
    }
}