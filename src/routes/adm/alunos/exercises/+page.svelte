<script>
    import { IconChevronLeft } from "@tabler/icons-svelte";
    import avatar from "../../../../images/avatar.png";
    import { page } from '$app/stores';
    import ExerciseCard from '../../../../lib/ExerciseCard.svelte';
    import ShowOptions from '../../../../lib/ShowOptions.svelte';
    import ShowExercises from "$lib/ShowExercises.svelte";

    let aluno = null;
    let exercises = [];
    let error = null;
    let selectedExercise = null;
    let showExercise = false;

    async function getUserExercises() {
        try {
            const response = await fetch(`http://localhost:5000/api/exerciseday/${aluno.id}/exercises`);

            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }

            const data = await response.json();
            exercises = data?.$values || [];  
            console.log('Exercícios do aluno:', exercises);
        } catch (err) {
            error = 'Erro ao buscar exercícios: ' + err.message;
            console.error(error);
        }
    }

    function updateExercises() {
        getUserExercises(); 
    }

    $: {
        aluno = page?.state?.aluno || JSON.parse(sessionStorage.getItem('aluno')); 
        console.log('Aluno recebido:', aluno);
        if (aluno) {
            sessionStorage.setItem('aluno', JSON.stringify(aluno));
            getUserExercises();
        }
    }

    function toggleOptions(exercise) {
        selectedExercise = selectedExercise && selectedExercise.id === exercise.id ? null : exercise;
    }

    function closeOptions() {
        selectedExercise = null;
    }

    function insertExercise() {
        showExercise = !showExercise;
        console.log('showExercise:', showExercise); 
    }

    $: showExercise;

</script>

<section class="w-full min-h-dvh flex flex-col items-start py-4 px-8 gap-8 bg-[#2c2c2c] font-karantina uppercase">
    <div id="head" class="w-full flex justify-between">
        <a href="/adm/alunos/" class="bg-[#2c2c2c] p-2 rounded-full border border-zinc-600">
            <IconChevronLeft color="#facc15" />
        </a>
    </div>

    <main class="w-full flex flex-col gap-8">
        <div id="exercicios" class="w-full flex flex-col gap-4 text-white">
            {#if aluno}
                <div class="w-full flex justify-between items-center mt-4 mb-4">
                    <h2 class="text-5xl">{aluno.name}</h2>
                    <button 
                        class="w-28 flex items-center justify-center px-2 py-3 rounded-xl bg-[#facc15] text-black"
                        on:click={insertExercise}>
                        <span class="text-xl ml-1">Exercício</span>
                    </button>
                </div>
            {/if}

            {#if showExercise}
                <ShowExercises userId={aluno.id} exerciseUser={exercises} onExercisesCreated={updateExercises} />
            {/if}

            {#if error}
                <div class="text-red-500">{error}</div>
            {:else if exercises.length === 0}
                <div class="text-gray-400">Nenhum exercício encontrado.</div>
            {:else}
                {#each exercises as exercise}
                    <div class="relative">
                        <ExerciseCard {exercise} onExercisesCreated={updateExercises} />
                        <button class="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded" 
                            on:click={() => toggleOptions(exercise)} >
                            Ajustar exercício
                        </button>
                        {#if selectedExercise && selectedExercise.id === exercise.id}
                            <ShowOptions {selectedExercise} on:close={closeOptions} exerciseId={exercise.id} userId={aluno.id} />
                        {/if}
                    </div>
                {/each}
            {/if}
        </div>
    </main>
</section>
