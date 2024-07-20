<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use App\Interfaces\BaseRepositoryInterface;

class BaseRepository implements BaseRepositoryInterface
{
    public function __construct(protected Model $model)
    {
    }

    public function getModel(): Model
    {
        return $this->model;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function findFirstWithCondition($condition)
    {
        return $this->model->where($condition)->first();
    }

    public function findManyWithCondition($condition)
    {
        return $this->model->where($condition)->get();
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $record = $this->model->find($id);

        if ($record) {
            $record->update($data);

            return $record;
        }

        return false;
    }

    public function delete($id)
    {
        $record = $this->model->find($id);

        if ($record) {
            $record->delete();

            return true;
        }

        return false;
    }

    public function count()
    {
        return $this->model->count();
    }

    public function first()
    {
        return $this->model->first();
    }

    public function findOrFail($id)
    {
        return $this->model->findOrFail($id);
    }

    public function paginate($perPage = 15, $columns = ['*'], $pageName = 'page', $page = null)
    {
        return $this->model->paginate($perPage, $columns, $pageName, $page);
    }

    public function updateOrCreate(array $attributes, array $values = [])
    {
        return $this->model->updateOrCreate($attributes, $values);
    }
}
