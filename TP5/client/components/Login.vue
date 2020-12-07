<template>
  <div>
    <h2 class="login">Login view</h2>
    <form action="POST" @submit.prevent="logUser">
      <input type="text" v-model="user.email" placeholder="email" />
      <input type="text" v-model="user.password" placeholder="password" />
      <button type="submit">Submit</button>
    </form>
    <router-link to="/register">No account ?</router-link>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      user: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    logUser() {
      console.log(this.user);
      this.$emit("log-user", this.user);
    }
  }
};
</script>

<style scoped>
</style>
