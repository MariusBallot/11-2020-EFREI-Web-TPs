const Home = window.httpVueLoader('./components/Home.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/panier', component: Panier },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {

    articles: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      articles: []
    }
  },
  async mounted() {
    const res = await axios.get('/api/articles')
    this.articles = res.data
    const res2 = await axios.get('/api/panier')
    this.panier = res2.data
  },
  methods: {
    async addToCart(articleId) {
      const res2 = await axios.post('/api/panier', {
        id: articleId,
        quantity: 1
      })
      this.panier.articles.push(res2.data)
    },
    async deleteFromCart(articleId) {
      const res2 = await axios.delete(`/api/panier/${articleId}`)

      const index = this.panier.articles.findIndex(a => a.id === articleId)
      this.panier.articles.splice(index, 1)
    },
    async addArticle(article) {
      const res = await axios.post('/api/article', article)
      this.articles.push(res.data)
    },
    async updateArticle(newArticle) {
      await axios.put('/api/article/' + newArticle.id, newArticle)
      const article = this.articles.find(a => a.id === newArticle.id)
      article.name = newArticle.name
      article.description = newArticle.description
      article.image = newArticle.image
      article.price = newArticle.price
    },

    async updateCartArticle(uArticle) {
      await axios.put(`/api/panier/${uArticle.id}`, uArticle)
      // const article = this.panier.articles.find(a => a.id === newArticle.id)
      // article.quantity = quantity
    },

    async deleteArticle(articleId) {
      await axios.delete('/api/article/' + articleId)
      const index = this.articles.findIndex(a => a.id === articleId)
      this.articles.splice(index, 1)
    },

    async submitUser(user) {
      await axios.post('/api/register/', user)
    },

    async logUser(user) {
      const res = await axios.post('/api/login/', user)
      console.log(res.data)
      if (res.data.logedIn) {
        router.push('/')
      }
    },
    async onPay(panier) {
      const res = await axios.post('/api/panier/pay/')
      console.log(res.data)
      if (res.data.accepted)
        this.panier.articles = []
      else
        router.push('/login')
    },
  }
})
