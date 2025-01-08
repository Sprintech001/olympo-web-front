<script>
    import OlympoYellow from "../../images/olympo-yellow.png";
    import {
    IconBarbell,
    IconChevronLeft,
        IconClock,
        IconFlame,
        IconHeartbeat,
        IconRun,
        IconUser,
        IconInputCheck,
    } from "@tabler/icons-svelte";
    import { IconLock } from "@tabler/icons-svelte";
    import { onMount } from 'svelte';
    import { selectedExerciseId } from '../../lib/storelinks.ts';

    let exercises = [];
    let exercise = { id: null, name: '', description: '', imagePath: '', videoPath: "" }; 
    let error = null;
    let message = '';
    let imagePath = null;
    let videoPath = null;

    async function fetchExercises() {
        try {
            let exerciseId;
            selectedExerciseId.subscribe(value => {
                exerciseId = value;
            });

            if (!exerciseId) {
                throw new Error('ID do exercício não encontrado');
            }

            const response = await fetch(`http://localhost:5217/api/exercise/${exerciseId}`);
            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }
            exercise = await response.json();
            console.log(exercise);
        } catch (err) {
            error = err.message;
        }
    }

    onMount(() => {
        fetchExercises();
    });
    
</script>

<section class="w-full min-h-dvh flex flex-col items-start gap-4 bg-[#2c2c2c]">
     <div id="hero"
        class="w-full h-60 flex items-start justify-between p-4 rounded-xl bg-cover bg-top"
        style="background-image: url('http://localhost:5217/api/Files/{exercise.imagePath}')">
        <a href="/home" 
            on:click={(e) => e.stopPropagation()} 
            class="bg-[#2c2c2c] p-2 rounded-full border border-zinc-600"> 
            <IconChevronLeft color="#facc15"/> 
        </a>
    </div>

    <main class="w-full flex flex-col gap-8 py-4 px-8">
        <div id="texts" class="w-full flex flex-col items-center justify-center gap-4 text-white">
            <h2 class="text-3xl font-karantina uppercase">{exercise.name}</h2>
            <p class="">{exercise.description}</p>
        </div>

        <div id="info" class="w-full flex flex-wrap itmes-center justify-between text-white text-md">
            <div class="flex justify-between items-center gap-2">
                <IconBarbell color="#facc15" size="32"/>
                <span class="leading-5">Repetiçẽs <br><strong>3x12</strong></span>
            </div>
            <div class="flex justify-between items-center gap-2">
                <IconFlame color="#facc15" size="32"/>
                <span class="leading-5">Gastos <br><strong>140 Kcal</strong></span>
            </div>
        </div>
        <a 
            href="/exercise/execution"
            class="flex items-center justify-center p-4 rounded-xl bg-[#facc15] text-black mt-4"
        >
            <IconInputCheck size="32" color="#2c2c2c" />
            <span class="text-2xl ml-1">Iniciar</span>
        </a>
    </main>
</section>

<style>
    #hero {
        background-size: cover;
        background-position: center;
    }

    #name {
        font-size: 2rem;
    }
</style>