<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <!-- <h1>{{contentTitle(this.$route.params.subsidiaryId, this.$route.params.common)}}</h1> -->
    <v-col cols="12" md="6">
      <v-text-field
        v-model="title"
        :rules="titleRules"
        label="제목을 입력해 주세요."
        required
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      <v-textarea
        solo
        v-model="content"
        name="input-7-4"
        :rules="contentRules"
        label="내용 또는 url을 입력해 주세요."
      ></v-textarea>
    </v-col>
    <v-col cols="12" md="6">
      <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
        <v-btn
          type="button"
          @click='pickFile'
        >
          이미지 업로드
        </v-btn>
        <input
          type="file"
          ref="imageInput"
          multiple
          hidden
          @change="onFilePicked"
        >
        <!-- {{imagePaths}} -->
        <div v-for="(p, i) in imagePaths" :key="i" style="display: inline-block">
          <img :src="`http://localhost:3065/${p}`" :alt="p">
          <div>
            <button @click="onRemoveImage(i)" type="button">제거</button>
          </div>
        </div>
      </v-flex>
    </v-col>
    <v-col cols="12" md="6">
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="editBtn"
      >
        수정하기
      </v-btn>
    </v-col>
  </v-form>
</template>

<script>
import axios from 'axios';
import { mapActions, mapState } from 'vuex';

export default {
  onRemoveImage(index) {
    this.$store.commit('removeImagePath', index);
  },
  data() {
    return {
      valid: true,
      title: this.$route.params.title,
      titleRules: [
        v => !!v || '제목이 입력 되지 않았습니다.',
      ],
      content: this.$route.params.content,
      contentRules: [
        v => !!v || '내용을 입력해 주세요.',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
      // imagePaths: this.$route.params.images
    }
  },
  computed: {
    ...mapState(['imagePaths']),
  },
  methods: {
    onRemoveImage(index) {
      this.imagePaths.splice(index, 1);
      // this.$store.commit('removeImagePath', index);
    },
    pickFile () {
      this.$refs.imageInput.click()
    },		
    onFilePicked (e) {
      console.log(e.target.files);
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append('image', f); //{image: [file1, file2]}
      });
      this.$store.dispatch('uploadImages', imageFormData);
    },
    editBtn() {
      const editURI = `http://localhost:3065/api/post/${this.$route.params.subsidiaryId}?common=${this.$route.params.common}&postId=${this.$route.params.postId}`
      const editObj = {
        title: this.title,
        content: this.content,
        // image: this.imagePaths,
      }
      axios.patch(editURI, editObj, {
        withCredentials: true,
      }).then((res) => {
        alert('게시글을 수정 하였습니다.');
        return this.$router.push({ name: 'board' });
      }).catch((err) => {
        console.error(err);
      });
    },
    contentTitle(subsidiaryId, common) {
      if(subsidiaryId === 2 && common === 3) {
        return '아이넷캅: 보도자료';
      } else if (subsidiaryId === 1 && common === 1) {
        return '시큐리온: 보안상식 - 보안용어'
      } else if (subsidiaryId === 1 && common === 2) {
        return '시큐리온: 보안상식 - 보안Tip'
      } else if (subsidiaryId === 1 && common === 3) {
        return '시큐리온: 보도자료'
      } else if (subsidiaryId === 1 && common === 4) {
        return '시큐리온: 분석리포트'
      } else {
        return '홀딩스: 보도자료'
      }
    }
  },
}
</script>