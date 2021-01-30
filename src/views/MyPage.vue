<template>
  <div>
    <div class="bg-black pt-14">
      <div class="my-10">
        <div class="bg-white w-9/12 max-w-screen-md mx-auto rounded overflow-hidden shadow-lg">
          <div class="text-center p-6  border-b">
            <div class="h-24 w-24 mx-auto text-center rounded-full ">
              <svg class="rounded-full h-24 w-24 p-1 bg-cerulean-400 text-gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p class="pt-2 text-black text-lg font-semibold">{{ this.displayName ? this.displayName : 'ゲスト' }} さん</p>
            <p class="text-sm text-gray-600">{{ this.email }}</p>
            <div class="mt-5">
              <p @click="alertpreparation" class="w-40 mx-auto border rounded-full py-2 px-4 text-xs font-semibold text-gray-700 cursor-pointer hover:shadow-md">Manage your Account</p>
            </div>
          </div>

          <div class="">
            <div class="px-4 py-2 pb-4 hover:bg-gray-100 flex">
              <p @click="logout" class="text-sm font-medium text-gray-800 leading-none cursor-pointer">ログアウト</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPage',
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    },
    displayName() {
      return this.$store.getters.displayName;
    },
    email() {
      return this.$store.getters.email;
    },
  },
  methods: {
    alertpreparation() {
      alert('この機能は準備中です。');
    },
    logout() {
      this.$store.dispatch('logout');
      this.menuIsOpen = !this.menuIsOpen;
    },
  },
};
</script>
