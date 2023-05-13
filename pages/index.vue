<template>
  <div>
    <h1>Blog Post List</h1>
    <div v-if="loading">Loading</div>
    <BlogPostList v-if="posts" :posts="posts" />
  </div>
</template>

<script>
import BlogPostList from "~/components/BlogPostList.vue";

export default {
  components: {
    BlogPostList,
  },
  data() {
    return {
      posts: [],
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;
    try {
      const response = await this.$axios.get("/posts");
      if (response) {
        this.posts = response.data;
        this.loading = false;
      }
    } catch (error) {
      this.loading = false;
      console.error(error);
    }
  },
};
</script>
