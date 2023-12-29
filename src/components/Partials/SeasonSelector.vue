<script setup lang="ts">
import { ref, watch } from 'vue';
import { monthToSeason } from '@/queries/helpers';
import type { Season } from '@/queries/common-types';

const now = new Date();

const emit = defineEmits(['changed']);

const year = ref<number>(now.getFullYear());
const season = ref<Season>(monthToSeason(now.getMonth() + 1));

watch([year, season], async () => {
    emit('changed', { year: year.value, season: season.value });
});
</script>

<template>
    <div class="selectors">
        <div class="year-selector">
            <button class="prev" @click="() => year--">&#129172;</button>
            <h2 class="year">{{ year }}</h2>
            <button class="next" @click="() => year++">&#129174;</button>
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
</template>

<style scoped lang="scss">
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
