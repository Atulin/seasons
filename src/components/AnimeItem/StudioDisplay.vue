<script setup lang="ts">
import type { Node, Studios } from '@/queries/get-seasonals/query-result';
import { computed } from 'vue';

const props = defineProps<{ studios: Studios }>();
const nodes = computed(() => [...props.studios.nodes].sort(sorter));

const sorter = (a: Node, b: Node) => {
    if (a.isAnimationStudio && !b.isAnimationStudio) return -1;
    if (b.isAnimationStudio && !a.isAnimationStudio) return 1;
    return a.name.localeCompare(b.name);
}
</script>

<template>
    <div class="studios">
        <a
            class="studio"
            :class="{ animation: studio.isAnimationStudio }"
            v-for="studio in nodes"
            :key="studio.name"
            :href="studio.siteUrl"
            target="_blank"
        >
            {{ studio.name }}
        </a>
    </div>
</template>

<style scoped lang="scss">
.studios {
    display: flex;
    gap: 0.25rem;
    flex-flow: wrap;
}

.studio {
    color: var(--color-accent);
    backdrop-filter: blur(10px) brightness(50%);
    padding: 2px 10px;
    border-radius: 50px;

    &.animation {
        outline: 2px solid var(--color-border);
        filter: brightness(150%);
    }

    &:hover {
        color: white;
        text-decoration: underline;
    }
}
</style>
