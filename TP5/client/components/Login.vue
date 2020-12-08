<template>
  <div class="login">
    <div class="wrapper">
      <h2>Login</h2>
      <form action="POST" @submit.prevent="logUser">
        <input type="text" v-model="user.email" placeholder="email" />
        <input type="text" v-model="user.password" placeholder="password" />
        <button type="submit">Submit</button>
      </form>
      <router-link to="/register">No account ?</router-link>
    </div>
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
.login {
  width: 100vw;
  display: flex;
  justify-content: center;
}

.wrapper {
  background: white;
  padding: 30px;
  border-radius: 20px;
  border: solid black 5px;
}

h2 {
  text-align: center;
  text-transform: uppercase;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  width: 30vw;
  padding: 20px;
  border-radius: 10px;
  margin: 5px 0;
}

button {
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
}

a {
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>
