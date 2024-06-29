#include "stub.h"

struct FunctionInfo
{
    std::string name;
    std::vector<std::pair<std::string, std::string>> parameters; // pair<type, name>
    std::string returnType;
};

std::vector<FunctionInfo> functionRegistry;

void registerFunction(const std::string &name, const std::vector<std::pair<std::string, std::string>> &parameters, const std::string &returnType)
{
    functionRegistry.push_back({name, parameters, returnType});
}

void generateStubFile()
{
    std::ofstream stubFile("ledung_oqs.stub.php");

    if (!stubFile.is_open())
    {
        std::cerr << "Failed to open stub file for writing." << std::endl;
        return;
    }

    // Write the PHP opening tag
    stubFile << "<?php" << std::endl
             << std::endl;

    // Iterate over the function registry to generate stubs
    for (const auto &func : functionRegistry)
    {
        stubFile << "/**" << std::endl;
        stubFile << " * " << func.name << " function." << std::endl;
        for (const auto &param : func.parameters)
        {
            stubFile << " * @param " << param.first << " $" << param.second << std::endl;
        }
        stubFile << " * @return " << func.returnType << std::endl;
        stubFile << " */" << std::endl;

        stubFile << "function " << func.name << "(";
        for (size_t i = 0; i < func.parameters.size(); ++i)
        {
            if (i > 0)
            {
                stubFile << ", ";
            }
            stubFile << "$" << func.parameters[i].second;
        }
        stubFile << ")";

        if (!func.returnType.empty())
        {
            stubFile << ": " << func.returnType;
        }

        stubFile << " {}" << std::endl
                 << std::endl;
    }

    // Close the file
    stubFile.close();
}
