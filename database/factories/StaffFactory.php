<?php

namespace Database\Factories;

use App\Models\Staff;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class StaffFactory extends Factory
{
    protected $model = Staff::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'birthdate' => $this->faker->date(),
            'start_date' => $this->faker->date(),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'position_id' => null,
            'salary' => $this->faker->randomFloat(2, 20000, 80000),
            'employment_status' => $this->faker->rand(0, 2),
            'emergency_contact_name' => $this->faker->name(),
            'emergency_contact_number' => $this->faker->phoneNumber(),
            'emergency_contact_relationship' => Arr::random(['Parent', 'Sibling', 'Spouse', 'Friend', 'Guardian', 'Relative']),
            'gender' => $this->faker->rand(0, 1),
            'notes' => $this->faker->sentence(),
        ];
    }
}
