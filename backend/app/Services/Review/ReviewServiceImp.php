<?php

namespace App\Services\Review;


use App\Repositories\Review\ReviewRepository;
use App\Services\Base\BaseServiceImp;
use Exception;
use Illuminate\Database\Eloquent\Collection;

class ReviewServiceImp extends BaseServiceImp implements ReviewService
{

    /**
     * @var ReviewRepository
     */
    protected $repository;

    /**
     * @param ReviewRepository $repository
     */
    public function __construct(ReviewRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @return Collection
     */
    public function getAllReview(): Collection
    {
        return $this->repository->getAll();
    }

    /**
     * @param array $attributes
     * @return mixed
     */
    public function createReview(array $attributes)
    {
        return $this->repository->create($attributes);
    }

    /**
     * @param int $reviewId
     * @return mixed
     */
    public function getReview(int $reviewId)
    {
        return $this->repository->findByid($reviewId);
    }

    /**
     * @param int $reviewId
     * @param array $attributes
     * @return mixed
     */
    public function updateReview(int $reviewId, array $attributes)
    {
        try {
            return $this->repository->update($reviewId, $attributes);
        } catch (Exception $e) {
            logger()->error($e);
            return false;
        }
    }

    /**
     * @param int $reviewId
     * @return mixed
     */
    public function deleteReview(int $reviewId)
    {
        try {
            return $this->repository->delete($reviewId);
        } catch (Exception $e) {
            logger()->error($e);
            return false;
        }
    }

    /**
     * @param string $search
     * @return false|mixed
     */
    public function getAllReviewBySearch(string $search)
    {
        return $this->repository->getAllBySearch($search);
    }

    /**
     * @return false|mixed
     */
    public function deleteAllReview()
    {
        try {
            return $this->repository->destroyAll();
        } catch (Exception $e) {
            logger()->error($e);
            return false;
        }
    }
}
