<?php

namespace App\Http\Requests\Admin\Project;

use Illuminate\Foundation\Http\FormRequest;

class CreateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required|string|max:255",
            "description" => "required|string|max:1000",
            "company_name" => "required|string|max:255",
            "number_of_employees => required|numeric|min:1",
            "start_date" => "nullable|date",
            "end_date" => "nullable|date",
        ];
    }
}
