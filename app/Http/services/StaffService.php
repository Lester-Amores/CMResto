<?php

namespace App\Services;

use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class StaffService
{
    public function getStaff(Request $request): LengthAwarePaginator
    {
        $query = Staff::query();

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%")
                  ->orWhere('phone', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('position_id')) {
            $query->where('position_id', $request->position_id);
        }

        if ($request->filled('employment_status')) {
            $query->where('employment_status', $request->employment_status);
        }

        if ($request->filled('gender')) {
            $query->where('gender', $request->gender);
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
