<script setup lang="ts">
import dayjs from 'dayjs';
import type { Medum } from '@/queries/get-schedule/query-result';
import { computed, ref } from 'vue';
import FormatDisplay from '@/components/Partials/FormatDisplay.vue';
import { useLanguage } from '@/stores/language-store';

const props = defineProps<{anime: Medum}>();

const language = useLanguage();
const english = ref(language.english);

language.$subscribe((_, state) => {
    english.value = state.english;
})

const computedAnime = computed(() => {
    const p = props.anime;
    const start = dayjs()
        .year(p.startDate.year)
        .month(p.startDate.month ?? 0)
        .day(p.startDate.day ?? 0);
    return {
        romaji: p.title.romaji,
        english: p.title.english?.trim(),
        nextEpisode: p.nextAiringEpisode,
        nextEpisodeHuman: dayjs().add(p.nextAiringEpisode?.timeUntilAiring ?? 0, 'seconds').fromNow(),
        start: p.startDate,
        startFormatted: start.format('DD MMMM YYYY'),
        startHuman: start.fromNow(),
    };
});
</script>

<template>
    <div class="schedule-item">
        <div class="title" >
            <a target='_blank' :href='anime.siteUrl'>
                <span class="english" v-if="(computedAnime.english?.length ?? 0) > 0 && english">{{ computedAnime.english}}</span>
                <span class="romaji" v-else>{{ computedAnime.romaji }}</span>
            </a>
            <FormatDisplay :format="anime.format" />
        </div>
        <span class="airing" v-if="anime.nextAiringEpisode">
            Episode {{ computedAnime.nextEpisode?.episode }} airs in {{ computedAnime.nextEpisodeHuman }}
        </span>
        <span class="starts" v-else>Starts {{ computedAnime.startFormatted }} ({{ computedAnime.startHuman }})</span>
    </div>
</template>

<style scoped lang="scss">
.schedule-item {
    display: flex;
    flex-direction: column;
    gap: .2rem;
    border: 1px solid gray;
    padding: .5rem;

    .title {
        display: flex;
        gap: .5rem;
        flex-wrap: wrap;
        font-size: 110%;
        font-weight: bold;

        a {
            color: var(--color-text);

            &:hover {
                opacity: 90%;
                text-decoration: underline;
            }
        }
    }
}
</style>
