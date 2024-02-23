<?php

namespace App\Http\Controllers\api\auth;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class indexController extends BaseController
{
    public function login(Request $request)
    {
        $data = $request->except("_token");

        try {
            $credentials = [
                "email" => $data['email'],
                "password" => $data["password"]
            ];

            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken("app")->accessToken;

                $data = [
                    "user" => $user,
                    "token" => $token
                ];

                return parent::sendResponse("Giriş Başarılı", $data, 200);

            } else {
                return parent::sendError("E-Mail ve/veya Şifreniz Hatalı", [], 401);
            }

        } catch (\Exception $exception) {
            return parent::sendError($exception->getMessage(), [], 400);
        }
    }

    public function register(RegisterRequest $request)
    {
        try {
            $input = $request->except("_token","password_confirmation");
            $input['password'] = Hash::make($input['password']);

            $user = User::create($input);
            $token = $user->createToken("app")->accessToken;

            return parent::sendResponse("Kullanıcı Kayıt İşlemi Başarılı", [
                "user" => $user,
                "token" => $token
            ], 201);

        } catch (\Exception $exception) {
            return parent::sendError($exception->getMessage(), [], 400);
        }
    }
}
