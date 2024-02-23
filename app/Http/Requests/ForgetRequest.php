<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ForgetRequest extends FormRequest
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
            "email" => "required|email",
            "token" => "required",
            "password" => "required|min:8|confirmed"
        ];
    }

    public function attributes()
    {
        return [
            "email" => "E-Mail",
            "token" => "Token",
            "password" => "Şifre"
        ];
    }
}
