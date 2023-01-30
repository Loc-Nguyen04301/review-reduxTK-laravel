<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\Review\ReviewService;
use Exception;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Storage;

class ReviewController extends Controller
{
    use ApiResponse;

    /**
     * @var ReviewService
     */
    private $reviewService;


    /**
     * @param ReviewService $reviewService
     */
    public function __construct(ReviewService $reviewService)
    {
        $this->reviewService = $reviewService;
    }

    public function index(): JsonResponse
    {
        try {
            $reviews = $this->reviewService->getAllReview();
            return $this->successfulResult('Get data successfully', $reviews);
        } catch (Exception $e) {
            logger()->error($e);
            return $this->failResult('Fail to get data', 422);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $review = $this->reviewService->getReview($id);
            return $this->successfulResult('Get data successfully', $review);
        } catch (Exception $e) {
            logger()->error($e);
            return $this->failResult('Fail to get data', 500);
        }
    }



    public function store(Request $request): JsonResponse
    {
        try {
            $review = $this->reviewService->createReview($request->all());
            return $this->successfulResult('Create review successfully', $review);
        } catch (Exception $e) {
            logger()->error($e);
            return $this->failResult('Fail to create review', 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $review = $this->reviewService->updateReview($id, $request->input());
            return $this->successfulResult('Update review successfully', $review);
        } catch (Exception $e) {
            logger()->error($e);
            return $this->failResult('Fail to update review', 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        $bool = $this->reviewService->deleteReview($id);
        if ($bool) {
            return $this->successfulResult('Delete review successfully', $bool);
        } else {
            return $this->failResult('Failt to delete', 500);
        }
    }

    public function destroyAll(): JsonResponse
    {
        $bool = $this->reviewService->deleteAllReview();
        if ($bool) {
            return $this->successfulResult('Update review successfully', $bool);
        } else {
            return $this->failResult('Update review successfully', 500);
        }
    }

    public function getAllBySearch($search): JsonResponse
    {
        try {
            $reviews = $this->reviewService->getAllReviewBySearch($search);
            return $this->successfulResult('Get data successfully', $reviews);
        } catch (Exception $e) {
            logger()->error($e);
            return $this->failResult('Fail to get data', 422);
        }
    }
}
