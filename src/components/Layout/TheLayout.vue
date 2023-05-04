<template>
    <section class="container-wrap" style="height: 100vh;">
        <the-header></the-header>
        <section class="container" style="border: 1px solid rgb(238, 238, 238)">
            <the-aside></the-aside>
            <section class="container is-vertical">
                <main class="main">
                    <router-view></router-view>
                </main>
            </section>
        </section>
    </section>
</template>
<script>
import TheAside from './TheAside.vue'
import TheHeader from './TheHeader.vue'
export default {
    components: { TheHeader, TheAside },
    name: 'TheLayout',
}
</script>