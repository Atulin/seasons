<script setup lang="ts">
const props = defineProps<{ genres: string[] }>()
</script>

<template>
<div class="genres">
  <div class="genre" v-for="genre in genres" :key="genre">
    {{genre}}
  </div>
</div>
</template>

<style scoped lang="scss">
.genres {
  display: flex;
  gap: .25rem;
}

.genre {
  background-color: var(--color-accent);
  padding: 2px 10px;
  border-radius: 50px;
  font-size: 80%;
  color: var(--color-background);
}
</style>
