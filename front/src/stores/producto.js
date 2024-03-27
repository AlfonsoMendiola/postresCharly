import { defineStore } from "pinia"
import axios from "axios"
import { useUsuarioStore } from "./user"
import { usePaginacionStore } from "./paginacion"

const apiUrl = import.meta.env.VITE_API_URL
const usuarioState = useUsuarioStore()
const paginacionState = usePaginacionStore()

export const useProductoStore = defineStore('producto', {
    state: () => ({
        productos: [],
        producto: {},
    }),

    getters: {
        async getRows(state){
            try {
                const response = await axios.get(`${apiUrl}productos?limite=${paginacionState.limite}&pagina=${paginacionState.pagina}`, {
                    headers: { 'Authorization': `Bearer ${usuarioState.getToken}` }
                })

                state.productos = response.data.data
                paginacionState.totalRegistros = response.data.total
                paginacionState.totalPaginas = response.data.pages
                
                return state.productos
            } catch (error) {
                console.log(error)
                return error
            }
            
        },
        // async getProducto(state){
        //     try {
        //         return (id) => {}
        //         const response = await axios.get(`${apiUrl}productos?limite=${this.paginacionData.limite}&pagina=${this.paginacionData.pagina}`, {
        //             headers: { 'Authorization': `Bearer ${usuarioState.getToken}` }
        //         })
                
        //         this.productos = response.data.data
        //         //return state.productos
                
        //     } catch (error) {
        //         console.log(error)
        //         return error
        //     }
            
        // },
        
    },
    
    actions:{
        
        addToken(token){
            this.token = token
        },
        addUsuario(datosUsuario){
            this.usuario = datosUsuario
        },

        // hacer funcion para añadir mas productos y setear la informacion del producto nuevo en el array de productos
        // para un menos coste computacional 
        postRow: async(data) => {
            try {
                
            } catch (error) {
                console.log(error)
                return error
            }
        },
        // adaptar todo el delete row
        deleteRow: async(id) => {
            try {
              console.log(id);
              const response = await axios.delete(`${apiUrl}${props.endpoint}/${id}`, {
                headers: { 'Authorization': `Bearer ${usuarioState.getToken}` }
              })
              rowsRef.value = rowsRef.value.filter(producto => producto._id != response.data._id)
            } catch (error) {
              console.log(error)
              return error
            }
          }


    }
})