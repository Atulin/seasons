<script setup lang="ts">
import type { Title } from '@/queries/types/query-result';

const props = defineProps<{ titles: Title; link: string }>();
</script>

<template>
    <div class="title">
        <div class="romaji">
            <a class="link" :href="link" rel="noreferrer noopener" target="_blank">
                {{titles.romaji }}
            </a>
        </div>
        <div class="english">{{ titles.english }}</div>
        <div class="native">{{ titles.native }}</div>
    </div>
</template>

<style scoped>
.title {
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
}

.romaji {
    font-weight: 700;
    color: var(--vt-c-white);
}

.link {
    color: var(--vt-c-white);
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}

.english,
.native {
    font-size: 70%;
    font-weight: 100;
    opacity: 75%;
}
</style>
