<script>
    import { selectedExerciseId } from '../services/storelinks.js';
    export let exercise = {};
</script>

<div class="w-full flex flex-col gap-4">
    <a href="/exercise"
        class="w-full h-44 flex flex-col items-start justify-center p-4 rounded-xl bg-cover bg-top"  
        style="background-image: url('http://localhost:5217/api/Files/{exercise.imagePath}')"
        on:click={() => selectedExerciseId.set(exercise.id)}>
        <h2 class="text-5xl">{exercise.name}</h2>
    </a>
</div>