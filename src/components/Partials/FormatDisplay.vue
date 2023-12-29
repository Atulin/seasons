<script setup lang='ts'>
import type { MediaFormat } from '@/queries/common-types';

defineProps<{format: MediaFormat}>();
</script>

<template>
    <div class='format' :class='format'>{{format}}</div>
</template>

<style scoped lang='scss'>
.format {
    padding: 3px;
    border-radius: 3px;
    font-size: 70%;
    font-weight: 600;
}

.MANGA {
    background-color: beige;
    color: black;
}
.MOVIE {
    background-color: red;
    color: black;
}
.MUSIC {
    background-color: yellow;
    color: black;
}
.NOVEL {
    background-color: orange;
    color: black;
}
.ONA {
    background-color: greenyellow;
    color: black;
}
.ONE_SHOT {
    background-color: green;
}
.OVA {
    background-color: rebeccapurple;
}
.SPECIAL {
    background-color: darkblue;;
}
.TV {
    background-color: blue;
}
.TV_SHORT {
    background-color: cornflowerblue;
    color: black;
}
</style>
