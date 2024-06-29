#ifndef LEDUNG_OQS_STUB_H
#define LEDUNG_OQS_STUB_H
#include <phpcpp.h>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>
#include <map>

struct FunctionInfo;
void registerFunction(const std::string &name, const std::vector<std::pair<std::string, std::string>> &parameters, const std::string &returnType);
void generateStubFile();

#endif
