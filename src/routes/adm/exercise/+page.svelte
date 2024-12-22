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
    } from "@tabler/icons-svelte";
    import { IconLock } from "@tabler/icons-svelte";
    
</script>

<section class="w-full min-h-dvh flex flex-col items-start gap-4 bg-[#2c2c2c]">
    <div id="hero" class="w-full h-60 flex items-start justify-between p-4 rounded-xl bg-cover bg-top">
        <a href="/home" class="bg-[#2c2c2c] p-2 rounded-full border border-zinc-600"> <IconChevronLeft color="#facc15"/> </a>
        <img src={OlympoYellow} alt="Logo Olympo" class="w-8 h-8 rounded-full" />
    </div>

    <main class="w-full flex flex-col gap-8 py-4 px-8">
        <div id="texts" class="w-full flex flex-col items-center justify-center gap-4 text-white">
            <h2 class="text-3xl font-karantina uppercase">Rosca Concentrada</h2>
            <p class="">Sente-se em um banco e incline-se mantendo o peito erguido, faça a flexão do ombro levantando o halter até o ombro, pausa por um segundo no topo e estenda lentamento o braço.</p>
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
    </main>
</section>

<style>
    #hero {
        background-image: url('../../images/exe.png');
    }
</style>