<template>
  <div>
    <div v-if="loading">Loading</div>
    <div>
      <div v-if="post">
        <h1>{{ post.title }}</h1>
        <p>{{ post.body }}</p>
      </div>

      <div v-if="comments.length > 0">
        <h2>Comments</h2>
        <ul>
          <li v-for="comment in comments" :key="comment.id">
            <h3>{{ comment.name }}</h3>
            <p>{{ comment.body }}</p>
          </li>
        </ul>
      </div>
      <div v-if="user">
        <h2>User</h2>
        <div>
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: null,
      comments: [],
      user: null,
      loading: false,
    };
  },
  async mounted() {
    try {
      this.loading = true;
      const postId = this.$route.params.id;
      const [postResponse, commentsResponse] = await Promise.all([
        this.$axios.get(`/posts/${postId}`),
        this.$axios.get(`/posts/${postId}/comments`),
      ]);
      const [userResponse] = await Promise.all([
        this.$axios.get(`/users/${postResponse.data.user_id}`),
      ]);
      this.loading = false;
      this.post = postResponse.data;
      this.comments = commentsResponse.data;
      this.user = userResponse.data;
    } catch (error) {
      this.loading = false;
      console.error(error);
    }
  },
};
</script>
