import { defineStore } from "pinia"
import { ref } from "vue";

export const useGrammarsStore = defineStore("grammars", () => {
    const tenses = ref([]);
    return {
        tenses
    }
});

