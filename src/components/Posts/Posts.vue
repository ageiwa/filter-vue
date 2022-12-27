<script setup>
    import { onMounted, ref } from 'vue'
    import { sendRequest } from '../../requests/request.js'
    import Post from '../Post/Post.vue'

    const posts = ref([])

    onMounted(() => {
        sendRequest('server/posts.json').then(data => posts.value = data)
    })
</script>

<template>
    <section class="posts">
        <Post
            v-for="post in posts"
            :name="post.name"
            :desc="post.desc"
        />
    </section>
</template>

<style scoped lang="scss">
    .posts {
        border: 1px solid #4f2b9d;
        padding: 10px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }
</style>