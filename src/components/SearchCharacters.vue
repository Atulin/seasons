<script setup lang="ts">
import query from '../queries/search-shows/search-shows.gql?raw';
import { ref } from 'vue';
import type { Medum, QueryResult } from '@/queries/search-shows/query-result';
import debounce from '@/helpers/debounce';
import type { Variables } from '@/queries/search-shows/variables';
import CharactersDisplay from '@/components/CharactersDisplay.vue';

const url = 'https://graphql.anilist.co';

const media = ref<Medum[]>([]);
const search = ref<string>('');
const showId = ref<number | null>(null);

const getData = debounce(async () => {
    const variables: Variables = {
        search: search.value
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

    const res = await fetch(url, options);
    const data: QueryResult = await res.json();

    media.value = data?.data?.Page?.media ?? [];
}, 800);

const changeSearch = (e: Event) => {
    console.log('search');
    search.value = (e.currentTarget as HTMLInputElement).value;
    getData();
};
</script>

<template>
    <CharactersDisplay v-if="showId" :char-id="showId" />
    <div id="searchbar">
        <input
            type="search"
            name="search"
            placeholder="Show title"
            @input="(e) => changeSearch(e)"
        />
    </div>
    <ul id="shows">
        <li v-for="show in media" :key="show.id">
            <router-link class="link" :to="`characters/${show.id}/${show.title.romaji}`">{{
                show.title.romaji
            }}</router-link>
        </li>
    </ul>
</template>

<style scoped lang="scss">
#searchbar {
    padding: 1rem 1rem 0;

    input {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 1.2rem;
        background-color: var(--color-background-mute);
        color: var(--color-text);
        border: 2px solid var(--vt-c-text-light-2);

        &:focus {
            border-color: var(--color-text);
        }
    }
}

#shows {
    display: flex;
    flex-direction: column;
    width: min-content;
    padding: 0 1rem 1rem;

    li {
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100%;
        white-space: nowrap;

        .link {
            display: block;
            width: 100%;
            cursor: pointer;
            padding: 0.5rem 1rem;
            background-color: var(--color-background-mute);
            color: var(--color-text);
            border: 1px solid var(--vt-c-text-light-2);
            font-size: 1.05rem;
            letter-spacing: 0.1rem;
            text-align: left;

            &:hover {
                background-color: var(--color-background-soft);
                color: var(--color-accent);
                transform: translateX(1rem);
            }
        }
    }
}
</style>
