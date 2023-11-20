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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('textes-reglementaires.create');
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
        TexteReglementaire::create($validatedData);

        // Redirigez l'utilisateur vers la liste des textes réglementaires avec un message de confirmation
        return redirect()->route('textes-reglementaires.index')->with('success', 'Le texte réglementaire a été créé avec succès.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $texteReglementaire = TexteReglementaire::find($id);
        return view('textes-reglementaires.show', compact('texteReglementaire'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $texteReglementaire = TexteReglementaire::find($id);
        return view('textes-reglementaires.edit', compact('texteReglementaire'));
    }

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
            return redirect()->route('textes-reglementaires.index')->with('error', 'La ressource n\'existe pas.');
        }

        $texteReglementaire->update($validatedData);

        // Redirigez l'utilisateur vers la liste des textes réglementaires avec un message de confirmation
        return redirect()->route('textes-reglementaires.index')->with('success', 'Le texte réglementaire a été mis à jour avec succès.');
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
            return redirect()->route('textes-reglementaires.index')->with('error', 'La ressource n\'existe pas.');
        }

        // Supprimez la ressource de la base de données
        $texteReglementaire->delete();

        // Redirigez l'utilisateur vers la liste des textes réglementaires avec un message de confirmation
        return redirect()->route('textes-reglementaires.index')->with('success', 'Le texte réglementaire a été supprimé avec succès.');
    }
}