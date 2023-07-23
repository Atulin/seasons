<script setup lang="ts">
import type { Medum } from '@/queries/get-seasonals/query-result';
import TitleDisplay from '@/components/AnimeItem/TitleDisplay.vue';
import GenreDisplay from '@/components/AnimeItem/GenreDisplay.vue';
import StudioDisplay from '@/components/AnimeItem/StudioDisplay.vue';
import DetailsDisplay from '@/components/AnimeItem/DetailsDisplay.vue';
import { computed, ref } from 'vue';

const props = defineProps<{ data: Medum }>();

const foo = `url('${props.data.coverImage.large}')`;
const adult = ref<boolean>(props.data.isAdult);
const blurred = ref<boolean>(props.data.isAdult);

const getBlur = computed(() => adult.value && blurred.value);
</script>

<template>
    <div class="anime-item" :class="{ adult: adult }">
        <div class="content">
            <div class="cover-container">
                <img
                    :src="data.coverImage.large"
                    alt=""
                    class="cover"
                    :class="{ blurred: getBlur }"
                    @click="() => (blurred = !blurred)"
                />
            </div>
            <TitleDisplay class="title" :titles="data.title" :link="data.siteUrl" />
            <GenreDisplay class="genres" :genres="data.genres" />
            <div class="description" v-html="data.description"></div>
            <StudioDisplay class="studios" :studios="data.studios" />
            <DetailsDisplay class="details" :show="data" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.content {
    position: relative;
    display: grid;
    grid:
        'cover   titles' auto
        'cover   genres' auto
        'cover   desc' 1fr
        'cover   studios' auto
        'cover   details' auto
        / auto 1fr;
    gap: 1rem;

    .details {
        grid-area: details;
    }

    .studios {
        grid-area: studios;
    }

    .cover-container {
        grid-area: cover;
        position: relative;
        overflow: hidden;
        border-radius: 1rem;
        height: min-content;

        .cover {
            border-radius: 1rem;
            position: relative;

            &.blurred {
                filter: blur(20px);
            }
        }
    }

    .genres {
        grid-area: genres;
    }

    .title {
        grid-area: titles;
    }

    .description {
        grid-area: desc;
    }
}

.anime-item {
    position: relative;
    padding: 1rem;
    border-radius: 1rem;
    background-color: var(--color-background-mute);
    box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.5);
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: v-bind(foo);
        background-size: cover;
        background-position: 50% 50%;
        filter: blur(10px);
        opacity: 25%;
    }

    &.adult {
        outline: 5px solid red;
        outline-offset: -5px;

        .cover-container {
            border: 2px solid red;
        }
    }
}
</style>
