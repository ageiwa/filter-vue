<script setup>
    import { onMounted, ref } from 'vue'
    import SearchPanel from './components/SearchPanel/index.vue'
    import Post from './components/Post/index.vue'
    import Tag from './components/Tag/index.vue'

    const posts = ref([])
    const tags = ref([])

    function sendRequest(url) {
        return fetch(url).then(response => response.json())
    }

    onMounted(() => {
        sendRequest('server/posts.json').then(data => posts.value = data)
        sendRequest('server/tags.json').then(data => tags.value = data)
    })

    function toggleTag(value) {
        const selectedPosts = []

        tags.value.map((item) => {
            if (item.id === value.id) item.active = value.active
        })

        sendRequest('server/posts.json').then(data => {
            tags.value.forEach((itemI) => {
                if (itemI.active) {
                    const filterPosts = data.filter((itemJ) => itemI.id === itemJ.tag)
                    
                    selectedPosts.push(...filterPosts)
                    posts.value = selectedPosts
                }
            })
        })
    }

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
    <div class="tags">
        <div class="container">
            <Tag
                v-for="tag in tags"
                :id="tag.id"
                :name="tag.name"
                :active="tag.active"
                @toggle="toggleTag"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .posts {
        border: 1px solid #4f2b9d;
        padding: 10px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }

    .tags {
        border: 1px solid #9d2b2b;
        flex-wrap: wrap;

        .container {
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>
