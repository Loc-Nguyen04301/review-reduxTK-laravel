<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'title' => $this->faker->sentence(),
            'description' =>  $this->faker->paragraph(3),
            'ratedValue' =>  $this->faker->numberBetween(1, 5),
        ];
    }
}
