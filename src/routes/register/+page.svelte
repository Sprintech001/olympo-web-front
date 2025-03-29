<script>
    import OlympoYellow from '../../images/olympo-yellow.png';
    import { IconRecordMail, IconUser } from '@tabler/icons-svelte';
    import { IconLock } from '@tabler/icons-svelte';
    import APIService from '/src/services/APIService.js';

    let message = '';
    let name = '';
    let email = '';
    let password = '';

    let api = new APIService('http://localhost:5000/api');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        createUser();
    };

    async function createUser() {
        try {
            const data = { name: name, email: email, password: password, type: 2 };
            const result = await api.post('/user', data);
            message = 'Usuário criado com sucesso!';
            console.log(result);

            setTimeout(() => {
                window.location.href = '/login';
            }, 500);
        } catch (err) {
            message = 'Erro: ' + err.message;
        }
    };

</script>

<section class="w-full min-h-dvh flex flex-col items-start px-8 gap-8 bg-[#2c2c2c]">
    <div class="w-full flex py-8 justify-between">
        <img src={OlympoYellow} alt="Logo Olympo" class="max-w-16">
        <a href="/login" class="text-yellow-400 font-semibold mt-5 mr-3">Entrar</a>
    </div>
    <div id="titles">
        <h2 class="text-3xl text-yellow-400 font-extrabold">Registro</h2>
        <h3 class="text-xl text-white">Bem-vindo(a) a Olympo</h3>
    </div>
    <form on:submit|preventDefault={handleSubmit} class="w-full flex flex-col gap-4">
        <div class="flex items-center justify-start pl-4 border-2 border-white rounded-full">
            <IconUser color="#facc15"/>
            <input 
                type="text" 
                placeholder="Nome" 
                bind:value={name} 
                class="py-3 px-4 bg-transparent font-semibold text-white outline-none rounded-full">
        </div>
        <div class="flex items-center justify-start pl-4 border-2 border-white rounded-full">
            <IconRecordMail color="#facc15"/>
            <input 
                type="email" 
                placeholder="E-mail" 
                bind:value={email} 
                class="py-3 px-4 bg-transparent font-semibold text-white outline-none rounded-full">
        </div>
        <div class="flex items-center justify-start pl-4 border-2 border-white rounded-full">
            <IconLock color="#facc15"/>
            <input 
                type="password" 
                placeholder="Senha" 
                bind:value={password} 
                class="py-3 px-4 bg-transparent font-semibold text-white outline-none rounded-full">
        </div>
        <div class="w-full flex flex-col pb-16 mt-4">
            <button 
                type="submit" 
                class="px-4 py-3 bg-yellow-400 font-karantina w-full rounded-full tracking-wider text-3xl text-center">
                Salvar
            </button>
        </div>
    </form>
</section>
