<template>
  <div id="app">
    <div class="mt-10 md:mt-32"></div>
    <div class="fixed top-0 left-0 w-full bg-black bg-opacity-75 p-2">
      <header class=" container mx-auto text-white">
        <div class="flex justify-between items-center">
          <router-link to="/">
            <h1 class="logo-txt text-4xl p-2 font-semibold">Foundify</h1>
          </router-link>
          <div class="items-center p-2 md:hidden">
            <button @click="menuIsOpen = !menuIsOpen" class="focus:outline-none">
              <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path v-show="!menuIsOpen" d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/>
                <path v-show="menuIsOpen" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            </button>
          </div>
        </div>
        <div :class="menuIsOpen ? 'block' : 'hidden'" class="nav-content fixed left-0 w-full z-20 bg-black md:bg-transparent md:block md:static md:text-right">
          <ul class="md:flex md:justify-end">
            <template v-if="isAuthenticated">
              <router-link to="/" class="w-auto"><li @click="menuIsOpen = !menuIsOpen">トップ</li></router-link>
              <router-link to="/mypage" class="w-auto"><li @click="menuIsOpen = !menuIsOpen">マイページ</li></router-link>
            </template>
            <li class="w-auto"><a href="https://github.com/hayato-na/Foundify_by_Hayato" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <template v-if="isAuthenticated">
              <li class="cursor-pointer w-auto" @click="logout">LogOut</li>
            </template>
          </ul>
        </div>
        <div @click="menuIsOpen = !menuIsOpen" :class="menuIsOpen ? 'block' : 'hidden'" class="fixed top-0 left-0 right-0 bottom-0 z-10 w-screen h-screen bg-transparent"></div>
      </header>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuIsOpen: false,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.idToken !== null;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.menuIsOpen = !this.menuIsOpen;
    },
  },
};
</script>

<style>
html {
  background-color: #000;
}
#app {
  background-color: #000;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}

.nav-content li {
  @apply block m-2 p-2 border-b md:border-none hover:bg-royalblue-400;
}

.nav-content li:hover {
  background: linear-gradient(-65deg, #d2e774 26.84%, #6be6d4 60%, #72e1ed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.logo-txt {
  background: linear-gradient(-65deg, #9ad031 26.84%, #6be6d4 60%, #25d4b9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

</style>
