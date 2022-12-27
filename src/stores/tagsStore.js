import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useTagsStore = defineStore('tags', () => {
    const state = reactive({
        tags: []
    })

    function change(value) {
        state.tags = value
    }

    return { state, change }
})