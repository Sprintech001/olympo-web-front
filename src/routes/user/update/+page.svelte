<script>
    import { onMount } from 'svelte';
    import { userSession } from '/src/services/storelinks.js'; 
    import { get } from 'svelte/store';
    import { goto } from '$app/navigation';
    import { IconChevronLeft } from '@tabler/icons-svelte';

    let user = {
        cpf: '',
        name: '',
        email: '',
        phone: '',
        birthDate: '',
        image: null,
        imagePath: ''
    };
    let isLoading = false;
    let error = '';

    const fetchUser = async () => {
        try {
            isLoading = true;

            const loggedUser = get(userSession);
            if (!loggedUser || !loggedUser.token) {
                error = 'Usuário não autenticado.';
                goto('/login'); 
                return;
            }

            user = {
                cpf: loggedUser.cpf || '',
                name: loggedUser.name || 'Nome não disponível',
                email: loggedUser.email || '',
                phone: loggedUser.phone || '',
                birthDate: loggedUser.birthDate || '',
                // imagePath: loggedUser.fullUserData?.imagePath ? `http://localhost:5000/${loggedUser.fullUserData.imagePath}` : ''
            };
        } catch (err) {
            console.error(err);
            error = 'Erro ao carregar informações do usuário.';
        } finally {
            isLoading = false;
        }
    };

    const updateUser = async () => {
        try {
            isLoading = true;

            const loggedUser = get(userSession);
            if (!loggedUser || !loggedUser.token) {
                error = 'Usuário não autenticado.';
                goto('/login'); 
                return;
            }

            const formData = new FormData();
            formData.append('cpf', user.cpf);
            formData.append('name', user.name);
            formData.append('email', user.email);
            formData.append('phone', user.phone);

            const formattedBirthDate = user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : '';
            formData.append('birthDate', formattedBirthDate);

            if (user.image) {
                formData.append('image', user.image);
            }

            console.log("Token enviado no cabeçalho:", loggedUser.token);

            const response = await fetch(`http://localhost:5000/api/auth/update/${loggedUser.id}`, { 
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${loggedUser.token}`
                }, 
                body: formData
            });

            if (!response.ok) throw new Error('Erro ao atualizar informações do usuário.');

            alert('Informações atualizadas com sucesso!');
            fetchUser(); 
        } catch (err) {
            console.error(err);
            error = 'Erro ao atualizar informações do usuário.';
        } finally {
            isLoading = false;
        }
    };

    onMount(fetchUser);
</script>

<section class="w-full min-h-dvh flex flex-col items-center py-4 px-8 gap-8 bg-[#2c2c2c] font-karantina uppercase">
    <div class="w-full flex justify-between">
        <a href="/user" class="bg-[#2c2c2c] p-2 rounded-full border border-zinc-600"> <IconChevronLeft color="#facc15"/> </a>
    </div>
    <h1 class="text-2xl text-white">Atualizar Informações</h1>

    {#if user.imagePath}
        <img src={user.imagePath} alt="Imagem do usuário" class="w-32 h-32 rounded-full object-cover border-2 border-yellow-400" />
    {/if}

    {#if isLoading}
        <p>Carregando...</p>
    {:else}
        <form on:submit|preventDefault={updateUser} class="w-full max-w-md flex flex-col gap-4 bg-gray-800 p-6 rounded shadow-md">
            <div class="flex flex-col gap-2">
                <label for="cpf" class="text-white">CPF:</label>
                <input id="cpf" type="text" bind:value={user.cpf} class="p-2 rounded border" />
            </div>

            <div class="flex flex-col gap-2">
                <label for="name" class="text-white">Nome:</label>
                <input id="name" type="text" bind:value={user.name} class="p-2 rounded border" />
            </div>

            <div class="flex flex-col gap-2">
                <label for="email" class="text-white">Email:</label>
                <input id="email" type="email" bind:value={user.email} class="p-2 rounded border" />
            </div>

            <div class="flex flex-col gap-2">
                <label for="phone" class="text-white">Telefone:</label>
                <input id="phone" type="text" bind:value={user.phone} class="p-2 rounded border" />
            </div>

            <div class="flex flex-col gap-2">
                <label for="birthDate" class="text-white">Data de Nascimento:</label>
                <input id="birthDate" type="date" bind:value={user.birthDate} class="p-2 rounded border" />
            </div>

            <div class="flex flex-col gap-2">
                <label for="image" class="text-white">Imagem:</label>
                <input id="image" type="file" accept="image/*" on:change={(e) => user.imagePath = e.target.files[0]} class="p-2 rounded border" />
            </div>

            {#if error}
                <p class="text-red-500">{error}</p>
            {/if}

            <button type="submit" class="px-4 py-2 bg-[#facc15] text-black rounded shadow">Salvar</button>
        </form>
    {/if}
</section>

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

    button {
        margin-top: 10px;
        cursor: pointer;
    }

    img {
        margin-bottom: 20px;
    }
</style>

