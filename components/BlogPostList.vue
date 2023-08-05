<template>
  <div>
    <div>
      <v-card v-for="post in posts" :key="post.id" class="my-4">
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-text>{{ post.body }}</v-card-text>
        <nuxt-link :to="`/blog/${post.id}`">
          <v-btn class="mb-4 mx-4">Detail</v-btn>
        </nuxt-link>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: ["posts"],
};
</script>
