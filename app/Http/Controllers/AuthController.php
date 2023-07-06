<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    function register(Request $request) {
        
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => ['required','string','confirmed', Password::min(8)->mixedCase()->numbers()->symbols()],
        ]);

        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
        ], 200);
        
    }

    function login(Request $request)  {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if(!auth()->attempt($credentials)) {
            return response([
                'error' => 'Invalid credentials'
            ], 401);
        }

        $token = auth()->user()->createToken('main')->plainTextToken;

        return response([
            'user' => auth()->user(),
            'token' => $token,
        ], 200);

    }

    function logout(){
        $user = Auth::user();
        if ($user) {
            $user->currentAccessToken()->delete();
            return response([
                'success' => true
            ], 200);
        }else{
            return response([
                'success' => false
            ], 401);
        }

    }
}
