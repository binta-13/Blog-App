<template>
  <div>
    <v-dialog persistent v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span>Edit User</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="user.name" label="Name"></v-text-field>
          <v-text-field v-model="user.email" label="Email"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="saveUser">Save</v-btn>
          <v-btn color="error" @click="cancelUser">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["user", "dialog"],
  methods: {
    saveUser() {
      this.$emit("save-user", this.user);
      this.$emit("update:dialog", false);
    },
    cancelUser() {
      this.$emit("update:dialog", false);
    },
    async saveUser() {
      const data = JSON.stringify({
        name: this.user.name,
        email: this.user.email,
        gender: this.user.gender,
        status: this.user.status,
      });

      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization:
            "Bearer a43d87fac447955abbc27995b0934110cbaf9544d988644a36d5452cc6beed6e",
          "Content-Type": "application/json",
        },
        body: data,
      };

      fetch(`https://gorest.co.in/public/v2/users/${this.user.id}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.dialog = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
