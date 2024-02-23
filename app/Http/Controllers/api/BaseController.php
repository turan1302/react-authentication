<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    public function sendResponse($message="",$data=[],$code=200)
    {
        $result = [
            "success" => true,
            "message" => $message,
            "data" => $data
        ];

        return response()->json($result,$code);
    }

    public function sendError($message="",$errorData=[],$code=404)
    {
        $result = [
            "success" => false,
            "message" => $message,
        ];

        if (!empty($errorData)){
            $result["data"] = $errorData;
        }

        return response()->json($result,$code);
    }
}
