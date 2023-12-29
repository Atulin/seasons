<script setup lang="ts">
import query from '@/queries/get-schedule/get-schedule.gql?raw'
import type { Variables } from '@/queries/get-schedule/variables';
import { ref } from 'vue';
import { monthToSeason } from '@/queries/helpers';
import type { Medum, QueryResult, StartDate } from '@/queries/get-schedule/query-result';
import SeasonSelector from '@/components/Partials/SeasonSelector.vue';
import type { Season } from '@/queries/common-types';
import FormatDisplay from '@/components/Partials/FormatDisplay.vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ScheduleItem from '@/components/ScheduleItem.vue';
import { useLanguage } from '@/stores/language-store';

const url = 'https://graphql.anilist.co';

const now = new Date();
dayjs.extend(relativeTime);

const language = useLanguage();

const media = ref<Medum[]>([]);
const year = ref<number>(now.getFullYear());
const season = ref<Season>(monthToSeason(now.getMonth() + 1));
const page = ref<number>(1);

const loading = ref(false);
const seasonChanged = async (args: {year: number, season: Season}) => {
    loading.value = true;
    year.value = args.year;
    season.value = args.season;
    media.value = [];
    page.value = 1;
    await getData();
    loading.value = false;
}

const getData = async () => {
    const variables: Variables = {
        page: page.value,
        perPage: 50,
        year: year.value,
        season: season.value
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
    }

    const res = await fetch(url, options);
    const data: QueryResult = await res.json();

    const newMedia = data?.data?.Page?.media ?? [];

    media.value = [...media.value, ...newMedia];
}

const toggleLanguage = () => {
    console.log(`Language ${language.english}`)
    language.toggle();
}

await getData();
</script>

<template>
    <SeasonSelector ref='items' v-on:changed='seasonChanged'></SeasonSelector>

    <h2>Schedule for {{season}} {{year}}</h2>

    <div class='list' v-if='media.length > 0'>
        <ScheduleItem  v-for='anime in media' :key='anime.id' :anime='anime' />
    </div>
    <div class="loading" v-else-if="loading">
        <h3>Loading...</h3>
    </div>
    <div class="empty" v-else>
        <h3>No anime listed for {{ season }} of {{ year }}</h3>
    </div>

    <button class='lang' v-on:click='toggleLanguage'>
        {{ language.english ? '🇬🇧' : '🇯🇵' }}
    </button>
</template>

<style lang="scss">
.lang {
    position: fixed;
    bottom: 0;
    right: 1rem;
    padding: 1rem;
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
    background-color: var(--color-background-mute);
    border: 1px solid var(--color-text);
    border-bottom: none;
    cursor: pointer;
    font-size: 200%;
}

.list {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    padding: 1rem;
}

.loading, .empty {
    padding: 1rem;
    text-align: center;
    font-size: 200%;
}
</style>
