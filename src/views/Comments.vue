<template>
  <div class="pt-14 md:pt-4 bg-black">
    <div class="fixed bottom-0 right-0 m-2">

      <button @click="spotifyLogin" :class="Object.keys(this.routeParams).length ? 'pointer-events-none btn-linear-gradient' : ''" class="bg-gray-300 block m-2 p-3 text-center text-white transition rounded-full shadow-md ripple hover:shadow-lg focus:outline-none" >
        <img src="@/assets/spotify.png" alt="" class="w-5 ">
      </button>

      <button @click="getNowPlaying" :class="Object.keys(this.routeParams).length ? 'block' : 'hidden'" class="btn-linear-gradient block m-2 p-3 text-center text-white transition rounded-full shadow-md ripple hover:shadow-lg focus:outline-none" >
        <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      </button>

      <button @click="formIsOpen = !formIsOpen" class="btn-linear-gradient block m-2 p-3 text-center text-white transition rounded-full shadow-md ripple hover:shadow-lg hover:bg-royalblue-300 focus:outline-none" >
        <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- コメントを投稿 -->
    <div :class="formIsOpen ? 'fixed' : 'hidden'" >
      <div @click="formIsOpen = !formIsOpen" class="bg-black bg-opacity-75 fixed top-0 antialiased text-gray-900 p-8 w-screen h-screen z-10"></div>
      <div class="fixed left-0 right-0 card bg-white max-w-md p-10 md:rounded-lg m-auto z-20">
        <div class="title">
          <h1 class="text-black font-bold text-center">コメントを投稿</h1>
        </div>

        <div class="form mt-4 text-black">
          <p class="text-black">こんにちは {{ this.displayName ? this.displayName : 'ゲスト' }} さん</p>
          <div class="text-sm flex flex-col">
            <label for="comment" class="font-bold mt-4 mb-2">コメント</label>
              <textarea class=" appearance-none w-full border border-gray-200 p-2 h-40 focus:outline-none focus:border-gray-500"  placeholder="コメントを入力してください" id="comment" v-model="comment" ></textarea>
          </div>
        </div>

        <div class="submit bg-black mt-8">
          <button type="submit" class="txt-linear-gradient w-full shadow-lg px-4 py-2 text-center font-semibold focus:outline-none" @click="createComment">Submit!</button>
        </div>

      </div>
    </div>
    <!-- End コメントを投稿 -->

    <!-- なうぷれ投稿 -->
    <div :class="musicFormIsOpen ? 'fixed' : 'hidden'">
      <div @click="musicFormIsOpen = !musicFormIsOpen" class="fixed top-0 antialiased text-gray-900 bg-black bg-opacity-75 p-8 w-screen h-screen z-10"></div>
      <div class="fixed left-0 right-0 card bg-white max-w-md text-center p-10 md:rounded-lg m-auto z-20">
        <div v-if="nowPlaying != null">
          <p class="text-black">今再生中の曲 : {{ nowPlaying.item.artists[0].name }} の {{ nowPlaying.item.name }}</p>
          <img class="mx-auto" :src="nowPlaying.item.album.images[1].url">
        </div>
        <p class="text-black">こんにちは {{ this.displayName ? this.displayName : 'ゲスト' }} さん</p>
        <div class="submit bg-black mt-8">
          <button type="submit" class="txt-linear-gradient w-full shadow-lg px-4 py-2 text-center font-semibold focus:outline-none" @click="createMusicComment">SHARE!</button>
        </div>
      </div>
    </div>
    <!-- End なうぷれ投稿 -->

    <!-- タイムライン -->
    <div v-for="post in posts" :key="post.name" class="flex w-full items-center justify-center bg-black">
      <div class="w-full bg-black text-black dark:text-gray-200 p-4 antialiased flex max-w-lg">
        <div class="rounded-full h-10 w-10 bg-gray-50 text-center">
          <svg class="rounded-full h-10 w-10 p-1 bg-cerulean-50 text-gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div class="w-full ml-2">
          <div class="w-full bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5">
            <div class="font-semibold text-sm leading-relaxed">{{post.fields.name.stringValue}}</div>
            <div class="text-normal leading-snug break-words md:leading-normal">{{autoLink(post.fields.comment.stringValue)}}</div>
          </div>
          <div class="text-sm text-white ml-4 mt-0.5">
            {{ post.fields.postTime.timestampValue | moment }}
          </div>
        </div>
      </div>
    </div>
    <!-- End タイムライン -->

  </div>
</template>

<script>

import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import spotifyApiKey from '../spotify-api'; // This is Spotify API Key. You need SET UP your API Key in this file!

export default {
  name: 'Comment',
  data() {
    return {
      comment: '',
      posts: [],
      formIsOpen: false,
      musicFormIsOpen: false,
      nowPlaying: null,
    };
  },
  props: {
    routeParams: Object,
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    },
    displayName() {
      return this.$store.getters.displayName;
    },
  },
  created() {
    this.getComments();
    if (this.$route.hash) {
      this.$router.push(this.$route.fullPath.replace('#', '?'));
    }
  },
  mounted() {
    console.log('this.routeParams');
    console.log(this.routeParams);
    console.log(Object.keys(this.routeParams).length);
  },
  methods: {
    createComment() {
      const date = new Date(this.getNowYMD(new Date()));
      console.log(date);
      axios
        .post('/comments/',
          {
            fields: {
              name: {
                stringValue: this.displayName ? this.displayName : 'ゲスト',
              },
              comment: {
                stringValue: this.comment,
              },
              postTime: {
                timestampValue: date,
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${this.idToken}`,
            },
          }).then((response) => {
          console.log(response);
          this.getComments();
          this.formIsOpen = false;
          this.name = '';
          this.comment = '';
        }).catch((error) => {
          console.log(error);
          alert('エラーです。');
        });
    },
    createMusicComment() {
      const date = new Date(this.getNowYMD(new Date()));
      console.log(date);
      axios
        .post('/comments/',
          {
            fields: {
              name: {
                stringValue: this.displayName ? this.displayName : 'ゲスト',
              },
              comment: {
                stringValue: `${this.displayName}さんは${this.nowPlaying.item.artists[0].name}の${this.nowPlaying.item.name}を聴いています。`,
              },
              postTime: {
                timestampValue: date,
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${this.idToken}`,
            },
          }).then((response) => {
          console.log(response);
          this.getComments();
          this.musicFormIsOpen = false;
          this.comment = '';
        }).catch((error) => {
          console.log(error);
          alert('エラーです。');
        });
    },
    getComments() {
      axios.get('/comments/', {
        headers: {
          Authorization: `Bearer ${this.idToken}`,
        },
      }).then((response) => {
        console.log('response.data.documents');
        console.log(response);
        this.posts = _.orderBy(response.data.documents, 'fields.postTime.timestampValue', 'desc');
      }).catch((err) => {
        console.log('getCommentsのエラーです。');
        console.error(err);
      });
    },
    spotifyLogin() {
      const endpoint = 'https://accounts.spotify.com/authorize';
      const responseType = 'token';
      const clientId = spotifyApiKey;
      const redirectUri = window.location.href.slice(0, -1);
      const scope = 'user-read-currently-playing';
      window.location.href = `${endpoint}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    },
    getNowPlaying() {
      const endpoint = 'https://api.spotify.com/v1/me/player/currently-playing?market=JP';
      const dataSpotify = {
        headers: {
          Authorization: `${this.routeParams.token_type} ${this.routeParams.access_token}`,
        },
        dataSpotify: {},
      };
      console.log('dataSpotify is ');
      console.log(dataSpotify);
      axios.get(endpoint, dataSpotify)
        .then((res) => {
          if (res.statusText === 'OK') {
            this.nowPlaying = res.data;
            console.log(this.nowPlaying);
            this.musicFormIsOpen = true;
          } else if (res.statusText === 'No Content') {
            alert('あなたは今曲を聴いていません');
          } else {
            this.nowPlaying = res.data;
            console.log(this.nowPlaying);
            this.musicFormIsOpen = true;
          }
        })
        .catch((err) => {
          console.log('エラー');
          console.error(err);
        });
    },
    getNowYMD(date) {
      const now = date;
      const result = `${now.getFullYear()}/${this.padZero(now.getMonth() + 1)}/${this.padZero(now.getDate())} ${this.padZero(now.getHours())}:${this.padZero(now.getMinutes())}:${this.padZero(now.getSeconds())}`;
      return result;
    },
    padZero(num) {
      return (num < 10 ? '0' : '') + num;
    },
    autoLink(text) {
      return _.isString(text) ? text.replace(/(https?:\/\/[^\s]*)/g, '<span v-html="rawhtml"><a href="$1">$1</a><span>') : '';
    },
  },
  filters: {
    moment(date) {
      return moment(date).format('YYYY/MM/DD HH:mm');
    },
  },
};
</script>
<style>
.btn-linear-gradient {
  /* background: linear-gradient(270.97deg, #faf6eb -21.36%, #f374dd -2.45%, #a88cf8 26.84%, #C2A0FD 64.15%, #2cd1ff 108.29%, #B2F4B6 159.03%); */
  /* background: linear-gradient(65deg, #d2e774 -21.36%, #9ad031 26.84%, #6be6d4 64.15%, #25d4b9 108.29%); */
  background: linear-gradient(65deg, #5fb512 -21.36%, #d2e774 26.84%, #13dfc0 64.15%, #a8f1e4 108.29%);
}

.txt-linear-gradient {
  background: linear-gradient(246deg, #d2e774 -21.36%, #9ad031 26.84%, #6be6d4 64.15%, #25d4b9 108.29%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.border-linear-gradient {
  background: linear-gradient(-65deg, #9ad031 26.84%, #6be6d4 60%, #25d4b9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
