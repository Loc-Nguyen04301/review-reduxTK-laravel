<?php

namespace App\Providers;

use App\Repositories\Review\ReviewRepository;
use App\Services\Review\ReviewService;
use App\Services\Review\ReviewServiceImp;
use Illuminate\Support\ServiceProvider;

class BusinessServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(ReviewService::class, ReviewServiceImp::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
