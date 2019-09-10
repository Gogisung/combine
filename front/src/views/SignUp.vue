<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>회원가입</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="userId"
                    label="아이디를 입력하세요"
                    name="login"
                    prepend-icon="person"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    id="password"
                    label="비밀번호를 입력해 주세요."
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>

                  <v-text-field
                    v-model="nickname"
                    id="nickname"
                    label="닉네임을 입력 하세요."
                    name="nickname"
                    prepend-icon="face"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn
                  color="primary"
                  @click="signUp({ 
                    userId: userId,
                    password: password,
                    nickname: nickname,
                  })"
                >
                  신청하기
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
  export default {
    methods: {
      signUp(loginObj) {
        const signUpURI = 'https://cors-anywhere.herokuapp.com/http://localhost:3065/api/user/';
        axios.post(`${signUpURI}`, loginObj).then((res) => {
          console.log('회원가입 성공', res);
        }).catch((err) => {
          console.log('err', err);
        });
      },
    },
    data() {
      return {
        userId: '',
        password: '',
        nickname: '',
      }
    },
    props: {
      source: String,
    },
    // data: () => ({
    //   drawer: null,
    // }),
  }
</script>