<?php

namespace App\Http\Controllers;

use App\Http\Requests\BranchRequest;
use App\Models\Branch;
use App\Services\BranchService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BranchController extends Controller
{
    protected BranchService $branchService;

    public function __construct(BranchService $branchService)
    {
        $this->branchService = $branchService;
    }

    public function index(Request $request)
    {
        $branches = $this->branchService->getBranch($request);
        $data = [
            'branches' => $branches->items(),
            'current_page' => $branches->currentPage(),
            'total_pages' => $branches->lastPage(),
            'total_rows' => $branches->total(),
            'per_page' => $branches->perPage(),
        ];

        return Inertia::render('Staff/Index', $data);
    }

    public function store(BranchRequest $request)
    {
        $validated = $request->validated();
        Branch::create($validated);
        return redirect()->back()->with('success', 'Successfully created');
    }

    public function show(Branch $branch)
    {
        return Inertia::render('Staff/Show', $branch);
    }

    public function update(BranchRequest $request, Branch $branch)
    {
        $validated = $request->validated();
        $branch->update($validated);

        return redirect()->back()->with('success', 'Successfully updated');
    }

    public function destroy(Branch $branch)
    {
        try{
        $branch->delete();
        return redirect()->back()->with('success', 'Staff deleted successfully');
        } catch (Exception $e){
            return redirect()->back()->with('error', 'Deletion failed');
        }
    }

    public function restore(Request $request)
    {
        try {
        $branch = Branch::withTrashed()->findOrFail($request->id);
        $branch->restore();
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
            Branch::whereIn('id', $ids)->delete();
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

            Branch::onlyTrashed()->whereIn('id', $ids)->restore();

            return redirect()->back()->with('success', 'Staff restored successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'restoration failed');
        }
    }
}
