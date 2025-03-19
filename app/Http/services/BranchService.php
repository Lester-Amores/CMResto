<?php

namespace App\Services;

use App\Models\Branch;
use Illuminate\Http\Request;

class BranchService
{
    public function getBranch(Request $request)
    {
        $query = Branch::query();

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%");
            });
        }


        if ($request->filled('name')) {
            $query->where('name', $request->name);
        }

        if ($request->filled('start_date_from') && $request->filled('start_date_to')) {
            $query->whereBetween('start_date', [$request->start_date_from, $request->start_date_to]);
        }

        $sortBy = $request->input('sort_by', 'id');
        $sortOrder = $request->filled('sort_order') ? $request->sortOrder : 'desc';
        $query->orderBy($sortBy, $sortOrder);

        $perPage = $request->input('rowsPerPage', 10);

        return $query->paginate($perPage);
    }
}
