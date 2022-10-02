<?php

namespace App\Repositories\Review;


use App\Models\Review;
use App\Repositories\Base\RepositoryEloquent;


class ReviewRepositoryEloquent extends RepositoryEloquent implements ReviewRepository
{
    /**
     * @return string
     */
    public function getModel()
    {
        return Review::class;
    }

    /**
     * @param $search
     * @return mixed
     */
    public function getAllBySearch($search)
    {
        if ($search != null) {
            $reviews = $this->_model::where('title', 'like', "%$search%")
                ->orWhere('description', 'like', "%$search%")
                ->get();
        } else {
            $reviews = $this->_model->all();
        }
        return $reviews;
    }

    /**
     * @return mixed
     */
    public function destroyAll()
    {
        return $this->_model::truncate();
    }
}
