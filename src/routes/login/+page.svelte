<script>
    import OlympoYellow from "../../images/olympo-yellow.png";
    import { IconUser, IconLock } from "@tabler/icons-svelte";
    import { userStore } from "../../services/userStore";
    import { get } from 'svelte/store';

    let email = "";
    let password = "";
    let error = null;
    let userType = 2;

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("Email:", email);
        console.log("Senha:", password);

        try {
            const response = await fetch(
                "http://191.252.195.85:5000/api/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                },
            );

            if (response.ok) {
                const user = await response.json();
                if (user !== null) {
                    userStore.login(user);
                }
                console.log("Login realizado com sucesso!");

                const userType = get(userStore).type;

                // switch (userType) {
                //     case 0:
                //         window.location.href = "/adm/home";
                //         break;
                //     case 1:
                //         window.location.href = "#";
                //         break;
                //     case 2:
                //         window.location.href = "/home";
                //         break;
                //     default:
                //         error = "Tipo de usuário desconhecido.";
                //         console.log(error);
                //         break;
                // }

                window.location.href = "/home";
            } else {
                error = "Erro ao criar exercício. Verifique suas credenciais.";
            }
        } catch (err) {
            error = "Erro de requisição: " + err.message;
        }
    };
</script>

<section
    class="w-full min-h-dvh flex flex-col items-start px-8 gap-8 bg-[#2c2c2c]"
>
    <div class="w-full flex py-8 justify-between">
        <img src={OlympoYellow} alt="Logo Olympo" class="max-w-16" />
        <a href="/register" class="text-yellow-400 font-semibold mt-5 mr-3"
            >Criar conta</a
        >
    </div>
    <div id="titles">
        <h2 class="text-3xl text-yellow-400 font-extrabold">Login</h2>
        <h3 class="text-xl text-white">Bem-vindo(a) de volta!</h3>
    </div>
    <form on:submit={handleSubmit} class="w-full flex flex-col gap-4">
        <div
            class="flex items-center justify-start pl-4 border-2 border-white rounded-full"
        >
            <IconUser color="#facc15" />
            <input
                type="email"
                bind:value={email}
                placeholder="E-mail"
                class="py-3 px-4 bg-transparent font-semibold text-white outline-none rounded-full"
            />
        </div> <!--
        <div
            class="flex items-center justify-start pl-4 border-2 border-white rounded-full relative"
        >
            <IconUser color="#facc15" />
            <select 
                bind:value={userType}
                class="py-3 px-4 bg-transparent font-semibold text-white outline-none rounded-full appearance-none relative z-10"
            >
                 <option value="" disabled selected class="text-gray-400 bg-transparent">Tipo de usuário</option> 
                <option value="2" class="text-black bg-transparent">Aluno</option>
                <option value="1" class="text-black bg-transparent">Professor</option>
                <option value="0" class="text-black bg-transparent">Administrador</option>
            </select>
        </div>
        -->
        <div
            class="flex items-center justify-start pl-4 border-2 border-white rounded-full"
        >
            <IconLock color="#facc15" />
            <input
                type="password"
                bind:value={password}
                placeholder="Senha"
                class="py-3 px-4 bg-transparent font-semibold text-white outline-none rounded-full"
            />
        </div>
        <a href="/adm/home"
            type="submit"
            class="px-4 py-3 bg-yellow-400 font-karantina w-full rounded-full tracking-wider text-3xl text-center"
            >ENTRAR</a>
    </form>
</section>
