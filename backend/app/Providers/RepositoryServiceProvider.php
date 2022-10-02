<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Base\RepositoryEloquent;
use App\Repositories\Base\RepositoryInterface;
use App\Repositories\Review\ReviewRepository;
use App\Repositories\Review\ReviewRepositoryEloquent;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(ReviewRepository::class, ReviewRepositoryEloquent::class);
    }
    public function boot()
    {

    }
}
