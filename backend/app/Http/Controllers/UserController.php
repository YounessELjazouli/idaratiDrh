<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function login(Request $request)
    {
        try {
            $validate = $request->validate([
                "email" => 'required',
                'password' => "required"
            ]);
            if (!$validate) {
                return response()->json([
                    "success" => false,
                    "message" => "Tous les champs sont obligatiores"
                ]);
            }

            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    'message' => 'Invalid login details'
                ], 401);
            }

            $user = User::where('email', $request['email'])->firstOrFail();

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'token' => $token,
                'token_type' => 'Bearer',
                'success' => true
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "error" => $th->getMessage()
            ]);
        }

    }
    public function checkLogin(Request $request)
    {
        try {
            return response([
                "success" => true,
                "message" => "User is Authentificated",
            ], 200);
        } catch (\Throwable $th) {
            return $th;
        }
    }
}
