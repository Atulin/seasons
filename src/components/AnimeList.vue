<script setup lang="ts">
import query from '@/queries/get-seasonals.gql?raw';
import type { Season, Variables } from '@/queries/types/variables';
import type { Medum, QueryResult } from '@/queries/types/query-result';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import AnimeItem from '@/components/AnimeItem.vue';
import { monthToSeason } from '@/queries/helpers';

const url = 'https://graphql.anilist.co';

const now = new Date();

const media = ref<Medum[]>([]);
const year = ref<number>(now.getFullYear());
const season = ref<Season>(monthToSeason(now.getMonth() + 1));
const page = ref<number>(1);

const loading = ref(false);
watch([year, season], async () => {
    loading.value = true;
    media.value = [];
    page.value = 1;
    await getData();
    loading.value = false;
});

const container = ref<HTMLElement | null>(null);
let loadingMore = false;
const tolerance = 1000;

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

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

    const newMedia = data?.data?.Page?.media ?? [];
    media.value = [...media.value, ...newMedia];
};

await getData();
</script>

<template>
    <div class="selectors">
        <div class="year-selector">
            <button class="prev" @click="() => year--">&lt;</button>
            <h2 class="year">{{ year }}</h2>
            <button class="next" @click="() => year++">&gt;</button>
        </div>

        <div class="season-selector">
            <label class="spring">
                <input name="season" type="radio" value="SPRING" v-model="season" />
                <span>Spring</span>
            </label>

            <label class="summer">
                <input name="season" type="radio" value="SUMMER" v-model="season" />
                <span>Summer</span>
            </label>

            <label class="fall">
                <input name="season" type="radio" value="FALL" v-model="season" />
                <span>Fall</span>
            </label>

            <label class="winter">
                <input name="season" type="radio" value="WINTER" v-model="season" />
                <span>Winter</span>
            </label>
        </div>
    </div>

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

.selectors {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.year-selector {
    display: flex;

    h2.year {
        color: var(--color-accent);
        font-weight: 700;
        letter-spacing: 0.5rem;
        font-size: 300%;
        text-align: center;
        background-color: var(--color-background-mute);
        padding: 0 1rem;
    }

    button {
        cursor: pointer;
        background-color: var(--color-accent);
        color: var(--color-background);
        font-size: 300%;
        font-weight: 700;
        border: none;
        padding: 0.5rem;

        &.prev {
            border-radius: 500px 0 0 500px;
        }

        &.next {
            border-radius: 0 500px 500px 0;
        }
    }
}

.list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.season-selector {
    display: flex;
    gap: 1rem;

    label {
        cursor: pointer;
        display: block;

        span {
            display: block;
            padding: 1rem;
            border-radius: 500px;
            transition: all 100ms ease-in-out;
            min-width: 10rem;
            text-align: center;
            font-size: 200%;
            background-color: var(--color-background-mute);
        }

        input[name='season']:checked + span {
            background-color: var(--color-accent);
            color: var(--color-background);
        }

        input[name='season'] {
            display: none;
        }
    }
}
</style>
