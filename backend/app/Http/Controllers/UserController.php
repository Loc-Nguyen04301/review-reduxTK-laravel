<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    //
    public function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                //backed validation
                'name' => 'required | min:3 ',
                'email' => ['required', 'email', Rule::unique('users', 'email')],
                'password' => ' min:6 | required_with:confirm_password|same:confirm_password',
                'confirm_password' => 'min:6'
            ]
        );
        if ($validator->fails()) {
            return response()->json(
                [
                    'status' => false,
                    'message' => 'fix errors',
                    'errors' => $validator->errors()
                ],
                500
            );
        }
        // Create user
        $user =  User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'status' => true,
            'user' => $user,
        ]);
    }





    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(
                [
                    'status' => false, 
                    'message' => 'fix errors', 
                    'errors' => $validator->errors()
                ], 500);
        }

        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials, $request->filled('remember'))) {
            return response()->json(['status' => true, 'user' => auth()->user()]);
        }

        return response()->json(['status' => false, 'message' => 'invalid username or password'], 500);
    }

    public function logout(Request $request)
    {
        auth()->logout();
        // invalidate the user's session and regenerate their CSRF token.
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['status' => true, 'message' => 'logged out']);
    }

    public function me()
    {
        return response()->json(['status' => true, 'user' => auth()->user()]);
    }
}
