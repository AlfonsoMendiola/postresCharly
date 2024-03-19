<script setup>

import { ref } from 'vue'
import router from '@/router';
import { useUsuarioStore } from '@/stores/user';
import axios from 'axios'

const usuarioState = useUsuarioStore()

const apiUrl = import.meta.env.VITE_API_URL
const userInfo = ref({})
const msg = ref('')

const login = async() =>{
    try {
        const response = await axios.post(`${apiUrl}auth/login`, userInfo.value)
        usuarioState.addToken(response.data.token)
        usuarioState.addUsuario(response.data.usuario)
        
        router.push('/menu')
    } catch (error) {
        console.log(error)
        msg.value = error.response.data.error
    }
}


</script>


<template>

<h1>login</h1>

<form @submit.prevent="login">
    <div class="mb-3">
        <label for="email" class="form-label">Correo</label>
        <input type="email" class="form-control" id="email" placeholder="name@postrescharly.com" v-model.trim="userInfo.email">
    </div>

    <div class="mb-3">
        <label for="pass" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="pass" placeholder="Escribe aqui" v-model.trim="userInfo.pass">
    </div>

    <button type="submit" class="btn btn-primary">Enviar</button>
</form>

<p> {{ msg }} </p>

</template>