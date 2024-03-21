<script setup>

import { ref, watch } from 'vue'
import { useUsuarioStore } from '@/stores/user'
import axios from 'axios'

const usuarioState = useUsuarioStore()

const apiUrl = import.meta.env.VITE_API_URL
const productoInfo = ref({})
let productoImage = ref([])
let msg = ref('')

const handleFileUpload = (e) => {
    productoImage = e.target.files[0]
}

const productoPost = async() =>{
    const formData = new FormData();
    // asignacion dinamica de claves y valores del formData
    Object.keys(productoInfo.value).forEach(key => {
        formData.append(key, productoInfo.value[key])
    })
    formData.append("image", productoImage);
    try {
        
        const response = await axios.post(`${apiUrl}productos`, formData, {
            headers: {
                'Authorization': `Bearer ${usuarioState.getToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })

        if (response.status == 200) msg.value = "Guardado correctamente";
    } catch (error) {
        console.log(error)
        msg.value = error.response.data.error
    }
}

watch(msg, () => {
    setTimeout(()=>{
        msg.value = ''
    }, 5000)
})

</script>

<template>

<form @submit.prevent="productoPost">
    <div class="mb-3">
        <label for="nombre" class="form-label">Nombre:</label>
        <input type="text" class="form-control" id="nombre" v-model.trim="productoInfo.nombre">
    </div>

    <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción:</label>
        <input type="text" class="form-control" id="descripcion" v-model.trim="productoInfo.descripcion">
    </div>

    <div class="mb-3">
        <label for="existencia" class="form-label">Existencia:</label>
        <input type="text" class="form-control" id="existencia" v-model.trim="productoInfo.existencia">
    </div>

    <div class="mb-3">
        <label for="costoUnitario" class="form-label">Costo Unitario:</label>
        <input type="text" class="form-control" id="costoUnitario" v-model.trim="productoInfo.costoUnitario">
    </div>

    <div class="mb-3">
        <label for="precioUnitario" class="form-label">Precio Unitario:</label>
        <input type="text" class="form-control" id="precioUnitario" v-model.trim="productoInfo.precioUnitario">
    </div>

    <div class="mb-3">
        <label for="categoria" class="form-label">Categoria</label>
        <select class="form-select" name="categoria" id="categoria" v-model="productoInfo.categoria">
            <option value="Alimentos">Alimentos</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Reposteria">Reposteria</option>
            <option value="OTROS">Otros</option>
        </select>
    </div>
    
    <div class="mb-3">
        <label for="image" class="form-label">imagen</label>
        <input class="form-control" type="file" id="image" @change="handleFileUpload">
    </div>
    
    <button type="submit" class="btn btn-primary">Enviar</button>
</form>
<p> {{ msg }} </p>

</template>