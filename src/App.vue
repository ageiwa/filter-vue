<script setup>
    import { ref } from 'vue'
    import SearchPanel from './components/SearchPanel/index.vue'
    import Post from './components/Post/index.vue'

    const posts = ref([])

    const request = fetch('server/posts.json').then(response => {
        return response.json()
    })

    request.then(data => posts.value = data)
</script>

<template>
    <div class="content">
        <SearchPanel />
        <section class="posts">
            <Post
                v-for="post in posts"
                :name="post.name"
                :desc="post.desc"
            />
        </section>
    </div>
    <div class="tags"></div>
</template>

<style scoped>
    .posts {
        border: 1px solid #4f2b9d;
        padding: 10px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }

    .tags {
        border: 1px solid #9d2b2b;
    }
</style>
