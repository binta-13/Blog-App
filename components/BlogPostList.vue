<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <nuxt-link :to="`/blog/${post.id}`">
          <v-btn class="mb-4">Detail</v-btn>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["posts"],
};
</script>
