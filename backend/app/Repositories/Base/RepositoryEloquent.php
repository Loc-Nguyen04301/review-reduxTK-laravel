<?php

namespace App\Repositories\Base;

use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\Collection;


abstract class RepositoryEloquent implements RepositoryInterface
{

    protected $_model;

    /**
     * @throws BindingResolutionException
     */
    public function __construct()
    {
        $this->setModel();
    }

    /**
     * @return mixed
     */
    abstract public function getModel();

    /**
     * @return void
     * @throws BindingResolutionException
     */
    public function setModel()
    {
        $this->_model = app()->make($this->getModel());
    }

    /**
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->_model->all();
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function findById(int $id)
    {
        return $this->_model->find($id);
    }

    /**
     * @param array $attributes
     * @return mixed
     */
    public function create(array $attributes)
    {
        return $this->_model->create($attributes);
    }

    /**
     * @param int $id
     * @param array $attributes
     * @return false|mixed
     */
    public function update(int $id, array $attributes)
    {
        $result = $this->findById($id);
        if ($result) {
            $result->update($attributes);
            return $result;
        }
        return false;
    }

    /**
     * @param $id
     * @return bool
     */
    public function delete($id):bool
    {
        $result = $this->findById($id);
        if ($result) {
            return $result->delete();
        }
        return false;
    }
}
