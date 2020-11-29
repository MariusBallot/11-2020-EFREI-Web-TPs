<template>
  <div>
    <h2>Mon Panier</h2>
    <article v-for="article in panier.articles" :key="article.id">
      <div class="article-img">
        <div :style="{ backgroundImage: 'url(' + articles[article.id].image + ')' }"></div>
      </div>
      <div class="article-title">
        <h2>{{ articles[article.id].name }} - {{ articles[article.id].price }}€</h2>
        <h2>Quantity : {{ article.quantity }}</h2>
      </div>
      <p>{{ articles[article.id].description }}</p>
      <form>
        <input
          placeholder="Modify quantity"
          @change="updateCartArticle(article)"
          v-model.lazy="article.quantity"
          type="number"
        />
      </form>
    </article>
  </div>
</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object }
  },
  data() {
    return {};
  },
  async mounted() {},
  methods: {
    updateCartArticle(article) {
      this.$emit("update-cart-article", article);
    }
  }
};
</script>

<style scoped>
</style>
