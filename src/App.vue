<script setup lang="ts"></script>

<template>
    <header>
        <nav class="nav">
            <router-link class="nav-item" to="/">Seasons</router-link>
            <router-link class="nav-item" to="/search">Search</router-link>
        </nav>
    </header>

    <main>
        <Suspense>
            <router-view></router-view>
        </Suspense>
    </main>
</template>

<style scoped lang="scss">
nav.nav {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    padding: 0;
    position: absolute;
    top: 0;

    .nav-item {
        color: white;
        background-color: var(--color-background-mute);
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        padding: 0.5rem 1rem;
        box-shadow: 0 0 1rem 0 black;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-top: none;

        &:hover {
            background-color: var(--color-background-soft);
            color: var(--color-accent);
        }
    }
}

main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 4rem;
}
</style>
