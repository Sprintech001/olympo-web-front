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
    import { onMount } from "svelte";
    import avatar from "../../../images/avatar.png"
    import OlympoYellow from "../../../images/olympo-yellow.png"
    // import { selectedAlunoId } from '../../../lib/storelinks.ts';

    // let alunos = [];
    // let error = null;

    // async function fetchAlunos() {
    //     try {
    //     const response = await fetch('http://localhost:5217/api/alunos');
    //     if (!response.ok) {
    //         throw new Error(`Erro: ${response.statusText}`);
    //     }
    //     alunos = await response.json();
    //     console.log(alunos);
    //     } catch (err) {
    //     error = err.message;
    //     }
    // }

    // onMount(() => {
    //     fetchAlunos();
    // });
</script>

<section
    class="w-full min-h-dvh flex flex-col items-start py-4 px-8 gap-8 bg-[#2c2c2c] font-karantina uppercase"
>
    <div id="head" class="w-full flex justify-between">
        <div class="w-full flex justify-between">
            <a
                href="/adm/home"
                class="bg-[#2c2c2c] p-2 rounded-full border border-zinc-600"
            >
                <IconChevronLeft color="#facc15" />
            </a>
        </div>
        <img src={OlympoYellow} alt="Logo Olympo" class="w-6 h-6 rounded-full" />
    </div>

    <main class="w-full flex flex-col gap-8">
        <div id="exercicios" class="w-full flex flex-col gap-4 text-white">
            <div class="w-full flex justify-between items-center mt-4 mb-4">
                <h2 class="text-4xl">Seus Alunos</h2>
                <a
                    href="/adm/alunos/create"
                    class="w-28 flex items-center justify-center px-2 py-3 rounded-xl bg-[#facc15] text-black"
                >
                    <IconRowInsertBottom size="32" color="#2c2c2c" />
                    <span class="text-xl ml-1">Adicionar aluno</span>
                </a>
            </div>

            <div class="w-full flex flex-col gap-2">
                <!-- {#each alunos as aluno}
                <a href="/adm/alunos/edit" 
                    class="w-full h-44 flex flex-col items-start justify-center p-4 rounded-xl bg-cover bg-top"  
                    <!-- style="background-image: url('http://localhost:5217/api/Files/{aluno.imagePath}')" -->
                    <!-- on:click={() => selectedAlunoId.set(aluno.id)}>
                    <h2 class="text-5xl">{aluno.name}</h2>
                </a>
                {/each} -->
                <a href="/adm/alunos/edit" class="w-full h-28 flex items-center p-4 gap-4 rounded-xl bg-zinc-600">   
                    <img src={avatar} alt="Avatar" class="h-9 w-9 rounded-full">
                    <div>
                        <h2 class="text-2xl">Jonh Doe</h2>
                        <span class="text-lg">Visualizar plano de treinos</span>
                    </div>
                </a>
                <a href="/adm/alunos/edit" class="w-full h-28 flex items-center p-4 gap-4 rounded-xl bg-zinc-600">   
                    <img src={avatar} alt="Avatar" class="h-9 w-9 rounded-full">
                    <div>
                        <h2 class="text-2xl">Jonh Doe</h2>
                        <span class="text-lg">Visualizar plano de treinos</span>
                    </div>
                </a>
            </div>
        </div>
    </main>
</section>
