<template>
   <div>
    <v-container v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-container>
    <v-alert v-else-if="notfound" density="compact" color="error" icon="$error"
      >Data not Found</v-alert
    >
    <v-container>
      <v-card v-if="post">
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-subtitle>{{ post.body }}</v-card-subtitle>
      </v-card>
      <v-container v-if="comments.length > 0">
        <h4>Comments</h4>
        <v-card v-for="comment in comments" :key="comment.id" class="mb-4">
          <v-card-subtitle>{{ comment.name }}</v-card-subtitle>
          <v-card-text>{{ comment.body }}</v-card-text>
        </v-card>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  async mounted() {
    const postId = this.$route.params.id;
    await this.$store.dispatch("fetchPostAndComments", postId);
  },
  computed: {
    post() {
      return this.$store.state.post;
    },
    comments() {
      return this.$store.state.comments;
    },
    user() {
      return this.$store.state.user;
    },
    loading() {
      return this.$store.state.loading;
    },
    notfound() {
      return this.$store.state.notfound;
    },
  },
};
</script>
