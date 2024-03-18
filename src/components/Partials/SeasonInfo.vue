<script setup lang='ts'>
import query from "@/queries/get-season-info/get-season-info.gql?raw"
import type { Variables } from '@/queries/get-season-info/variables';
import type { QueryResult } from '@/queries/get-season-info/query-result';
import type { Season } from '@/queries/common-types';
import { ref } from 'vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { trimChars } from '@/helpers/string-helpers';

dayjs.extend(utc);
dayjs.extend(advancedFormat);

const url = 'https://graphql.anilist.co';

const props = defineProps<{ season: Season, year: number}>();

const first = ref<Anime>();
const rest = ref<Anime[]>([]);

const getData = async () => {
    const variables: Variables = {
        season: props.season,
        year: props.year,
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

    const anime = data.data.Page.media
        .filter(m => m.startDate.day && m.startDate.month)
        .map(m => ({
            title: trimChars(m.title.romaji, '.'),
            title_en: m.title.english && trimChars(m.title.english, '.'),
            date: dayjs.utc(`${m.startDate.year}-${m.startDate.month}-${m.startDate.day}`)
        }));

    first.value = anime[0];
    rest.value = anime.slice(1);
};

await getData();

type Anime = {
    title: string,
    title_en?: string,
    date: dayjs.Dayjs
}
</script>

<template>
    <details class='deets'>
        <summary>
            <time v-if='first' :datetime='first.date.format()' :title='first.date.format("YYYY-MM-DD")'>
                <span>Season starts on the </span>
                <span class='bold'>{{first.date.format('Do of MMMM, YYYY')}}</span>
                <span> with </span>
                <span class='bold' :title='first.title_en'>“{{first.title}}”</span>
            </time>
        </summary>
        <ul>
            <li v-for='anime in rest' v-bind:key='anime.title'>
                <span class='bold' :title='anime.title_en'>“{{anime.title}}”</span>
                <span> on the </span>
                <span class='bold'>{{anime.date.format('Do of MMMM, YYYY')}}</span>
            </li>
        </ul>
    </details>
</template>

<style scoped lang='scss'>
span {
    &.bold {
        font-weight: bold;
    }
}

.deets {
    padding: 1rem 1rem 0;
    font-size: 110%;
    letter-spacing: .05rem;

    ul {
        li {
            margin-top: .5rem;
        }
    }

    summary {
        list-style-type: none;
        cursor: pointer;

        //noinspection CssInvalidPseudoSelector
        &::webkit-details-marker {
            display: none;
        }
    }
}
</style>
