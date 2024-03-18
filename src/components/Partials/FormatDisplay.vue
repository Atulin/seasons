<script setup lang='ts'>
import type { MediaFormat } from '@/queries/common-types';

defineProps<{format: MediaFormat|undefined}>();
</script>

<template>
    <div class='format' :class='format ?? "NONE"'>{{format?.replace('_', ' ') ?? '???'}}</div>
</template>

<style scoped lang='scss'>
.format {
    padding: 3px .5rem;
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
.NONE {
    background-color: #717171;
}
</style>
