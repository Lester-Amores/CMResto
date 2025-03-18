<?php

namespace App\Http\Controllers;

use App\Http\Requests\StaffRequest;
use App\Models\Staff;
use App\Services\StaffService;
use Inertia\Inertia;
use Inertia\Response;

class StaffController extends Controller
{
    protected StaffService $staffService;

    public function __construct(StaffService $staffService)
    {
        $this->staffService = $staffService;
    }

    public function index(): Response
    {
        return Inertia::render('Staff/Index', [
            'staff' => $this->staffService->getAllPaginated(),
        ]);
    }

    public function store(StaffRequest $request)
    {
        $staff = $request->validated();
        Staff::create($staff);

        return redirect()->back()->with('success', 'Successfully created');
    }

    public function show(Staff $staff): Response
    {
        return Inertia::render('Staff/Show', [
            'staff' => $staff,
        ]);
    }

    public function update(StaffRequest $request, Staff $staff)
    {
        $data = $request->validated();
        $staff->update($data);

        return redirect()->back()->with('success', 'Successfully updated');
    }

    public function destroy(Staff $staff)
    {
        $staff->delete();

        return redirect()->back()->with('success', 'Staff deleted successfully');
    }

    public function restore(int $id)
    {
        $staff = Staff::withTrashed()->findOrFail($id);
        $staff->restore();

        return redirect()->back()->with('success', 'Staff restored successfully');
    }
}
