<script>
    import { IconChevronLeft } from "@tabler/icons-svelte";
    import avatar from "../../../../images/avatar.png";
    import { page } from '$app/stores';
    import ExerciseCard from '../../../../lib/ExerciseCard.svelte';
    import ShowOptions from '../../../../lib/ShowOptions.svelte';

    let aluno = null;
    let exercises = [];
    let error = null;
    let selectedExercise = null;

    async function fetchExercises(userId) {
        try {
            const response = await fetch(`http://191.252.195.85:5000/api/user/${aluno.id}/exercises`);
            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }
            exercises = await response.json();
            console.log('Exercícios:', exercises);
        } catch (err) {
            error = err.message;
            console.error('Erro ao buscar exercícios:', error);
        }
    }

    $: {
        aluno = page?.state?.aluno || JSON.parse(sessionStorage.getItem('aluno')); 
        console.log('Aluno recebido:', aluno);
        if (aluno) {
            sessionStorage.setItem('aluno', JSON.stringify(aluno));
            fetchExercises(aluno.id);
        }
    }

    function toggleOptions(exercise) {
        if (selectedExercise && selectedExercise.id === exercise.id) {
            selectedExercise = null;
        } else {
            selectedExercise = exercise;
        }
    }

    function closeOptions() {
        selectedExercise = null;
    }
</script>

<section class="w-full min-h-dvh flex flex-col items-start py-4 px-8 gap-8 bg-[#2c2c2c] font-karantina uppercase">
    <div id="head" class="w-full flex justify-between">
        <a href="/adm/home" class="bg-[#2c2c2c] p-2 rounded-full border border-zinc-600">
            <IconChevronLeft color="#facc15" />
        </a>
    </div>

    <main class="w-full flex flex-col gap-8">
        <div id="exercicios" class="w-full flex flex-col gap-4 text-white">
            {#if aluno}
                <div class="w-full flex justify-between items-center mt-4 mb-4">
                    <h2 class="text-5xl">{aluno.name}</h2>
                </div>
            {/if}

            {#if error}
                <div class="text-red-500">{error}</div>
            {:else if exercises.length === 0}
                <div class="text-gray-400">Nenhum exercício encontrado.</div>
            {:else}
                {#each exercises.$values as exercise}
                    <div class="relative">
                        <ExerciseCard {exercise} />
                        <button class="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded" on:click={() => toggleOptions(exercise)}>
                            Ajustar exercício
                        </button>
                        {#if selectedExercise && selectedExercise.id === exercise.id}
                            <ShowOptions {selectedExercise} on:close={closeOptions} />
                        {/if}
                    </div>
                {/each}
            {/if}
        </div>
    </main>
</section>
