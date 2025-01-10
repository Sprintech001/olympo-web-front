<script>
    import {
        IconFlame,
        IconHeartbeat,
        IconRun,
        IconUser,
        IconChevronLeft,
        IconAddressBook,
        IconCreativeCommons,
        IconCreditCard,
        IconInputSearch,
        IconInnerShadowBottomRightFilled,
        IconRowInsertBottom,
    } from "@tabler/icons-svelte";
    import { IconLock } from "@tabler/icons-svelte";
    import { BarChart, Svg, Axis, Bars } from "layerchart";
    import { onMount } from 'svelte';
    import { selectedExerciseId } from '../../../lib/storelinks.js';

    let exercises = [];
    let error = null;

    async function fetchExercises() {
        try {
        const response = await fetch('http://localhost:5217/api/exercise');
        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }
        exercises = await response.json();
        console.log(exercises);
        } catch (err) {
        error = err.message;
        }
    }

    onMount(() => {
        fetchExercises();
    });
</script>

<section class="w-full min-h-dvh flex flex-col items-start py-4 px-8 gap-4 bg-[#2c2c2c] font-karantina uppercase">
    <div id="head" class="w-full">
        <div class="w-full flex justify-between">
            <a href="/adm/home" class="bg-[#2c2c2c] p-2 rounded-full border border-zinc-600"> <IconChevronLeft color="#facc15"/> </a>
        </div>
    </div>

    <main class="w-full flex flex-col gap-8">

        <div id="exercicios" class="w-full flex flex-col gap-4 text-white">
            <div class="w-full flex justify-between items-center mt-4 mb-4">
                <h2 class="text-4xl">Exercícios</h2>
            </div>

            <div class="w-full flex flex-col gap-4">
                {#each exercises as exercise}
                <a href="/adm/exercises/edit" 
                    class="w-full h-44 flex flex-col items-start justify-center p-4 rounded-xl bg-cover bg-top"  
                    style="background-image: url('http://localhost:5217/api/Files/{exercise.imagePath}')"
                    on:click={() => selectedExerciseId.set(exercise.id)}>
                    <h2 class="text-5xl">{exercise.name}</h2>
                </a>
                {/each}
            </div>
        </div>
    </main>
    <div>
        <a href="/adm/exercises/create" class="w-full flex items-center justify-center p-4 rounded-xl bg-[#facc15] text-black">
            <IconRowInsertBottom size="32" color="#2c2c2c" />
            <span class="text-2xl ml-1">Criar novo exercício</span>
        </a>
    </div>
</section>