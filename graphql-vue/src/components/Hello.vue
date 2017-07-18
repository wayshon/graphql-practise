<template>
  <div class="apollo">
    <h3>Hello</h3>
    <!-- <p>{{ article }}</p>
    <p> -------------------------  </p>
    <p v-for="item of tags">
      {{item}}
    </p>
    <p> -------------------------  </p>
    <div>
      <button @click="getArticle">获取article</button>
    </div>
    <div>
      <input type="text" v-model="newContent" />
      <button @click="updateArticle">更新article</button>
    </div> -->
    <p>
      {{user}}
    </p>
    <button @click="getUser">获取user</button>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'hello',
  data () {
    return {
      user: ''
    }
  },
  methods: {
    getUser() {
      this.$apollo.query({
        // Query
        query: gql`query user($id: Int!) {
          user(id: $id) {
            id
            nickName
            email
            mobile
            avatar
            manager
            creatAt
            updateAt
            articles {
              id
              userId
              title
              content
              readCount
              creatAt
              updateAt
              comments {
                id
                userId
                articleId
                content
                creatAt
                updateAt
              }
            }
          }
        }`,
        // Static parameters
        variables: {
          id: 11,
        },
      }).then((obj) => {
        console.log(obj);
        this.user = obj.data.user;
      }).catch((error) => {
        console.error(error);
      });
    },
    getArticle() {
      this.$apollo.query({
        // Query
        query: gql`query article($id: Int!) {
          article(id: $id) {
            id 
            title
            content
            tags {
              tag_name
            }
          }
        }`,
        // Static parameters
        variables: {
          id: 111,
        },
      }).then((obj) => {
        console.log(obj);
        this.article = obj.data.article;
      }).catch((error) => {
        console.error(error);
      });
    },
    updateArticle() {
      this.$apollo.mutate({
        // Query
        mutation: gql`mutation ($id: Int!, $content: String!) {
          modifyContent(id: $id, content: $content) {
            id 
            title
            content
            tags {
              tag_name
            }
          }
        }`,
        // Parameters
        variables: {
          id: 111,
          content: this.newContent,
        },
      }).then(obj => {
        console.log(obj);
        this.article = obj.data.modifyContent;
        console.log(this.article);
      }).catch(error => {
        console.error(error);
      });
    }
    //   this.$apollo.mutate({
    //     // Query
    //     mutation: gql`mutation {
    //       modifyContent(111, 'content modifyed') {
    //         id 
    //         title
    //         content
    //         tags {
    //           tag_name
    //         }
    //       }
    //     }`,
    //     // Static parameters
    //     variables: {
    //       id: 111,
    //       content: 'content modifyed'
    //     },
    //   }).then((obj) => {
    //     console.log(obj);
    //     this.article = obj.data.article;
    //   }).catch((error) => {
    //     console.error(error);
    //   });
    // }
  },
  mounted() {
    
  }
}
</script>
