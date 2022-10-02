<?php

namespace App\Services\Base;

use App\Repositories\Base\RepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Throwable;


class BaseServiceImp implements BaseServiceInterface
{
    /**
     * @var RepositoryInterface
     */
    protected $repository;

    /**
     * @return Collection | boolean
     */
    public function getAll(): Collection
    {
        try{
            return $this->repository->getAll();
        }
        catch (Throwable $e){
            logger()->error("{$e->getMessage()} {$e->getTraceAsString()}");
            return false;
        }
    }

    /**
     * @param int $id
     * @return false|mixed
     */
    public function findById(int $id)
    {
        try{
            return $this->repository->findById($id);
        }
        catch(Throwable $e){
            logger()->error("{$e->getMessage()} {$e->getTraceAsString()}");
            return false;
        }
    }

    /**
     * @param int $id
     * @param array $attributes
     * @return false|mixed
     */
    public function update(int $id, array $attributes)
    {
        try {
            return $this->repository->update($id, $attributes);
        } catch (Throwable $e) {
            logger()->error("{$e->getMessage()} {$e->getTraceAsString()}");
            return false;
        }
    }

    /**
     * @param array $attributes
     * @return false|mixed
     */
    public function create(array $attributes)
    {
        try {
            return $this->repository->create($attributes);
        } catch (Throwable $e) {
            logger()->error("{$e->getMessage()} {$e->getTraceAsString()}");
            return false;
        }
    }

    /**
     * @param int $id
     * @return false|mixed
     */
    public function delete(int $id)
    {
        try {
            return $this->repository->delete($id);
        } catch (Throwable $e) {
            logger()->error("{$e->getMessage()} {$e->getTraceAsString()}");
            return false;
        }
    }


}
