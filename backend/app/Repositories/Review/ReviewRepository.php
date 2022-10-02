<?php

namespace App\Repositories\Review;

use App\Repositories\Base\RepositoryInterface;

interface ReviewRepository extends RepositoryInterface
{
    public function getAllBySearch(string $search) ;
    public function destroyAll();
}
