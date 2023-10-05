<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exam_candidates', function (Blueprint $table) {
            $table->id();
            //$table->foreignId('user_id')->constrained();
            //$table->foreignId('quiz_id')->constrained();
            $table->integer('user_id');
            $table->integer('quiz_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_candidates');
    }
};
