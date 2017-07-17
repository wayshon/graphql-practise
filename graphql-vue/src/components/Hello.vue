<template>
  <div class="apollo">
    <h3>Hello</h3>
    <p>
      {{hello}}
    </p>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const query = gql`query PostsForAuthor {
  posts {
    id
    title
    votes
    author {
      id
      firstName
      lastName
    }
  }
}`;

export default {
  name: 'hello',
  data () {
    return {
      hello: '',
    }
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    hello: query,
  },
  mounted() {

  }
}
</script>
