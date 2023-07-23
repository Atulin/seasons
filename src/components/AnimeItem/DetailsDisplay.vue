<script setup lang="ts">
import type { Medum } from "@/queries/get-seasonals/query-result";
import { computed } from "vue";
import { startDateFormat } from "@/queries/helpers";

const props = defineProps<{ show: Medum }>();

const start = computed(() => {
  return startDateFormat(props.show.startDate);
})
</script>

<template>
  <span>
    Starts airing <strong>{{start}}</strong>, consists of <strong>{{show.episodes ?? '??'}}</strong> episodes, <strong>{{show.duration ?? '??'}}</strong> minutes each.
  </span>
</template>

<style scoped lang="scss">
strong {
  font-weight: 700;
}
</style>
