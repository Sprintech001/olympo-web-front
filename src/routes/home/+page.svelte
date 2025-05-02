<script>
    import OlympoYellow from "../../images/olympo-yellow.png";
    import Avatar from '../../images/avatar.png'
    import { IconFlame, IconHeartbeat, IconRun, IconUser, IconLock } from "@tabler/icons-svelte";
    import { BarChart, Svg, Axis, Bars } from "layerchart";
    import { onMount } from 'svelte';
    import ExerciseCard from "../../lib/ExerciseCard.svelte";
    import { userSession } from "../../services/storelinks"; 


    let data = [
        { date: new Date("December 17, 1995 03:24:00"), value: 59, baseline: 55, color: "#a9a9a9" },
        { date: new Date("December 18, 1995 03:24:00"), value: 44, baseline: 64, color: "#a9a9a9" },
        { date: new Date("December 19, 1995 03:24:00"), value: 90, baseline: 35, color: "#facc15" },
        { date: new Date("December 20, 1995 03:24:00"), value: 36, baseline: 73, color: "#a9a9a9" },
        { date: new Date("December 21, 1995 03:24:00"), value: 44, baseline: 34, color: "#a9a9a9" },
        { date: new Date("December 22, 1995 03:24:00"), value: 55, baseline: 86, color: "#a9a9a9" }
    ];

    let exercises = [];
    let error = null;
    let dataofMount;
    let diaSemana;
    let filteredExercises = [];
    let diaSemanaAtual = 0;
    let user;  

    $: $userSession && (user = $userSession);
    $: console.log("user", user);

    async function fetchExercises(userId, exerciseId) {
        try {
            const response = await fetch(`http://localhost:5000/api/userexercise/sessions/${userId}`);
            if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
            const data = await response.json();
            console.log('data:', data);
            return data["$values"] || data;
        } catch (err) {
            console.error("Erro ao buscar exercícios do usuário:", err);
            error = err.message;
            return [];
        }
    }

    onMount(async () => {
        const res = await fetch('http://localhost:5000/api/user/now');
        const json = await res.json();

        const dataofMount = `${json.date} ${json.time}`;

        const diasSemanaMap = {
            "Sunday": 0,
            "Monday": 1,
            "Tuesday": 2,
            "Wednesday": 3,
            "Thursday": 4,
            "Friday": 5,
            "Saturday": 6
        };

        const diaSemanaAtual = diasSemanaMap[json.dayOfWeek];

        if (user?.id) {
            exercises = await fetchExercises(user.fullUserData.userData.id);
            console.log("OnMonted", exercises);
            filteredExercises = exercises.filter(ex => ex.day === diaSemanaAtual);
        }

        console.log("filtro", filteredExercises);
    });

</script>

<section class="w-full min-h-dvh flex flex-col items-start py-4 px-8 gap-4 bg-[#2c2c2c] font-karantina uppercase">
    <div id="head" class="w-full">
        <div class="w-full flex justify-end">
            <img src={OlympoYellow} alt="Logo Olympo" class="w-6 rounded-full" />
        </div>
        <a href="/user" class="w-full flex gap-4 items-center">
            <img src={user.imagePath ? `http://localhost:5000/api/Files/${user.imagePath}` : Avatar}  alt="Logo Olympo" class="w-20 h-20 rounded-full" />
            <h1 class="w-3/5 text-white text-2xl font-karantina">
                Bem vindo de volta <br />{user?.userName || "Usuário"}
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
                {#if data.length > 0}
                    <BarChart {data} x="date" y="value" axis="x">
                        <!-- <Bars style="fill: d => d.color;" />
                        <Axis axis="x" labelStyle="font-size: 14px; fill: #ffffff;" /> -->
                    </BarChart>
                {/if}
            </div>
        </div>

        <div id="exercicios" class="w-full flex flex-col gap-4 text-white">
            <div class="w-full flex justify-between items-center">
                <h2 class="text-2xl">Exercícios Diarios</h2>
                <!-- <p>Ver Todos da {diasEnum[diaSemanaAtual]}</p> -->
            </div>
            <div class="w-full flex flex-col gap-4">
                {#if filteredExercises.length > 0}
                    {#each filteredExercises as exercise (exercise.id)}
                        <ExerciseCard {exercise} />
                    {/each}
                {/if}
            </div>
        </div>
    </main>
</section>
