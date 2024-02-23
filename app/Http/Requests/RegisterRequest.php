<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            "name" => "required|max:55",
            "email" => "required|min:5|max:60|email|unique:users",
            "password" => "required|min:8|confirmed",
        ];
    }

    public function attributes()
    {
        return [
            "name" => "Kullanıcı Adı",
            "email" => "E-Mail Adresi",
            "password" => "Şifre"
        ];
    }
}
