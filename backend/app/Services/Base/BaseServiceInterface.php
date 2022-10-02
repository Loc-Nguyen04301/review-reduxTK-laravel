<?php

namespace App\Services\Base;
use Illuminate\Database\Eloquent\Collection;

interface BaseServiceInterface
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
     * @param int $id
     * @param array $attributes
     * @return mixed
     */
    public function update(int $id, array $attributes);

    /**
     * @param array $attributes
     * @return mixed
     */
    public function create(array $attributes);

    /**
     * @param int $id
     * @return mixed
     */
    public function delete(int $id);
}
