<template>

  <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900" v-if="mode === 'login'">Login</h2>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900" v-else>Create account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"  v-if="mode=== 'login'" @click="switchToCreateAccount()">Create Account</a>
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500" v-else @click="switchToLogin()">Login with your account</a>
        </p>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input v-model="email" id="email-address" name="email" type="email" required="" class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
          </div>

          <div class="grid grid-cols-6 gap-6" v-if="mode === 'create'">
          <div class="col-span-6 sm:col-span-3">
            <label for="lastName" class="sr-only">Last name</label>
            <input v-model="lastName" id="lastName" name="lastName" type="text" required="" class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Last Name" />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="firstName" class="sr-only">First name</label>
            <input v-model="firstName" id="firstName" name="text" type="text" required="" class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="First Name" />
          </div>
          </div>


          <div>
            <label for="password" class="sr-only">Password</label>
            <input v-model="password" id="password" name="password" type="password"  required="" class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
          </div>
        </div>


        <div>
          <button @click="login()" type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" v-if="mode=== 'login'">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Login
          </button>

          <button @click="createAccount()" type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" v-else>
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { LockClosedIcon } from '@heroicons/vue/20/solid'

export default {
  name: 'Login',
  data: function(){
    return {
      mode: 'login',
      email: '',
      lastName: '',
      firstName: '',
      password: ''
    }
  },
  computed:  {},
  methods: {
    switchToCreateAccount: function (){
      this.mode = 'create'
    },
    switchToLogin: function (){
      this.mode = 'login'
    },
    createAccount: function(){
      this.$store.dispatch('createAccount', {
        email: this.email,
        lastName: this.lastName,
        firstName: this.firstName,
        password: this.password
      })
    },
    login: function () {
      const self = this;
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      }).then(function () {
        self.$router.push('/home');
      }, function (error) {
        console.log(error);
      })
    },
  }
}
</script>