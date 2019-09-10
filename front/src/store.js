import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    cookie: null,
    nickname: null,
    imagePaths: [],
    title: '',
    content: '',
  },
  mutations: {
    loginSuccess(state, payload) {
      const newState = state;
      newState.isLogin = true;
      newState.nickname = payload;
    },
    logout(state) {
      state.isLogin = false;
      state.nickname = null;
    },
    concatImagePaths(state, payload) {
      state.imagePaths = state.imagePaths.concat(payload);
    },
    removeImagePath(state, payload) {
      state.imagePaths.splice(payload, 1);
    },
    addPostSuccess(state, payload) {
      state.title = payload.title;
      state.content = payload.content;
    },
  },
  actions: {
    login({ commit }, loginObj) {
      const loginURI = 'http://localhost:3065/api/user/login';
      axios.post(`${loginURI}`, loginObj, { withCredentials: true }).then((res) => {
        console.log('로그인 성공', res);
        commit('loginSuccess', res.data.nickname);
      }).catch((err) => {
        alert('로그인 정보를 확인해 주세요.');
        console.log('err', err);
      });
    },
    logout({ commit }) {
      axios.post('http://localhost:3065/api/user/logout', {}, { withCredentials: true }).then((res) => {
        console.log(res.data);
        commit('logout');
      }).catch((err) => {
        console.error(err);
      });
    },
    loadUser({ commit }) {
      axios.get('http://localhost:3065/api/user/', { withCredentials: true }).then((res) => {
        console.log(res);
        commit('loginSuccess', res.data.nickname);
      }).catch((err) => {
        console.error(err);
      });
    },
    validate({ commit }, payload) {
      console.log('payload', payload);
      // if (this.$refs.form.validate()) {
      const pressObj = {
        title: payload.title,
        content: payload.htmlForEditor,
        // content: payload.content,
        image: payload.imagePaths,
      };

      axios.post(`http://localhost:3065/api/post/${payload.subsidiaryId}?common=${payload.common}`, pressObj, {
        withCredentials: true,
      }).then((res) => {
        commit('addPostSuccess', res.data);
        alert('게시글 등록 성공!');
        return router.push({ name: 'board' });
      }).catch((err) => {
        console.error(err);
      });
    // }
    },
    uploadImages({ commit }, payload) {
      axios.post('http://localhost:3065/api/post/images', payload, {
        withCredentials: true,
      }).then((res) => {
        console.log(res);
        commit('concatImagePaths', res.data);
        console.log(res);
      }).catch((err) => {
        console.error(err);
      });
    }
  },
});
