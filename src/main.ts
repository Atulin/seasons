import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import AnimeList from '@/components/AnimeList.vue';
import CharacterList from '@/components/SearchCharacters.vue';
import CharactersDisplay from '@/components/CharactersDisplay.vue';

const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: AnimeList },
        { path: '/characters/:id', component: CharactersDisplay },
        { path: '/search', component: CharacterList }
    ]
});

app.use(createPinia());
app.use(router);

app.mount('#app');
