#include "stub.h"

std::vector<FunctionInfo> functionRegistry;
std::vector<ClassInfo> classRegistry;

void registerFunction(const std::string &name, const std::vector<ParameterInfo> &parameters, const std::string &returnType)
{
    functionRegistry.push_back({name, parameters, returnType});
}

void registerClass(const std::string &className, const std::vector<MethodInfo> &methods) { classRegistry.push_back({className, methods}); }

void registerClassMethod(const std::string &className, const MethodInfo &method)
{
    for (auto &cls : classRegistry)
    {
        if (cls.name == className)
        {
            cls.methods.push_back(method);
            return;
        }
    }
    classRegistry.push_back({className, {method}});
}

void generateStubFile(const char *filename)
{
    std::ofstream stubFile(filename);

    if (!stubFile.is_open())
    {
        std::cerr << "Failed to open stub file for writing." << std::endl;
        return;
    }

    // Write the PHP opening tag
    stubFile << "<?php" << std::endl << std::endl;

    // Iterate over the function registry to generate function stubs
    for (const auto &func : functionRegistry)
    {
        stubFile << "/**" << std::endl;
        stubFile << " * " << func.name << " function." << std::endl;
        for (const auto &param : func.parameters)
        {
            stubFile << " * @param " << param.type << " $" << param.name;
            if (param.isOptional)
            {
                stubFile << " [optional]";
            }
            stubFile << std::endl;
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
            stubFile << "$" << func.parameters[i].name;
            if (func.parameters[i].isOptional)
            {
                if (func.parameters[i].type == "bool")
                {
                    stubFile << " = " << func.parameters[i].defaultValue;
                }
                else if (func.parameters[i].type == "array")
                {
                    stubFile << " = []";
                }
                else
                {
                    stubFile << " = " << "\"" << func.parameters[i].defaultValue << "\"";
                }
            }
        }
        stubFile << ")";

        if (!func.returnType.empty())
        {
            stubFile << ": " << func.returnType;
        }

        stubFile << " {}" << std::endl << std::endl;
    }

    // Iterate over the class registry to generate class stubs
    for (const auto &cls : classRegistry)
    {
        stubFile << "class " << cls.name << " {" << std::endl;

        for (const auto &method : cls.methods)
        {
            stubFile << "    /**" << std::endl;
            stubFile << "     * " << method.name << " method." << std::endl;
            for (const auto &param : method.parameters)
            {
                stubFile << "     * @param " << param.type << " $" << param.name;
                if (param.isOptional)
                {
                    stubFile << " [optional]";
                }
                stubFile << std::endl;
            }
            stubFile << "     * @return " << method.returnType << std::endl;
            stubFile << "     */" << std::endl;

            stubFile << "    public function " << method.name << "(";
            for (size_t i = 0; i < method.parameters.size(); ++i)
            {
                if (i > 0)
                {
                    stubFile << ", ";
                }
                stubFile << "$" << method.parameters[i].name;
                if (method.parameters[i].isOptional)
                {
                    if (method.parameters[i].type == "bool")
                    {
                        stubFile << " = " << method.parameters[i].defaultValue;
                    }
                    else if (method.parameters[i].type == "array")
                    {
                        stubFile << " = []";
                    }
                    else
                    {
                        stubFile << " = " << "\"" << method.parameters[i].defaultValue << "\"";
                    }
                }
            }
            stubFile << ")";

            if (!method.returnType.empty())
            {
                stubFile << ": " << method.returnType;
            }

            stubFile << " {}" << std::endl << std::endl;
        }

        stubFile << "}" << std::endl << std::endl;
    }

    // Close the file
    stubFile.close();
}

void generateStub(const char *filename)
{
    const vector<MethodInfo> methods = {
        {"__construct", {{"string", "algorithm", true, "dilithium2"}}, "void"},
        {"generate_key_pair",
         {{"string", "public_file_path", true, ""}, {"string", "secret_file_path", true, ""}, {"string", "format", true, "PEM|DER"}},
         "array|bool"},
        {"load_key_pair", {{"string", "public_key_filename"}, {"string", "secret_key_filename"}, {"string", "format"}}, "bool"},
        {"sign", {{"string", "filename"}, {"string", "signature_filename"}}, "bool"},
        {"verify", {{"string", "filename"}, {"string", "signature_filename"}}, "bool"},
        {"load_public_key_from_string", {{"string", "b64_key"}}, "bool"},
        {"load_public_key_from_file", {{"string", "public_key_file"}, {"string", "format"}}, "bool"},
        {"load_secret_key_from_string", {{"string", "b64_key"}}, "bool"},
        {"load_secret_key_from_file", {{"string", "secret_key_file"}, {"string", "format"}}, "bool"},
    };

    registerClass("LDSignature", methods);
    generateStubFile(filename);
}
