<template>
  <v-container>
    <h1>Blog Post List</h1>
    <v-container loading v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-container>
    <BlogPostList v-if="posts" :posts="posts" />
  </v-container>
</template>

<script>
import BlogPostList from "~/components/BlogPostList.vue";

export default {
  components: {
    BlogPostList,
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  async asyncData({ store }) {
    await store.dispatch('fetchPosts');
  },
};
</script>
