import { defineStore } from "pinia"

export const usePaginacionStore = defineStore('paginacion', {
    state: () => ({
        limite: 50,
        pagina: 1,
        totalRegistros: 0,
        totalPaginas: 0
    })
})