<template>
  <div>
    <table>
      <tr>
        <th>제목</th>
        <td>{{boardContent.title}}</td>
      </tr>
      <tr>
        <th>내용</th>
        <td>
          <vue-editor v-model="content"></vue-editor>
          <div v-html="content"></div>
        </td>
      </tr>
      <tr>
        <th>작성날짜</th>
        <td>{{boardContent.updatedAt}}</td>
      </tr>
      <tr>
        <th>작성자</th>
        <td>{{boardContent.User.nickname}}</td>
      </tr>
      <!-- <tr v-if="boardContent.Images">
        <th>이미지</th>
        <td>
          <div v-for="(item, index) in boardContent.Images" :key="index">
            <img :src="`http://localhost:3065/${item.src}`" :alt="item">
          </div>
        </td>
      </tr> -->
    </table>
    <button @click="editBtn(boardContent.id)">수정</button>
    <button @click="deleteBtn(boardContent.id)">삭제</button>
    <button @click="goList">목록으로</button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { VueEditor } from 'vue2-editor'

export default {
  computed: {
    // ...mapState(['title', 'content']),
    VueEditor,
  },
  // components: {
  //   'viewer': Viewer
  // },
  methods: {
    editBtn(id) {
      console.log('this.$route.params',this.$route.params);
      this.$router.push({
        name: 'update',
        params: {
          title: this.$route.params.items.title,
          content: this.$route.params.items.content,
          subsidiaryId: this.$route.params.subsidiaryId,
          common: this.$route.params.common,
          postId: id,
          images: this.$route.params.items.Images,
        }
      });
    },
    deleteBtn(postId) {
      const deleteURI = `http://localhost:3065/api/post/${postId}`;
      axios.delete(`${deleteURI}`,{
        withCredentials: true,
      });
      alert('게시글이 삭제 되었습니다.');
      return this.$router.push({ name: 'board'});
    },
    goList() {
      return this.$router.push({ name: 'board'});
    }
  },
  data() {
    return {
      content: this.$route.params.items.content,
      viewerText: this.$route.params.items.content,
      // viewerText: '# This is Viewer.\n Hello World.',
      // imageLink: this.$route.params.items.Images[0] && `http://localhost:3065/${this.$route.params.items.Images[0].src}`,
      boardContent: this.$route.params.items
    }
  }
}
</script>

<style scoped>
button {
  padding: 10px 5px;
  border: 1px solid #dddddd;
  margin-left: 20px;
}

table {
  border: 1px solid #000000;
  border-collapse: collapse;
  margin: 20px;
}

th, td {
  padding: 10px;
  border: 1px solid #000000;
}

th {
  width: 100px;
}

td {
  width: 500px;
}
</style>