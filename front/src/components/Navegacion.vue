<script setup>
import { RouterLink } from 'vue-router'
import router from '@/router';
import { useUsuarioStore } from '@/stores/user';

const usuarioState = useUsuarioStore()

const cerrarSesion = () => {
  usuarioState.addToken('')
  usuarioState.addUsuario({})
  router.push('/')
}

</script>

<template>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand">Postres Charly</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">

        <li class="nav-item" v-if="usuarioState.getUsuario.vistas.includes('menu')"> <RouterLink to="/menu" class="nav-link">Menú</RouterLink> </li>
        <li class="nav-item" v-if="usuarioState.getUsuario.vistas.includes('ventas')"> <RouterLink to="/ventas" class="nav-link">Ventas</RouterLink> </li>
        <li class="nav-item" v-if="usuarioState.getUsuario.vistas.includes('productos')"> <RouterLink to="/productos" class="nav-link">Productos</RouterLink> </li>
        <li class="nav-item" v-if="usuarioState.getUsuario.vistas.includes('usuarios')"> <RouterLink to="/usuarios" class="nav-link">Usuarios</RouterLink> </li>
        <li class="nav-item"> <a class="nav-link" @click="cerrarSesion">Salir</a> </li>
        
      </ul>
    </div>
  </div>
</nav>

</template>
