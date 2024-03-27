<script setup>
import { RouterView } from 'vue-router'
import { useUsuarioStore } from './stores/user'
import Navegacion from './components/Navegacion.vue'

const usuarioState = useUsuarioStore()

</script>

<template>
  <header>
    <Navegacion v-if="usuarioState.getToken" ></Navegacion>
  </header>
  
  <RouterView />

</template>

