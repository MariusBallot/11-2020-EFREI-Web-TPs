<template>
  <div class="register">
    <div class="wrapper">
      <h2>Sign up</h2>
      <form action="POST" @submit.prevent="submitUser">
        <input type="text" v-model="user.email" placeholder="email" />
        <input type="text" v-model="user.password" placeholder="password" />
        <button type="submit">Submit</button>
      </form>
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
    submitUser() {
      console.log(this.user);
      this.$emit("submit-user", this.user);
    }
  }
};
</script>

<style scoped>
.register {
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
