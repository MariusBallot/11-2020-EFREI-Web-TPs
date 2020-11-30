<template>
  <div>
    <h2 class="mCart">Mon Panier</h2>
    <article v-for="article in panier.articles" :key="article.id">
      <div class="article-img">
        <div
          :style="{
            backgroundImage: 'url(' + articles[article.id].image + ')',
          }"
        ></div>
      </div>
      <div>
        <h2>
          {{ articles[article.id].name }} - {{ articles[article.id].price }}€
        </h2>
        <h2>Quantity : {{ article.quantity }}</h2>
        <p>{{ articles[article.id].description }}</p>
      </div>
      <form>
        <h4>Modify quantity</h4>
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
    panier: { type: Object },
  },
  data() {
    return {};
  },
  async mounted() {},
  methods: {
    updateCartArticle(article) {
      this.$emit("update-cart-article", article);
    },
  },
};
</script>

<style scoped>
article {
  display: flex;
  background: #eeeeee;
  padding: 20px;
  margin: 10px;
}

.article-img {
  margin-right: 20px;
}

.article-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
}

form {
  margin-left: auto;
}

form input {
  margin-top: 10px;
}

textarea {
  width: 100%;
}

.mCart {
  margin-left: 20px;
}
</style>
