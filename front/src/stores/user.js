import { defineStore } from 'pinia'

export const useUsuarioStore = defineStore('usuario', {
    state: () => ({
        usuario: {},
        token: null
    }),

    getters: {
        getUsuario(state){ return state.usuario },
        getToken(state){ return state.token },
    },
    
    actions:{
        addToken(token){
            this.token = token
        },
        addUsuario(datosUsuario){
            this.usuario = datosUsuario
        }
    }
  })