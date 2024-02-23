<?php

namespace App\Http\Controllers\api\user;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class indexController extends BaseController
{
    public function index()
    {
        $user = Auth::user();

        return parent::sendResponse("Kullanıcı Getirildi",$user);
    }
}
