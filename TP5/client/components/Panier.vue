<template>
  <div>
    <h2 class="mCart">Mon Panier</h2>
    <article v-for="(article, i) in panier.articles" :key="i">
      <div class="article-img">
        <div
          :style="{
            backgroundImage: 'url(' + returnArticle(article).image + ')',
          }"
        ></div>
      </div>
      <div>
        <h2>{{ returnArticle(article).name }} - {{ returnArticle(article).price }}€</h2>
        <h2>Quantity : {{ article.quantity }}</h2>
        <p>{{ returnArticle(article).description }}</p>
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
    <div class="buttHolder">
      <button v-if="panier.articles.length>0" @click="onPay">Commander et payer</button>
    </div>
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
    },
    returnArticle(article) {
      let rart = null;
      this.articles.forEach(art => {
        if (art.id == article.id) rart = art;
      });
      return rart;
    },
    onPay() {
      this.$emit("on-pay", this.panier);
    }
  }
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
  text-transform: uppercase;
  text-align: center;
}

.buttHolder {
  width: 100vw;
  display: flex;
  justify-content: center;
}

.buttHolder button {
  padding: 20px;
}
</style>
