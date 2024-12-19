<script>
    import OlympoYellow from "../../images/olympo-yellow.png";
    import Avatar from '../../images/avatar.png'
    import {
        IconFlame,
        IconHeartbeat,
        IconRun,
        IconUser,
    } from "@tabler/icons-svelte";
    import { IconLock } from "@tabler/icons-svelte";
    import { BarChart, Svg, Axis, Bars } from "layerchart";

    let data = [
        {
            date: new Date("December 17, 1995 03:24:00"),
            value: 59,
            baseline: 55,
        },
        {
            date: new Date("December 18, 1995 03:24:00"),
            value: 44,
            baseline: 64,
        },
        {
            date: new Date("December 19, 1995 03:24:00"),
            value: 90,
            baseline: 35,
        },
        {
            date: new Date("December 20, 1995 03:24:00"),
            value: 36,
            baseline: 73,
        },
        {
            date: new Date("December 21, 1995 03:24:00"),
            value: 44,
            baseline: 34,
        },
        {
            date: new Date("December 22, 1995 03:24:00"),
            value: 55,
            baseline: 86,
        },
    ];
</script>

<section class="w-full min-h-dvh flex flex-col items-start py-4 px-8 gap-4 bg-[#2c2c2c] font-karantina uppercase">
    <div id="head" class="w-full">
        <div class="w-full flex justify-end">
            <img src={OlympoYellow} alt="Logo Olympo" class="w-6 rounded-full" />
        </div>
        <a href="/user" class="w-full flex gap-4 items-center">
            <img src={Avatar} alt="Logo Olympo" class="w-20 h-20 rounded-full" />
            <h1 class="w-3/5 text-white text-2xl font-karantina">
                Bem vindo de volta <br />Pedro Henrique
            </h1>
        </a>
    </div>

    <main class="w-full flex flex-col gap-8">
        <div id="estatisticas" class="w-full flex items-center justify-between capitalize">
            <div id="repeticoes" class="w-24 h-24 flex flex-col items-center justify-center bg-[#D9D9D9] bg-opacity-10 rounded-xl">
                <IconRun size="32" color="#facc15" />
                <h2 class="text-xl text-white">1893</h2>
                <span class="text-white">Repetições</span>
            </div>
            <div id="kcal" class="w-24 h-24 flex flex-col items-center justify-center bg-[#D9D9D9] bg-opacity-10 rounded-xl">
                <IconFlame size="32" color="#facc15" />
                <h2 class="text-xl text-white">6.835 Kcal</h2>
                <span class="text-white">Por exercício</span>
            </div>
            <div id="bpm" class="w-24 h-24 flex flex-col items-center justify-center bg-[#D9D9D9] bg-opacity-10 rounded-xl">
                <IconHeartbeat size="32" color="#facc15" />
                <h2 class="text-xl text-white">123</h2>
                <span class="text-white">BPM</span>
            </div>
        </div>

        <div id="desempenho" class="w-full p-4 flex flex-col gap-4 bg-[#D9D9D9] bg-opacity-10 rounded-xl">
            <h2 class="text-2xl text-white">Desempenho</h2>
            <div class="h-[200px] text-white text-2xl">
                <BarChart {data} x="date" y="value" axis="x">
                    <!-- <Bars style="fill: #facc15;" /> -->
                    <!-- <Axis axis="x" labelStyle="font-size: 14px; fill: #ffffff;" /> -->
                </BarChart>
                
            </div>
        </div>

        <div id="exercicios" class="w-full flex flex-col gap-4 text-white">
            <div class="w-full flex justify-between items-center">
                <h2 class="text-2xl">Exercícios Diarios</h2>
                <a href="/">Ver Todos</a>
            </div>
            <div class="w-full flex flex-col gap-4">
                <a id="exe" href="/exercise" class="w-full h-44 flex flex-col items-start justify-center p-4 rounded-xl bg-cover bg-top">
                    <h2 class="text-5xl">Rosca Concentrada</h2>
                    <h3 class="text-2xl lowercase">3x12 repetições</h3>
                </a>
                <a id="exe2" href="/exerciseAgachamento" class="w-full h-44 flex flex-col items-start justify-center p-4 rounded-xl bg-cover bg-top">
                    <h2 class="text-5xl">Agachamento Terra</h2>
                    <h3 class="text-2xl lowercase">10 minutos</h3>
                </a>
            </div>
        </div>
    </main>
</section>

<style>
    #exe {
        background-image: url('../../images/exe.png');
    }

    #exe2 {
        background-image: url('../../images/exe2.png');
    }
</style>