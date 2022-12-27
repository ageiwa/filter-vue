import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useTagsStore = defineStore('tags', () => {
    const state = reactive({
        tags: [{id: 0, name: 'Все', active: true}]
    })

    function change(value) {
        state.tags = value
    }

    return { state, change }
})