<script>
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    
    export let exerciseId;
    export let userId; 

   
    
    </script>
    
    <form on:submit|preventDefault={handleSubmit} class="mt-4 flex flex-col gap-4">
        <div class="flex flex-col gap-2">
            <label>Dias de execução:</label>
            {#each days as day}
            <label>
                <input type="checkbox" bind:checked={day.checked} />
                {day.name}
            </label>
            {/each}
        </div>
    
        <div class="flex flex-col gap-2">
            <label>Tempo de sessões (minutos):</label>
            <input type="number" bind:value={sessionTime} min="1" required />
        </div>
    
        <div class="flex flex-col gap-2">
            <label>Quantidade de Sessões:</label>
            <input type="number" bind:value={session} min="1" required />
        </div>
    
        <div class="flex flex-col gap-2">
            <label>Quantidade de repetições:</label>
            <input type="number" bind:value={repetitions} min="1" required />
        </div>
    
        <div class="flex flex-col gap-2">
            <label>Tempo de intervalos (minutos):</label>
            <input type="number" bind:value={intervalTime} min="1" required />
        </div>
    
        <button type="submit" class="px-4 py-2 bg-[#facc15] text-black rounded">Salvar</button>
    </form>
    
    <style>
        input[type="number"], input[type="checkbox"] {
            background-color: transparent;
            color: white;
            border: 1px solid white;
            padding: 0.5rem;
            border-radius: 0.25rem;
        }
    
        input[type="number"]::placeholder {
            color: white;
        }
    
        label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
    </style>
    