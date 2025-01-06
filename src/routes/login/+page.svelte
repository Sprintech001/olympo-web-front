<script>
    import OlympoYellow from '../../images/olympo-yellow.png'
    import { IconUser } from '@tabler/icons-svelte';
    import { IconLock } from '@tabler/icons-svelte';
</script>

<section class="w-full min-h-dvh flex flex-col items-start px-8 gap-8 bg-[#2c2c2c]">
    <div class="w-full flex py-8 justify-between">
        <img src={OlympoYellow} alt="Logo Olympo" class="max-w-16">
    </div>
    <div id="titles">
        <h2 class="text-3xl text-yellow-400 font-extrabold">Login</h2>
        <h3 class="text-xl text-white">Bem-vindo(a) de volta!</h3>
    </div>
    <form action="" class="w-full flex flex-col gap-4">
        <div class="flex items-center justify-start pl-4 border-2 border-white rounded-full">
            <IconUser color="#facc15"/>
            <input type="email" placeholder="E-mail" class="py-3 px-4 bg-transparent font-semibold text-white outline-none rounded-full">
        </div>
        <div class="flex items-center justify-start pl-4 border-2 border-white rounded-full">
            <IconLock color="#facc15"/>
            <input type="password" placeholder="Senha" class="py-3 px-4 bg-transparent font-semibold text-white outline-none rounded-full">
        </div>
        <a href="/" class="text-yellow-400 font-semibold">Recuperar senha</a>
    </form>
    <div class="w-full flex flex-col pb-16">
        <a href="/home" class="px-4 py-3 bg-yellow-400 font-karantina w-full rounded-full tracking-wider text-3xl text-center">ENTRAR</a>
    </div>
</section>