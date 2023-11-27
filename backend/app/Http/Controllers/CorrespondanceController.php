<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Correspondance;
use Illuminate\Support\Facades\Storage;

class CorrespondanceController extends Controller
{
    public function index()
    {
        $correspondances = Correspondance::with("doctype")->orderBy("created_at","desc")->get();
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
        $request->validate([
            'reference' => 'required',
            'date' => 'required',
            'objet' => 'required',
            'selectedDoctypes' => 'required',
            'file' => 'required|file', 
        ]);
    
        $file = $request->file('file');
        if (!Storage::disk('public')->exists('uploads')) {
            Storage::disk('public')->makeDirectory('uploads');
        }
        $filePath = $file->store('uploads', 'public'); 
        $file->move(public_path('uploads'), $filePath);

        $correspondance = new Correspondance();
        $correspondance->reference = $request->reference;
        $correspondance->date = $request->date;
        $correspondance->objet = $request->objet;
        $correspondance->doctype_id = $request->selectedDoctypes;
        $correspondance->file = $filePath;
        $correspondance->save();
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