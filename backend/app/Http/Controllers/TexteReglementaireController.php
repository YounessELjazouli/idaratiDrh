<?php

namespace App\Http\Controllers;

use App\Models\TexteReglementaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TexteReglementaireController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $textesReglementaires = TexteReglementaire::all();
        $textesReglementaires = TexteReglementaire::with('doctype')->get();
        // return view('textes-reglementaires.index', compact('textesReglementaires'));+-
        return response()->json([
            "success" => true,
            "data" => $textesReglementaires
        ]);
    }


    public function show($id)
{
    $texteReglementaire = TexteReglementaire::with('doctype')->find($id);

    if (!$texteReglementaire) {
        return response()->json([
            "success" => false,
            "message" => "Resource not found"
        ]);
    }

    return response()->json([
        "success" => true,
        "data" => $texteReglementaire
    ]);
}



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)

    {


        // Valider les données du formulaire
       /*  $validatedData = $request->validate([
            
            'sujet' => 'required|string',
            'ref' => 'required|string',
            'date' => 'required|date',
            'texte' => 'required',
            'selectedDoctypes' => 'required'
        ]); */

        $file = $request->file('texte');
        if (!Storage::disk('public')->exists('uploads')) {
            Storage::disk('public')->makeDirectory('uploads');
        }
        $filePath = $file->store('uploads', 'public'); 
        $file->move(public_path('uploads'), $filePath);


        // Enregistrez les données dans la base de données
        $data = TexteReglementaire::create([
            "sujet" => $request->sujet,
            "ref" => $request->ref,
            "date" => $request->date,
            "doctype_id" => $request->selectedDoctypes,
            "texte" => $filePath,

        ]);

        // Redirigez l'utilisateur vers la liste des textes réglementaires avec un message de confirmation
        // return redirect()->route('textes-reglementaires.index')->with('success', 'Le texte réglementaire a été créé avec succès.');
        return response()->json([
            "success" => true,
            "message" => "data was stored successfully",
            "data" => $data,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function show($id)
    // {
    //     $texteReglementaire = TexteReglementaire::find($id);
    //     return view('textes-reglementaires.show', compact('texteReglementaire'));
    // }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, $id)
    {
        // Valider les données du formulaire
        /* $validatedData = $request->validate([
            'sujet' => 'required|string',
            'ref' => 'required|string',
            'date' => 'required|date',
            'texte' => 'required',
            'doctype_id' => 'required'
        ]); */

        // Mettez à jour les données dans la base de données
        $texteReglementaire = TexteReglementaire::find($id);

        if (!$texteReglementaire) {
            // Gérez le cas où la ressource n'est pas trouvée
            return response()->json([
                "success" => false,
                "message" => "Ressource not found"
            ]);
        }

        $file = $request->file('texte');
        if (!Storage::disk('public')->exists('uploads')) {
            Storage::disk('public')->makeDirectory('uploads');
        }
        $filePath = $file->store('uploads', 'public'); 
        $file->move(public_path('uploads'), $filePath);


        $updatedData = $texteReglementaire->update([
            "sujet" => $request->sujet,
            "ref" => $request->ref,
            "date" => $request->date,
            "doctype_id" => $request->selectedDoctypes,
            "texte" => $filePath
        ]);

        // Redirigez l'utilisateur vers la liste des textes réglementaires avec un message de confirmation
        return response()->json([
            "success" => true,
            "message" => "Ressource was updated",
            "data" => $updatedData
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        // Recherchez la ressource dans la base de données
        $texteReglementaire = TexteReglementaire::find($id);

        if (!$texteReglementaire) {
            // Gérez le cas où la ressource n'est pas trouvée
            return response()->json([
                "success" => false,
                "message" => "Ressource not found"
            ]);
        }

        // Supprimez la ressource de la base de données
        $texteReglementaire->delete();

        // Redirigez l'utilisateur vers la liste des textes réglementaires avec un message de confirmation
        return response()->json([
            "success" => true,
            "message" => "Le texte réglementaire a été supprimé avec succès"
        ]);
    }
}