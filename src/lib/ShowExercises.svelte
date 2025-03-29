<script>
    export let userId;
    export let exerciseUser = []; 
    export let onExercisesCreated = null; 
    
    let exercises = [];
    let selectedExercises = [];
    let error = null;

    async function getExercises() {
        try {
            const response = await fetch(`http://localhost:5000/api/exercise`);
            if (!response.ok) {
                throw new Error(`Erro ao buscar exercícios: ${response.statusText}`);
            }
            
            const data = await response.json();
            let allExercises = data["$values"].map(exercise => ({
                ...exercise,
                checked: false
            }));

            const userExerciseIds = exerciseUser.map(exerciseDay => exerciseDay.exerciseId);

            exercises = allExercises.filter(exercise => !userExerciseIds.includes(exercise.id));

        } catch (err) {
            error = err.message;
            console.error('Erro ao buscar exercícios:', error);
        }
    }

    async function createExerciseDays() {
        selectedExercises = exercises.filter(exercise => exercise.checked);
        if (selectedExercises.length === 0) {
            console.log('Por favor, selecione ao menos um exercício.');
            return;
        }

        try {
            const exerciseDayRequests = selectedExercises.map(exercise => {
                const payload = {
                    ExerciseId: exercise.id,
                    DayOfWeek: null,
                    SessionId: null,
                    UserId: userId,
                };

                return fetch(`http://localhost:5000/api/exerciseday`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
            });

            await Promise.all(exerciseDayRequests);

            if (onExercisesCreated) {
                onExercisesCreated(); 
            }

            console.log('Exercícios adicionados com sucesso');
        } catch (error) {
            console.error('Erro ao adicionar exercícios:', error);
        }
    }

    $: getExercises();
</script>


{#if error}
    <p class="text-red-500">Erro: {error}</p>
{/if}

<form on:submit|preventDefault={createExerciseDays} class="mt-4 flex flex-col gap-4">
    <div class="flex flex-col gap-2">
        <label>Adicionar exercicios:</label>
        {#each exercises as exercise (exercise.id)}
            <label>
                <input type="checkbox" bind:checked={exercise.checked} />
                {exercise.name}
            </label>
        {/each}
    </div>

    <button type="submit" class="px-4 py-2 bg-[#facc15] text-black rounded">Salvar</button>
</form>

<style>
    input[type="checkbox"] {
        background-color: transparent;
        color: white;
        border: 1px solid white;
        padding: 0.5rem;
        border-radius: 0.25rem;
    }

    label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
</style>

