<template>
  <div>
    <article v-for="article in articles" :key="article.id">
      <div class="article-img">
        <div :style="{ backgroundImage: 'url(' + article.image + ')' }"></div>
      </div>
      <div class="article-content" v-if="editingArticle.id !== article.id">
        <div class="article-title">
          <h2>{{ article.name }} - {{ article.price }}€</h2>
          <div class="sideBut">
            <button @click="deleteArticle(article.id)">Supprimer</button>
            <button @click="editArticle(article)">Modifier</button>
            <button v-if="!checkInCart(article.id)" @click="addToCart(article.id)">Ajouter au panier</button>
            <button v-else @click="deleteFromCart(article.id)">Retirer du panier</button>
          </div>
        </div>
        <p>{{ article.description }}</p>
      </div>
      <div class="article-content" v-else>
        <div class="article-title">
          <h2>
            <input type="text" v-model="editingArticle.name" /> -
            <input type="number" v-model="editingArticle.price" />
          </h2>
          <div>
            <button @click="sendEditArticle()">Valider</button>
            <button @click="abortEditArticle()">Annuler</button>
          </div>
        </div>
        <p>
          <textarea v-model="editingArticle.description"></textarea>
        </p>
        <input type="text" v-model="editingArticle.image" placeholder="Lien vers l'image" />
      </div>
    </article>
    <add-article :show="showForm" @add-article="addArticle"></add-article>
    <div class="botBut">
      <button v-if="!showForm" @click="showForm = !showForm" class="showArt">Show Form</button>
      <button v-else @click="showForm = !showForm" class="showArt">Hide Form</button>
    </div>
  </div>
</template>

<script>
const AddArticle = window.httpVueLoader("./components/AddArticle.vue");

module.exports = {
  components: {
    AddArticle
  },
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object }
  },
  data() {
    return {
      editingArticle: {
        id: -1,
        name: "",
        description: "",
        image: "",
        price: 0
      },
      showForm: false
    };
  },
  methods: {
    addToCart(articleId) {
      this.$emit("add-to-cart", articleId);
    },
    deleteFromCart(articleId) {
      this.$emit("delete-from-cart", articleId);
    },
    addArticle(newArticle) {
      this.$emit("add-article", newArticle);
    },
    deleteArticle(articleId) {
      this.$emit("delete-article", articleId);
    },
    editArticle(article) {
      this.editingArticle.id = article.id;
      this.editingArticle.name = article.name;
      this.editingArticle.description = article.description;
      this.editingArticle.image = article.image;
      this.editingArticle.price = article.price;
    },
    sendEditArticle() {
      this.$emit("update-article", this.editingArticle);
      this.abortEditArticle();
    },
    abortEditArticle() {
      this.editingArticle = {
        id: -1,
        name: "",
        description: "",
        image: "",
        price: 0
      };
    },
    checkInCart(articleId) {
      let bool = false;
      this.panier.articles.forEach(art => {
        if (art.id == articleId) bool = true;
      });
      return bool;
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
  flex: 1;
}

.article-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
}

.article-content {
  flex: 3;
}

.article-title {
  display: flex;
  justify-content: space-between;
}

textarea {
  width: 100%;
}

.sideBut button {
  height: 100%;
  padding: 10px;
}

.botBut {
  width: 100vw;
  display: flex;
  justify-content: center;
}

.botBut button {
  padding: 20px;
}
</style>
