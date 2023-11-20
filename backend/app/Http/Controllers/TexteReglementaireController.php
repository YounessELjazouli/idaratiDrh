<?php

namespace App\Http\Controllers;

use App\Models\TexteReglementaire;
use Illuminate\Http\Request;

class TexteReglementaireController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $textesReglementaires = TexteReglementaire::all();
        // return view('textes-reglementaires.index', compact('textesReglementaires'));+-
        return response()->json([
            "success" => true,
            "data" => $textesReglementaires
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
        $validatedData = $request->validate([
            'numero_serie' => 'required|integer|unique:textes_reglementaires',
            'qualite_texte' => 'required|string|max:20',
            'sujet' => 'required|string',
            'ref' => 'required|string',
            'date' => 'required|date',
            'texte' => 'required|string',
        ]);

        // Enregistrez les données dans la base de données
        $data = TexteReglementaire::create($validatedData);

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
        $validatedData = $request->validate([
            'numero_serie' => 'required|integer',
            'qualite_texte' => 'required|string|max:20',
            'sujet' => 'required|string',
            'ref' => 'required|string',
            'date' => 'required|date',
            'texte' => 'required|string',
        ]);

        // Mettez à jour les données dans la base de données
        $texteReglementaire = TexteReglementaire::find($id);

        if (!$texteReglementaire) {
            // Gérez le cas où la ressource n'est pas trouvée
            return response()->json([
                "success" => false,
                "message" => "Ressource not found"
            ]);
        }

        $updatedData = $texteReglementaire->update($validatedData);

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