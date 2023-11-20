<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Correspondance;

class CorrespondanceController extends Controller
{
    public function index()
    {
        $correspondances = Correspondance::all();
        return response()->json(['data' => $correspondances], 200);
    }

    public function show($id)
    {
        $correspondance = Correspondance::find($id);

        if (!$correspondance) {
            return response()->json(['message' => 'Correspondance not found'], 404);
        }

        return response()->json(['data' => $correspondance], 200);
    }

    public function store(Request $request)
    {
        // $request->validate([
        //     'reference' => 'required',
        //     'date' => 'required|date',
        //     'objet' => 'required',
        //     'type' => 'required',
        //     // 'file' => 'required',
        // ]);
        $file = $request->file('file');

        $filePath = $file->store('uploads', 'public');        
        $correspondance = Correspondance::create($request->all());

        return response()->json(['data' => $correspondance], 201);
    }

    public function update(Request $request, $id)
    {
        $correspondance = Correspondance::find($id);

        if (!$correspondance) {
            return response()->json(['message' => 'Correspondance not found'], 404);
        }

        $request->validate([
            'reference' => 'required',
            'date' => 'required|date',
            'objet' => 'required',
            'type' => 'required',
            'file' => 'required',
        ]);

        $correspondance->update($request->all());

        return response()->json(['data' => $correspondance], 200);
    }

    public function destroy($id)
    {
        $correspondance = Correspondance::find($id);

        if (!$correspondance) {
            return response()->json(['message' => 'Correspondance not found'], 404);
        }

        $correspondance->delete();

        return response()->json(['message' => 'Correspondance deleted'], 200);
    }
}