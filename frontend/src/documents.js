import tag from 'graphql-tag'

export const getProductsQuery = {
  query: tag`
    query {
      getProducts {
        _id
        name
        price
        category
      }
    }
  `,
  forceFetch: true
}

export const createProduct = (variables) => {
  return {
    mutation: tag`
      mutation addProduct($name: String, $price: Int, $category: [String]) {
        addProduct(
          name: $name,
          price: $price,
          category: $category
        ) {
          _id
          name
          price
          category
        }
      }
    `,
    variables
  }
}

export const deleteProduct = (variables) => {
  return {
    mutation: tag`
      mutation ($id: String!) {
        deleteProduct(id: $id) {
          _id
          name
          price
          category
        }
      }
    `,
    variables
  }
}
