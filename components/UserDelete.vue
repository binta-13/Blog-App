<template>
  <div>
    <v-dialog persistent v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteUser">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["user", "dialog"],
  methods: {
    deleteUser() {
      this.$emit("delete-user", this.user);
      this.$emit("update:dialog", false);
    },

    closeDelete() {
      this.$emit("update:dialog", false);
    },

    deleteUser() {
      axios
        .delete(`https://gorest.co.in/public/v2/users/${this.user.id}`, {
          headers: {
            Authorization:
              "Bearer a43d87fac447955abbc27995b0934110cbaf9544d988644a36d5452cc6beed6e",
          },
        })
        .then((response) => {
          console.log("User deleted successfully");
          this.dialog = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
