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

const anime = computed(() => {
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
        format: p.format
    };
});
</script>

<template>
    <div class="schedule-item">
        <div class="title" >
            <FormatDisplay :format="anime.format" />
            <span class="english" v-if="(anime.english?.length ?? 0) > 0 && english">{{ anime.english }}</span>
            <span class="romaji" v-else>{{ anime.romaji }}</span>
        </div>
        <span class="airing" v-if="anime.nextEpisode">
            Episode {{ anime.nextEpisode?.episode }} airs in {{ anime.nextEpisodeHuman }}
        </span>
        <span class="starts" v-else>Starts {{ anime.startFormatted }} ({{ anime.startHuman }})</span>
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
    }
}
</style>
