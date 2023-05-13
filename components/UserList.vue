<template>
  <div>
    <v-card>
      <v-list>
        <CreateUser class="ml-4" />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-data-table
          :headers="headers"
          :items="users"
          sort-by="calories"
          class="elevation-1"
          :search="search"
          :loading="loading"
          loading-text="Loading... Please wait"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn small @click="handleEdit(item)"> Edit </v-btn>
            <v-btn small color="error" @click="handleDelete(item)"> Delete </v-btn>
          </template>
        </v-data-table>
        <user-form :user="user" :dialog.sync="dialog" />
        <user-delete :user="user" :dialog.sync="dialogDelete" />
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["users", "loading"],
  data() {
    return {
      dialog: false,
      search: "",
      user: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialog: false,
      dialogDelete: false,
    };
  },
  methods: {
    handleEdit(user) {
      // $emit("edit-user", this.user);
      this.user = user;
      this.dialog = true;
    },
    handleDelete(user) {
      // $emit('delete-user', user.id)
      this.user = user;
      this.dialogDelete = true;
    },
  },
};
</script>
