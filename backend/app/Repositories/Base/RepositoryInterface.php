<?php

namespace App\Repositories\Base;

use Illuminate\Database\Eloquent\Collection;

interface RepositoryInterface
{
    /**
     * @return Collection
     */
    public function getAll(): Collection;

    /**
     * @param int $id
     * @return mixed
     */
    public function findById(int $id);

    /**
     * @param array $attributes
     * @return mixed
     */
    public function create(array $attributes);

    /**
     * @param int $id
     * @param array $attributes
     * @return mixed
     */
    public function update(int $id, array $attributes);

    /**
     * @param $id
     * @return mixed
     */
    public function delete($id);


}
