<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Correspondance;
use App\Models\Doctype;

class StatController extends Controller
{
    public function stat1()
    {
        // Count of Correspondances per Doctype
        $doctypeCounts = Doctype::withCount('correspondances')->get()->pluck('correspondances_count')->toArray();

        return response()->json(['statistic_1' => $doctypeCounts]);
    }

    public function stat2()
    {
        // Average number of days between correspondance creation
        $avgDays = Correspondance::avg('created_at');

        return response()->json(['statistic_2' => $avgDays]);
    }

    public function stat3()
    {
        // Fetching specific data based on a condition
        // $specificData = Correspondance::where('reference', 'specific_value')->count();
        $specificData = [12,20,11,33,12];
        
        return response()->json(['statistic_3' => $specificData]);
    }

    
    public function abstractStat(Request $request){
        $select =$request->only?strtoupper($request->only):'*';

        $data =[
            "select"=>$select
        ];
        if($select=="REF" || $select=="*"){
            $REF_Count = Doctype::withCount('correspondances')
            ->where("type","refs")
            ->get();
            $data=array_merge($data,["REF"=>$REF_Count]);
        }
        if($select=="COR" || $select=="*"){
            $CORR_Count = Doctype::withCount('textesreglementaires')
            ->where("type","textes")
            ->get();
            $data=array_merge($data,["COR"=>$CORR_Count]);
        }
        return response()->json($data);
    }
}

