<template>
  <div>
    <v-col class="d-flex" cols="12" sm="6">
      <v-select
        v-model="select"
        :items="items"
        label="게시판을 선택하세요."
        solo
        @change="getPosts"
      ></v-select>
    </v-col>
    <v-simple-table height="300px">
      <thead>
        <tr>
          <th class="text-left">제목</th>
          <th class="text-left">작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in content" :key="item.title">
          <td @click="goBoardContent(item)">{{ item.title }}</td>
          <td>{{ item.createdAt }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <button
      v-if="this.select" 
      @click="securionWrite"
    >
      글쓰기
    </button>
  </div>  
</template>

<script>
import axios from 'axios';
  export default {
    methods: {
      goBoardContent(items) {
        if(this.select === '보안상식 - 보안용어') {
          //시큐리온 => 보안상식 - 보안용어
          return this.$router.push({ name: 'boardcontent', params: { items: items, subsidiaryId: 1, common: 1 } });
        } else if(this.select === '보안상식 - 보안Tip') {
          //시큐리온 => 보안상식 - 보안Tip
          return this.$router.push({ name: 'boardcontent', params: { items: items, subsidiaryId: 1, common: 2}});
        } else if(this.select === '보도자료') {
          //시큐리온 => 보도자료
          return this.$router.push({ name: 'boardcontent', params: { items: items, subsidiaryId: 1, common: 3}});
        } else {
          //시큐리온 => 분석리포트
          return this.$router.push({ name: 'boardcontent', params: { items: items, subsidiaryId: 1, common: 4}});
        } 
      },
      securionWrite() {
        if(this.select === '보안상식 - 보안용어') {
          //시큐리온 => 보안상식 - 보안용어
          return this.$router.push({ name: 'write', params: { subsidiaryId: 1, common: 1}});
        } else if(this.select === '보안상식 - 보안Tip') {
          //시큐리온 => 보안상식 - 보안Tip
          return this.$router.push({ name: 'write', params: { subsidiaryId: 1, common: 2}});
        } else if(this.select === '보도자료') {
          //시큐리온 => 보도자료
          return this.$router.push({ name: 'write', params: { subsidiaryId: 1, common: 3}});
        } else {
          //시큐리온 => 분석리포트
          return this.$router.push({ name: 'write', params: { subsidiaryId: 1, common: 4}});
        } 
      },
      getPosts() {
        //  /post/3 홀딩스
        //  /post/2 아이넷캅
        //  /post/1 시큐리온

        //common=1 : 보안상식 - 보안용어 
        //common=2 : 보안상식 - 보안Tip
        //common=3 : 보도자료
        //common=4 : 분석리포트
        if(this.select === '보안상식 - 보안용어') {
          axios.get('http://localhost:3065/api/post/1?common=1').then((res) => {
            this.content = res.data;
          }).catch((err) => {
            console.error(err);
          });
        } else if(this.select === '보안상식 - 보안Tip') {
          axios.get('http://localhost:3065/api/post/1?common=2').then((res) => {
            this.content = res.data;
          }).catch((err) => {
            console.error(err);
          });
        } else if(this.select === '보도자료') {
          axios.get('http://localhost:3065/api/post/1?common=3').then((res) => {
            this.content = res.data;
          }).catch((err) => {
            console.error(err);
          });
        } else {
          axios.get('http://localhost:3065/api/post/1?common=4').then((res) => {
            this.content = res.data;
          }).catch((err) => {
            console.error(err);
          });
        }
      }
    },
    data () {
      return {
        select: '',
        items: [
          '보안상식 - 보안용어',
          '보안상식 - 보안Tip',
          '보도자료',
          '분석리포트'
        ],
        content: [],
      }
    },
  }
</script>
