<template>
  <div>
    <v-dialog persistent v-model="dialog" max-width="500px" class="ml-4">
      <template v-slot:activator="{ on }">
        <v-btn color="green" dark v-on="on">Add User</v-btn>
      </template>
      <v-card>
        <v-card-title> User Details </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="user.name" label="Name"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="user.email" label="Email"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="user.gender" label="gender"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="user.status" label="status"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveUser">Save</v-btn>
          <v-btn color="error" @click="cancelDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="showSnackbar"
      :timeout="snackbarTimeout"
      color="success"
    >
      User saved successfully.
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      user: {
        name: "",
        email: "",
        gender: "",
        status: "",
      },
      showSnackbar: false,
      snackbarTimeout: 3000,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    cancelDialog() {
      this.dialog = false;
    },
    saveUser() {
      const data = JSON.stringify({
        name: this.user.name,
        email: this.user.email,
        gender: this.user.gender,
        status: this.user.status,
      });

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization:
            "Bearer a43d87fac447955abbc27995b0934110cbaf9544d988644a36d5452cc6beed6e",
          "Content-Type": "application/json",
        },
        body: data,
      };

      fetch("https://gorest.co.in/public/v2/users", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.dialog = false;
        })
        .catch((error) => {
          console.error(error);
        });
      this.showSnackbar = true;
      setTimeout(() => {
        this.showSnackbar = false;
      }, this.snackbarTimeout);
    },
  },
};
</script>
