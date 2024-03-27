<script setup>
import { useProductoStore } from '@/stores/producto'
import { usePaginacionStore } from '@/stores/paginacion'
import FormProductos from '@/components/FormProductos.vue'
import TablaDinamica from '@/components/TablaDinamica.vue'

const productoState = useProductoStore()
const columnas = ['image', 'nombre', 'descripcion', 'existencia', 'categoria', 'costoUnitario', 'precioUnitario', 'utilidad']

const rows = async() => { return await productoState.getRows }

</script>

<template>

<h2>Productos</h2>


<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> Registrar producto </button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <FormProductos></FormProductos>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        
      </div>
    </div>
  </div>
</div>

<TablaDinamica :campos="columnas" :registros="rows" />


</template>