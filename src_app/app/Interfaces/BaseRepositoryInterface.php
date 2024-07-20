<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Model;

interface BaseRepositoryInterface
{
    public function getModel(): Model;
    public function all();

    public function find($id);

    public function findFirstWithCondition($condition);

    public function findManyWithCondition($condition);

    public function create(array $data);

    public function update($id, array $data);

    public function delete($id);

    public function count();

    public function first();

    public function findOrFail($id);

    public function paginate($perPage = 15, $columns = ['*'], $pageName = 'page', $page = null);

    public function updateOrCreate(array $attributes, array $values = []);
}
