<script>
    import { selectedExerciseId, previousRoute } from '../services/storelinks.js';
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    export let exercise = {};

    $: sessionStorage.setItem("previousRoute", $page.url.pathname);

    function navigateTo(newRoute) {
        sessionStorage.setItem("previousRoute", $page.url.pathname);
        goto(newRoute);
    }

</script>

<div class="w-full flex flex-col gap-4">
    <a on:click={() => navigateTo("/exercise")}
        class="w-full h-44 flex flex-col items-start justify-center p-4 rounded-xl bg-cover bg-top"  
        style="background-image: url('http://localhost:5000/api/Files/{exercise.imagePath}')"
        on:click={() => selectedExerciseId.set(exercise.id)}>
        <h2 class="text-5xl">{exercise.name}</h2>
    </a>
</div>