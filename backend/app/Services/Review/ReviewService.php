<?php

namespace App\Services\Review;

use Illuminate\Database\Eloquent\Collection;

interface ReviewService
{
    /**
     * @return Collection
     */
    public function getAllReview() : Collection;

    /**
     * @param array $attributes
     * @return mixed
     */
    public function createReview(array $attributes);

    /**
     * @param int $reviewId
     * @return mixed
     */
    public function getReview(int $reviewId);

    /**
     * @param int $reviewId
     * @param array $attributes
     * @return mixed
     */
    public function updateReview(int $reviewId, array $attributes);

    /**
     * @param int $reviewId
     * @return mixed
     */
    public function deleteReview(int $reviewId);

    /**
     * @return mixed
     */
    public function deleteAllReview();

    /**
     * @param string $search
     * @return mixed
     */
    public function getAllReviewBySearch(string $search);
}
