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

        // 🔎 Filtering
        if ($request->filled('search')) {
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

        // 📌 Sorting (Default: name ASC)
        $sortBy = $request->input('sort_by', 'name');
        $sortOrder = $request->input('sort_order', 'asc');

        if (in_array($sortBy, ['name', 'email', 'start_date', 'salary'])) {
            $query->orderBy($sortBy, $sortOrder);
        }

        // 📌 Pagination
        $perPage = $request->input('per_page', 10);

        return $query->paginate($perPage)->withQueryString();
    }
}
