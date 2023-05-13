<template>
  <div>
    <h1>User List</h1>
    <UserList :users="users" :loading="loading" />
  </div>
</template>

<script>
import UserList from "~/components/UserList.vue";

export default {
  components: {
    UserList,
  },
  data() {
    return {
      users: [],
      loading: false,
    };
  },
  async mounted() {
    try {
      this.loading = true;
      const response = await this.$axios.get("/users");
      this.users = response.data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.error(error);
    }
  },
};
</script>
