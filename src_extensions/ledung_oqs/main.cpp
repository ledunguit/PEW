#include "main.h"
#include "stub.h"

Php::Value hello()
{
    return Php::Value("Hello World from C++ Newwwwww!");
}

Php::Value some_functions(Php::Parameters &params)
{
    return Php::Value("Some functions called.");
}

extern "C"
{
    PHPCPP_EXPORT void *get_module()
    {
        static Php::Extension extension("ledungoqs", "1.0");

        registerFunction("hello", {}, "string");
        extension.add<hello>("hello");

        registerFunction("some_functions", {}, "string");
        extension.add<some_functions>("some_functions", {});

        generateStubFile();
        return extension;
    }
}