<script setup lang="ts">
import type { Medum } from "@/queries/types/query-result";
import TitleDisplay from "@/components/AnimeItem/TitleDisplay.vue";
import GenreDisplay from "@/components/AnimeItem/GenreDisplay.vue";
import StudioDisplay from "@/components/AnimeItem/StudioDisplay.vue";
import DetailsDisplay from "@/components/AnimeItem/DetailsDisplay.vue";

const props = defineProps<{data: Medum}>()

const foo = `url('${props.data.coverImage.large}')`;

</script>

<template>
  <div class="anime-item" >
    <div class="content">
      <img :src="data.coverImage.large" alt="" class="cover">
      <TitleDisplay class="title" :titles="data.title" />
      <GenreDisplay class="genres" :genres="data.genres" />
      <div class="description" v-html="data.description"></div>
      <StudioDisplay class="studios" :studios="data.studios"/>
      <DetailsDisplay class="details" :show="data" />
    </div>
  </div>
</template>

<style scoped lang="scss">

.content {
  position: relative;
  display: grid;
  grid: 'cover   titles'  auto
        'cover   genres'  auto
        'cover   desc'    1fr
        'cover   studios' auto
        'cover   details' auto
       / auto    1fr;
  gap: 1rem;

  .details {
    grid-area: details;
  }

  .studios {
    grid-area: studios;
  }

  .cover {
    grid-area: cover;
    border-radius: 1rem;
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
}
</style>
