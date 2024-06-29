#include "main.h"

Php::Value hello()
{
    return Php::Value("Hello World! 2");
}

extern "C"
{
    PHPCPP_EXPORT void *get_module()
    {
        static Php::Extension extension("ledungoqs", "1.0");

        extension.add<hello>("hello");

        return extension;
    }
}