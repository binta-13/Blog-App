<template>
  <div>
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>

    <h2>User's Blog Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </li>
    </ul>

    <h2>User's Comments</h2>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <h3>{{ comment.name }}</h3>
        <p>{{ comment.body }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      posts: [],
      comments: [],
    };
  },
  async mounted() {
    try {
      const userId = this.$route.params.id;
      const [userResponse, postsResponse, commentsResponse] = await Promise.all(
        [
          this.$axios.get(`/users/${userId}`),
          this.$axios.get(`/users/${userId}/posts`),
          this.$axios.get(`/users/${userId}/comments`),
        ]
      );
      this.user = userResponse.data;
      this.posts = postsResponse.data;
      this.comments = commentsResponse.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
