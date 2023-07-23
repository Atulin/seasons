<script setup lang="ts">
import type { Studios } from "@/queries/get-seasonals/query-result";
import { computed } from "vue";

const props = defineProps<{ studios: Studios }>();
const nodes = computed(() => props.studios.nodes);
</script>

<template>
  <div class="studios">
    <a class="studio" v-for="studio in nodes" :key="studio.name" :href="studio.siteUrl" target="_blank">
      {{studio.name}}
    </a>
  </div>
</template>

<style scoped lang="scss">
.studios {
  display: flex;
  gap: .25rem;
  flex-flow: wrap;
}

.studio {
  color: var(--color-accent);
  backdrop-filter: blur(10px) brightness(50%);
  padding: 2px 10px;
  border-radius: 50px;

  &:hover {
    color: white;
    text-decoration: underline;
  }
}
</style>
