<script setup>
import { ref, onMounted } from 'vue';
import { usePaginacionStore } from '@/stores/paginacion'

const paginacionState = usePaginacionStore()

const props = defineProps(['campos', 'registros'])

let rowsRef = ref([])
let itemRows = ref([])

onMounted(async() => {
  rowsRef.value = await props.registros()
})

const modPaginacion = async() => {
  rowsRef.value = await props.registros()
}

</script>

<template>

<div class="input-group">
  Por Pagina:
  <input type="number" id="limite" min="1" class="form-control me-3" @blur="modPaginacion" v-model="paginacionState.limite">
  Pagina:
  <input type="number" id="pagina" min="1" :max="paginacionState.totalPaginas" class="form-control" @blur="modPaginacion" v-model="paginacionState.pagina">
  <span class="input-group-text">de {{ paginacionState.totalPaginas }} paginas totales</span>
</div>


<table class="table table-hover">
  <thead>
    <tr> <th v-for="campo in props.campos"> {{ campo }}</th> </tr>
  </thead>
  
  <tbody>
    <tr v-for="producto in rowsRef" :key="producto._id" :ref="itemRows">
      <td v-for="campo in props.campos">
        <template v-if="campo == 'image'"> <img :src="producto[campo]" /> </template>
        <template v-else>{{ producto[campo] }}</template>
      </td>
      <td> <button class="btn btn-danger" @click="productoState.deleRow(producto._id)">Borrar</button> </td>
    </tr>
  </tbody>
</table>

<template v-if="rowsRef.length == 0">Sin datos</template>

</template>
