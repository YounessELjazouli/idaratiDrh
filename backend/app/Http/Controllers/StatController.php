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
        $specificData = Correspondance::where('reference', 'specific_value')->count();

        return response()->json(['statistic_3' => $specificData]);
    }
}

