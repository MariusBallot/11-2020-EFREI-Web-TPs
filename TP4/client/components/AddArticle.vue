<template>
  <div class="wrapper">
    <form v-show="show" @submit.prevent="addArticle">
      <h2>Nouveau produit à ajouter</h2>
      <input
        type="text"
        v-model="newArticle.name"
        placeholder="Nom du produit"
        required
      />
      <input
        type="number"
        v-model="newArticle.price"
        placeholder="Prix"
        required
      />
      <textarea
        type="text"
        v-model="newArticle.description"
        required
      ></textarea>
      <input
        type="text"
        v-model="newArticle.image"
        placeholder="Lien vers l'image"
      />
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>
 
<script>
module.exports = {
  props: {
    show: Boolean,
  },
  data() {
    return {
      newArticle: {
        name: "",
        description: "",
        image: "",
        price: 0,
      },
    };
  },
  methods: {
    addArticle() {
      this.$emit("add-article", this.newArticle);
    },
  },
};
</script>
 
<style scoped>
form {
  width: 80vw;
  background: lightgray;
  padding: 20px;
}

.wrapper {
  width: 100vw;
  display: flex;
  justify-content: center;
}
</style>
