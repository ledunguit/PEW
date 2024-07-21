<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('document_name');
            $table->string('document_path');
            $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
            $table->foreignIdFor(User::class, 'created_by')->constrained('users')->onDelete('cascade');
            $table->string("hash");
            $table->string('signature');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
