import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTagsStore = defineStore('search', () => {
    const search = ref()

    function change(value) {
        search.value = value
    }

    return { search, change }
})