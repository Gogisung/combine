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
                v-if="isLogin"
              >
                <v-toolbar-title>{{nickname}} 님 환영합니다.</v-toolbar-title>
                <div class="flex-grow-1"></div>
                <button @click="logout">로그아웃</button>
              </v-toolbar>
              <v-toolbar
                color="primary"
                dark
                flat
                v-else
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text v-if="!nickname">
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
                </v-form>
              </v-card-text>
              <v-card-actions v-if="!nickname">
                <div class="flex-grow-1"></div>
                <v-btn
                  color="primary"
                  @click="login({ 
                    userId: userId,
                    password: password
                  })"
                >
                  Login
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
// import axios from 'axios';
import { mapState, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapState(["isLogin", "nickname"]),
    },
    methods: {
      ...mapActions(["login", "logout"]),
    },
    data() {
      return {
        userId: '',
        password: '',
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