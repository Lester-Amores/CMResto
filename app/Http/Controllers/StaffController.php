<?php

namespace App\Http\Controllers;

use App\Http\Requests\StaffRequest;
use App\Models\Staff;
use App\Services\StaffService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    protected StaffService $staffService;

    public function __construct(StaffService $staffService)
    {
        $this->staffService = $staffService;
    }

    public function index(Request $request)
    {
        $staff = $this->staffService->getStaff($request);
        $data = [
            'staff' => $staff->items(),
            'current_page' => $staff->currentPage(),
            'total_pages' => $staff->lastPage(),
            'total_rows' => $staff->total(),
            'per_page' => $staff->perPage(),
        ];

        return Inertia::render('Staff/Index', $data);
    }

    public function store(StaffRequest $request)
    {
        $validated = $request->validated();
        Staff::create($validated);
        return redirect()->back()->with('success', 'Successfully created');
    }

    public function show(Staff $staff)
    {
        return Inertia::render('Staff/Show', $staff);
    }

    public function update(StaffRequest $request, Staff $staff)
    {
        $validated = $request->validated();
        $staff->update($validated);

        return redirect()->back()->with('success', 'Successfully updated');
    }

    public function destroy(Staff $staff)
    {
        try{
        $staff->delete();
        return redirect()->back()->with('success', 'Staff deleted successfully');
        } catch (Exception $e){
            return redirect()->back()->with('error', 'Deletion failed');
        }
    }

    public function restore(Request $request)
    {
        try {
        $staff = Staff::withTrashed()->findOrFail($request->id);
        $staff->restore();
        return redirect()->back()->with('success', 'Staff restored successfully');
        } catch (Exception $e){
            return redirect()->back()->with('error', 'restoration failed');
        }
    }

    public function multiDelete(Request $request)
    {
        try {
            $ids = $request->input('ids');
            $request->validate([
                'ids' => 'required|array',
                'ids.*' => 'integer|exists:clients,id',
            ]);
            Staff::whereIn('id', $ids)->delete();
            return redirect()->back()->with('success', 'Staff deleted Successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Deletion failed');
        }
    }

    public function multiRestore(Request $request)
    {
        try {
            $ids = $request->input('ids');
            $request->validate([
                'ids' => 'required|array',
                'ids.*' => 'integer|exists:clients,id',
            ]);

            Staff::onlyTrashed()->whereIn('id', $ids)->restore();

            return redirect()->back()->with('success', 'Staff restored successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'restoration failed');
        }
    }
}
