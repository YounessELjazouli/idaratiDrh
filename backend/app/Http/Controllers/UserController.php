<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;
Use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    public function index(Request $request){
        $users=User::withTrashed()->where('id',"!=",$request->user()->id)->withCount('correspondances','texteReglementaires')->get();
        $me=User::where('id',"=",$request->user()->id)->withCount('correspondances','texteReglementaires')->get();
        return response()->json(["me"=>$me[0],"other"=>$users],200);
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'user has ben desconnected',
            "success"=>true
        ], 200);
    }
    public function register(Request $request)
    {
        
        $data = $request->validate(
            [
                "name"=>"required",
                "email"=>"required|email|unique:users,email",
                "password"=>"required|confirmed",
                "password_confirmation"=>"required"
            ]
            );
        $filePath=null;
        if($request->exists("picture") && $request->file('picture')){
            $file = $request->file('picture');
            if (!Storage::disk('public')->exists('uploads/users')) {
                Storage::disk('public')->makeDirectory('uploads/users');
            }
            $filePath = $file->store('uploads/users', 'public'); 
            $file->move(public_path('uploads/users'), $filePath);
        }
        $user = new User($data);
        $user->picture=$filePath;
        $user->save();
        return response()->json(["user"=>$user],201);
    }
    public function me(Request $request){
        return response()->json(["user"=>$request->user()],200);
    }
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
    public function remove(Request $request)
    {
        $user = User::withTrashed()->find($request->user["id"]);
        
        if (!$user) {
            // Gérez le cas où la ressource n'est pas trouvée
            return response()->json([
                "success" => false,
                "message" => "Ressource not found"
            ]);
        }

        // Supprimez la ressource de la base de données
        // $user->delete();
        if($request->isDestroy)
        {
            $user->forceDelete();
            return response()->json([
                "success" => true,
                "message" => `$user->name was destroyed`,
                "user"=>$user
            ]);
        }
        else{
            $user->delete();
            return response()->json([
                "success" => true,
                "message" => `$user->name was deleted`,
                "user"=>$user
            ]);
        }
        
    }
    public function checkLogin(Request $request)
    {
        return  response()->json(["user"=>$request->user()]);
       
    }

    public function update(Request $request)
    {
        $user = User::withTrashed()->find($request->id);
        if($request->exists("restor")){
            $user->restore();
            return response()->json(['user' => $user,"restored"=>true], 200);
        }

        $data=$request->validate([
            'name'=>"required",
            'email'=>"required|email|unique:users,email,$request->id",
        ]);
        
        $picture=$user->picture;
        if($user){
            $user->update($data);
        }
        if($request->exists("picture")){
            if($request->picture!=$picture){
                $filePath=null;
                if($request->file('picture')){
                    $file = $request->file('picture');
                    if (!Storage::disk('public')->exists('uploads/users')) {
                        Storage::disk('public')->makeDirectory('uploads/users');
                    }
                    $filePath = $file->store('uploads/users', 'public'); 
                    $file->move(public_path('uploads/users'), $filePath);
                    $user->picture=$filePath;
                    $user->save();
                }

            }
        }
        if($request->exists("new_password") && $request["new_password"]!=null&&$request["old_password"]!=""){
            if($request["old_password"]!=null && (Hash::check($request["old_password"], $request->user()->password))) {
                $data=$request->validate([
                    'name'=>"required",
                    'email'=>"required|email",
                    'new_password' => 'required',
                    'new_confirm_password' => 'required|same:new_password'
                ]);
                if($user){
                    $user->update($data);
                    $user->password=Hash::make($data["new_password"]);
                    $user->save();
                }
                return response()->json(["message"=>"with password","user"=>$user],200);
            }
            else{
                return response()->json(["message"=>"password incorrect","errors"=>["old_password"=>"password incorrect"]],422);
            }
        }
        return response()->json(["message"=>"only","user"=>$user],200);
    }

}
