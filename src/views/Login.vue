<template>
  <div>
    <div class='w-screen h-screen pt-14 bg-black'>
      <!-- Root element for center items -->
      <div class='h-full'>
        <!-- Container -->
        <div class='grid place-items-center mx-2 my-20 sm:my-auto'>
          <div class='w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg'>
            <!-- Title -->
            <h2 class='text-center font-semibold text-3xl lg:text-4xl text-gray-800'>
              Login
            </h2>
            <div class='mt-10'>
              <!-- Email Input -->
              <label
                for='email'
                class='block text-xs font-semibold text-gray-600 uppercase'
                >E-mail</label
              >
              <input
                id='email'
                type='email'
                name='email'
                placeholder='e-mail address'
                autocomplete='email'
                class='block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200'
                required
                v-model='email'
              />

              <!-- Password Input -->
              <label
                for='password'
                class='block mt-2 text-xs font-semibold text-gray-600 uppercase'
                >Password</label
              >
              <input
                id='password'
                type='password'
                name='password'
                placeholder='password'
                autocomplete='current-password'
                class='block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200'
                required
                v-model='password'
              />

              <!-- Auth Buttton -->
              <button
                class='w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none'
                @click='login'
              >
                Login
              </button>

              <!-- Another Auth Routes -->
              <div class='mt-8 sm:mb-4 text-black text-sm text-center'>
                <router-link to="/register" class="underline">Create an Account</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,

      });
    },
  },
};
</script>
