<script setup lang="ts">
import { computed } from 'vue';
import type { MediaFormat } from '@/queries/common-types';

const props = defineProps<{ type: MediaFormat; offset: boolean }>();

const color = computed(
    () =>
        ({
            MANGA: '#ef9966',
            MOVIE: '#ec2020',
            MUSIC: '#8dcf4b',
            NOVEL: '#af9b51',
            ONA: '#0cb5aa',
            ONE_SHOT: '#04aa56',
            OVA: '#1689ea',
            SPECIAL: '#aa0fdf',
            TV: '#1d2df8',
            TV_SHORT: '#5353cf'
        }[props.type] ?? '#000000')
);
</script>

<template>
    <div class="ribbon"
         :class="{ offset: offset }"
         :style="{ 'background-color': color }"
    >
        {{ type.replace('_', ' ') }}
    </div>
</template>

<style scoped lang="scss">
.ribbon {
    font-size: 80%;
    position: absolute;
    bottom: 0;
    right: 20px;
    padding: 0.5rem 0.25rem;
    box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);

    &.offset {
        bottom: 5px;
    }
}
</style>
