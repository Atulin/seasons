<script setup lang="ts">
import AnimeList from "@/components/AnimeList.vue";
</script>

<template>
  <header>
    <div class="wrapper">
    </div>
  </header>

  <main>
    <Suspense>
      <AnimeList />
    </Suspense>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
