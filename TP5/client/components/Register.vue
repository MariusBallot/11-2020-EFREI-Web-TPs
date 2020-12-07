<template>
  <div>
    <h2 class="register">Sign up</h2>
    <form action="POST" @submit.prevent="submitUser">
      <input type="text" v-model="user.email" placeholder="email" />
      <input type="text" v-model="user.password" placeholder="password" />
      <button type="submit">Submit</button>
    </form>
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
    submitUser() {
      console.log(this.user);
      this.$emit("submit-user", this.user);
    }
  }
};
</script>

<style scoped>
</style>
