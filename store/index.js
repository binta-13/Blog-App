export const state = () => ({
    posts: [],
    post: null,
    comments: [],
    user: null,
    loading: false,
    notfound: false,
  });

  export const mutations = {
    SET_POST(state, post) {
      state.post = post;
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_NOTFOUND(state, notfound) {
      state.notfound = notfound;
    },
  };

  export const actions = {
    async fetchPostAndComments({ commit }, postId) {
        try {
          commit("SET_LOADING", true);
          const [postResponse, commentsResponse] = await Promise.all([
            this.$axios.get(`/posts/${postId}`),
            this.$axios.get(`/posts/${postId}/comments`),
          ]);
          commit("SET_LOADING", false);
          commit("SET_POST", postResponse.data);
          commit("SET_COMMENTS", commentsResponse.data);
        } catch (error) {
          commit("SET_LOADING", false);
          commit("SET_NOTFOUND", true);
          console.error(error);
        }
      },
      async fetchPosts({ commit }) {
        try {
          commit("SET_LOADING", true);
          const response = await this.$axios.get("/posts");
          commit("SET_LOADING", false);
          commit("SET_POSTS", response.data);
        } catch (error) {
          commit("SET_LOADING", false);
          commit("SET_NOTFOUND", true);
          console.error(error);
        }
      },
  }