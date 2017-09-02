import client from './apolloconf'
import { getProductsQuery, createProduct, deleteProduct } from './documents'

let app = new Vue({
  el: '#app',
  data: {
    productName: '',
    productPrice: '',
    productCategory: '',
    products: [],
  },
  methods: {
    getProducts: function(){
      client.query(getProductsQuery).then(gqlResult => {
        const {errors, data} = gqlResult
        this.products = data.getProducts
      }).catch(err => {
        console.log(new Error(err))
      })
    },
    addProduct: function(){
      const variables = {
        name: this.productName,
        price: parseInt(this.productPrice),
        category: this.productCategory.split(','),
      }
      client.mutate(createProduct(variables))
        .then( gqlResult => {
          this.getProducts()
        }).catch(err => {
          console.error(err)
        })
    },
    deleteProduct: function(productID) {
      const variables = {
        id: productID
      }
      client.mutate(deleteProduct(variables))
        .then( gqlResult => {
          this.getProducts()
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
})

app.getProducts()
