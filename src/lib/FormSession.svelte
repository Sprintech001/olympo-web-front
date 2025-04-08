<script>
    export let deleteSession;  
    export let updateSession;
    export let retornSessions = {}; 
</script>

{#each filteredSessions as retornSessions}
    <FormSession 
        {retornSessions}
        {filteredSessions} 
        {updateSession} 
        {deleteSession} 
    />
{/each}

<div class="flex flex-col gap-2 mb-4">
    <h2 class="text-lg font-bold">Sessão: {retornSessions.exercise?.name || "Sem nome de exercício"}</h2>
    <p class="text-sm text-gray-500">Preencha os campos abaixo para editar a sessão.</p>
</div>

<form on:submit|preventDefault={() => updateSession(retornSessions)} class="mt-0 flex flex-col gap-4 border p-4 rounded shadow-md">
    <input type="hidden" value={retornSessions.id} />

    <div class="flex flex-col gap-2">
        <label>Tempo de sessões (minutos):</label>
        <input type="number" bind:value={retornSessions.time} min="1" required class="border p-2 rounded" />
    </div>

    <div class="flex flex-col gap-2">
        <label>Quantidade de Séries:</label>
        <input type="number" bind:value={retornSessions.series} min="1" required class="border p-2 rounded" />
    </div>

    <div class="flex flex-col gap-2">
        <label>Quantidade de repetições:</label>
        <input type="number" bind:value={retornSessions.repetitions} min="1" required class="border p-2 rounded" />
    </div>

    <div class="flex flex-col gap-2">
        <label>Tempo de intervalos (minutos):</label>
        <input type="number" bind:value={retornSessions.breaks} min="1" required class="border p-2 rounded" />
    </div>

    <div class="flex justify-between mt-4">
        <button type="submit" class="px-4 py-2 bg-[#facc15] text-black rounded shadow">Salvar</button>
        <button type="button" on:click={() => deleteSession(retornSessions.id)} class="px-4 py-2 bg-red-500 text-white rounded shadow">Deletar</button>
    </div>
</form>

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
