<script setup lang='ts'>
import query from '../queries/get-characters/get-characters.gql?raw'
import { useRoute } from 'vue-router';
import { Variables } from '@/queries/get-characters/variables';
import { QueryResult } from '@/queries/get-characters/query-result';
import { onMounted, ref } from 'vue';
import type { Character } from '@/queries/get-characters/query-result';

const url = 'https://graphql.anilist.co';

const route = useRoute();
const id = parseInt(route.params.id as string);

const characters = ref<Character[]>([]);
const list = ref<HTMLElement>(null);

const getData = async (id: number) => {
    const variables: Variables = {
        showId: id
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

    if (res.status !== 200) return;

    characters.value = data.data.Media.characters.nodes;
}

onMounted(async () => {
    await getData(id);
    list.value.scrollIntoView({ behavior: 'smooth' });
})
</script>

<template>
    <div id='characters' ref='list'>
        <a :href='char.siteUrl' rel='noreferrer noopener' target='_blank' class='character' v-for='char in characters' :key='char.id'>
            <img :src='char.image.medium' :alt='char.name.full'>
            <div class='name'>
                <span class='first'>{{char.name.first}}</span>
                <span class='middle' v-if='char.name.middle'>{{char.name.middle}}</span>
                <span class='last'>{{char.name.last}}</span>
            </div>
        </a>
    </div>
</template>

<style scoped lang='scss'>
#characters {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: .25rem;
    padding-top: .25rem;

    .character {
        height: 150px;
        width: 120px;
        position: relative;
        color: var(--color-text);

        &:hover {
            .name {
                opacity: 0%;
            }
        }

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }

        .name {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: .1rem .25rem;
            background-color: rgba(0, 0, 0, .5);
            backdrop-filter: blur(4px);
            font-weight: 400;
            letter-spacing: .05rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: .25rem;
            line-height: 1rem;
            text-align: center;
            opacity: 100%;
            transition: opacity 150ms ease-in-out;
            text-shadow: 0 0 5px black, 0 0 2px black;
        }
    }
}
</style>
