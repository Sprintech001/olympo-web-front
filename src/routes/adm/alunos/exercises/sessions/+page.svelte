<script>
    import { onMount } from 'svelte';
    import { sessionStore } from '/src/services/storelinks.js';
    import { get } from 'svelte/store';

    let userId;
    let exerciseId;
    let filteredSessions = [];
    let isLoading = false;
    let error = '';
    let emptyMessage = '';
    let exercises = [];

    const getSessionsByUserAndExercise = async (userId, exerciseId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/userexercise/sessions?userId=${userId}&exerciseId=${exerciseId}`);

            if (!response.ok) {
                if (response.status === 404) return [];
                throw new Error(`Erro ao buscar sessões para exercício ${exerciseId} do usuário ${userId}`);
            }

            const data = await response.json();
            return data?.$values ?? [];
        } catch (err) {
            console.error("Erro ao buscar sessões específicas:", err);
            error = "Erro ao carregar sessões.";
            return [];
        }
    };

    const updateSession = async (sessionData) => {
        try {
            const formData = {
                Id: sessionData.id,
                Repetitions: sessionData.repetitions,
                Series: sessionData.series,
                Breaks: sessionData.breaks,
                Time: sessionData.time,
                ExerciseId: sessionData.exercise?.id,
                UserId: sessionData.user?.id
            };

            const response = await fetch(`http://localhost:5000/api/session/${sessionData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error(`Erro ao atualizar sessão ${sessionData.id}`);
            return await response.json();
        } catch (err) {
            console.error("Erro ao atualizar sessão:", err);
        }
    };

    const deleteSession = async (sessionId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/session/${sessionId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) throw new Error(`Erro ao deletar sessão ${sessionId}`);
            filteredSessions = filteredSessions.filter(s => s.id !== sessionId);
        } catch (err) {
            console.error("Erro ao deletar sessão:", err);
        }
    };

    onMount(async () => {
        const storeData = get(sessionStore);

        console.log('storeData:', storeData);

        userId = storeData?.userId;
        exerciseId = storeData?.exerciseId;

        if (userId && exerciseId) {
            isLoading = true;
            filteredSessions = await getSessionsByUserAndExercise(userId, exerciseId);
            isLoading = false;
        } else {
            error = 'Usuário ou exercício não definidos.';
            console.warn("userId ou exerciseId não estão disponíveis no store.");
        }
    });

</script>

{#if isLoading}
    <p>Carregando sessões...</p>
{:else if filteredSessions.length === 0}
    <p class="text-white">Nenhuma sessão cadastrada para este exercício.</p>
{:else}
    {#each filteredSessions as session}
        <div class="flex flex-col gap-2 mb-4">
            <h2 class="text-lg font-bold">Sessão: {session.exercise?.name || "Sem nome de exercício"}</h2>
            <p class="text-sm text-gray-500">Preencha os campos abaixo para editar a sessão.</p>
        </div>

        <form on:submit|preventDefault={() => updateSession(session)} class="mt-0 flex flex-col gap-4 border p-4 rounded shadow-md">
            <input type="hidden" value={session.id} />

            <div class="flex flex-col gap-2">
                <label>Tempo de sessões (minutos):</label>
                <input type="number" bind:value={session.time} min="1" required class="border p-2 rounded" />
            </div>

            <div class="flex flex-col gap-2">
                <label>Quantidade de Séries:</label>
                <input type="number" bind:value={session.series} min="1" required class="border p-2 rounded" />
            </div>

            <div class="flex flex-col gap-2">
                <label>Quantidade de repetições:</label>
                <input type="number" bind:value={session.repetitions} min="1" required class="border p-2 rounded" />
            </div>

            <div class="flex flex-col gap-2">
                <label>Tempo de intervalos (minutos):</label>
                <input type="number" bind:value={session.breaks} min="1" required class="border p-2 rounded" />
            </div>

            <div class="flex justify-between mt-4">
                <button type="submit" class="px-4 py-2 bg-[#facc15] text-black rounded shadow">Salvar</button>
                <button type="button" on:click={() => deleteSession(session.id)} class="px-4 py-2 bg-red-500 text-white rounded shadow">Deletar</button>
            </div>
        </form>
    {/each}
{/if}

<style scoped>
    form {
        background-color: #2c2c2c;
        padding: 20px;
        border-radius: 8px;
        color: white;
    }

    label {
        font-size: 1.2rem;
        margin-bottom: 5px;
    }

    input {
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 100%;
        color: black;
    }

    input::placeholder {
        color: rgb(213, 29, 29); 
        font-style: italic; 
        opacity: 0.7; 
    }

    button {
        margin-top: 10px;
        cursor: pointer;
    }
</style>
