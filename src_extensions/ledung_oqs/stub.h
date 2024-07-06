#ifndef LEDUNG_OQS_STUB_H
#define LEDUNG_OQS_STUB_H
#include <phpcpp.h>

#include <fstream>
#include <iostream>
#include <map>
#include <string>
#include <vector>

using namespace std;

struct ParameterInfo
{
    std::string type;
    std::string name;
    bool isOptional;
    std::string defaultValue;
};

struct FunctionInfo
{
    std::string name;
    std::vector<ParameterInfo> parameters;
    std::string returnType;
};

struct MethodInfo
{
    std::string name;
    std::vector<ParameterInfo> parameters;
    std::string returnType;
};

struct ClassInfo
{
    std::string name;
    std::vector<MethodInfo> methods;
};

void registerFunction(const std::string &name,
                      const std::vector<std::pair<std::string, std::string>> &parameters,
                      const std::string &returnType);
void registerClass(const std::string &className, const std::vector<MethodInfo> &methods);
void registerClassMethod(const std::string &className, const MethodInfo &method);
void generateStubFile(const char *filename);
void generateStub(const char *filename);

#endif
