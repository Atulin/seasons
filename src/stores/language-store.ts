import { defineStore } from 'pinia';

export const useLanguage = defineStore('language', {
    state: () => ({ english: false }),
    actions: {
        toggle() {
            this.english = !this.english
        }
    }
});
