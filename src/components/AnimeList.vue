<script setup lang="ts">
import query from '@/queries/get-seasonals/get-seasonals.gql?raw';
import type { Variables } from '@/queries/get-seasonals/variables';
import type { Medum, QueryResult } from '@/queries/get-seasonals/query-result';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import AnimeItem from '@/components/AnimeItem.vue';
import { monthToSeason } from '@/queries/helpers';
import SeasonSelector from '@/components/Partials/SeasonSelector.vue';
import type { Season } from '@/queries/common-types';
import SeasonInfo from '@/components/Partials/SeasonInfo.vue';

const url = 'https://graphql.anilist.co';

const now = new Date();

const media = ref<Medum[]>([]);
const year = ref<number>(now.getFullYear());
const season = ref<Season>(monthToSeason(now.getMonth() + 1));
const page = ref<number>(1);

const loading = ref(false);

const container = ref<HTMLElement | null>(null);
let loadingMore = false;
const tolerance = 1000;

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

const seasonChanged = async (args: {year: number, season: Season}) => {
    loading.value = true;
    year.value = args.year;
    season.value = args.season;
    media.value = [];
    page.value = 1;
    await getData();
    loading.value = false;
}

const handleScroll = async () => {
    const cont = container.value;
    if (cont === null) return;
    if (loadingMore) return;

    const bottom = cont.getBoundingClientRect().bottom;
    const height = window.innerHeight;

    if (bottom - height < tolerance) {
        loadingMore = true;
        page.value++;
        await getData();
        loadingMore = false;
    }
};

const getData = async () => {
    const variables: Variables = {
        season: season.value,
        year: year.value,
        page: page.value,
        perPage: 15
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

    if (data.data.Page.pageInfo.hasNextPage === false) {
        window.removeEventListener('scroll', handleScroll)
    }

    const newMedia = data?.data?.Page?.media ?? [];
    media.value = [...media.value, ...newMedia];
};

await getData();
</script>

<template>

    <SeasonSelector v-on:changed='seasonChanged'></SeasonSelector>

    <SeasonInfo :year='year' :season='season'/>

    <div class="list" v-if="media.length > 0" ref="container">
        <template v-for="anime in media" :key="anime.id">
            <AnimeItem :data="anime" />
        </template>
    </div>
    <div class="loading" v-else-if="loading">
        <h3>Loading...</h3>
    </div>
    <div class="empty" v-else>
        <h3>No anime listed for {{ season }} of {{ year }}</h3>
    </div>
</template>

<style scoped lang="scss">
.loading, .empty {
    padding: 1rem;
    text-align: center;
    font-size: 200%;
}

.list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
