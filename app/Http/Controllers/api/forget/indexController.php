<?php

namespace App\Http\Controllers\api\forget;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\ForgetRequest;
use App\Mail\ForgetMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class indexController extends BaseController
{
    public function getPassword(Request $request)
    {
        $this->validate($request,[
             "email" => "required|email",
        ],[],[
            "email" => "E-Mail"
        ]);

        $input = $request->except("_token");
        $control = User::where("email",$input["email"])->first();

        if (!$control){
            return parent::sendError("Kullanıcı hesabı bulunamadı",[],401);
        }


        try {
            $token = rand(10,100000);

            DB::table("password_reset_tokens")->insert([
               "email" => $input["email"],
               "token" => $token
            ]);

            Mail::to($input["email"])->send(new ForgetMail($token));


        }catch (\Exception $e){
            return parent::sendError($e->getMessage(),[],401);
        }

            return parent::sendResponse("Şifre sıfırlama maili hesabınıza gönderildi");
    }

    public function resetPassword(ForgetRequest $request)
    {
        $data = $request->except("_token");

        $control = DB::table("password_reset_tokens")->where([
            ["email","=",$data["email"]],
            ["token","=",$data["token"]]
        ])->first();

        if (!$control){
            return parent::sendError("Şifre yenileme isteğiniz bulunamadı",[],401);
        }

        $password = Hash::make($data["password"]);
        $update = User::where("email",$data["email"])->update([
            "password" => $password
        ]);

        if ($update){
            $control = DB::table("password_reset_tokens")->where([
                ["email","=",$data["email"]]
            ])->delete();

            return parent::sendResponse("Şifre yenileme işlemi başarılı");
        }else{
            return parent::sendError("Şifre yenileme işleminde bir hata oluştu");
        }
    }
}
