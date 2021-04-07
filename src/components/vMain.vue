<template>
  <div>
    <vHeader></vHeader>
    <div class="mainContainer">
      <div class="brandsBlock">
        <p class="brand" v-on:click="filterId = ''">All brands</p>
        <p class="brand" v-for="brand in brands" v-bind:key="brand.id" @click="filterId = brand.id">{{ brand.title }}</p>
      </div>
      <div class="productsBlock">
        <h1 class="header">Catalog</h1>
        <div class="productCards">
          <div class="productCard" v-for="product in filteredProducts" v-bind:key="product.id" @click="addToBasket(product)">
            <div class="productCard__img">
              <img :src="require(`../assets${ product.image }`)" class="product__img" alt="">
            </div>
            <div class="productCard__text">
              <p>{{ product.title }}</p>
              <p>{{ product.brand }}</p>
              <p class="price">{{ product.regular_price.value }}</p>
            </div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>

import vHeader from '@/components/vHeader.vue';
import brands from '../../static/brands.json';
import products from '../../static/products.json';
import { bus } from '../main';

export default {
  name: 'vMain',
  components: {
    vHeader
  },
  data() {
    return {
      brands,
      products,
      filterId: '',
      basket: [],
      flag: false
    }
  },
  mounted(){
    if (localStorage.getItem('basket')) {
      try {
        this.basket = JSON.parse(localStorage.getItem('basket'));
      } catch(e) {
        localStorage.removeItem('basket');
      }
    }
  },
  methods: {
    putToBasket() {
      if (localStorage.getItem('basket')) {
        try {
          this.basket = JSON.parse(localStorage.getItem('basket'));
        } catch(e) {
          localStorage.removeItem('basket');
        }
      }
      bus.$emit('add-to-basket', this.basket);
    },
    addToBasket(product) {
      this.flag = false;
      let id = product;
      for(var i = 0; i < this.basket.length; i++) {
        if (this.basket[i].id == id.id) { 
          this.flag = true;
        }
      }
      if (!this.flag) {
          this.putToBasket();
          this.basket.push(id);
          this.saveBasket();
      }
    },
    removeFromBasket(product) {
      this.basket.splice(product, 1);
      this.saveBasket();
    },
    saveBasket() {
      const parsed = JSON.stringify(this.basket);
      localStorage.setItem('basket', parsed);
    }
  },
  created() {
    this.putToBasket();
  },
  computed: {
    filteredProducts: function() {
      var id = this.filterId;
      return this.products.filter(function(product) {
        if (id==='') return true;
        else return product.brand == id;
      });
    }
  }
}
</script>

<style>
.mainContainer {
  display: flex;
  padding: 20px;
}

.brandsBlock {
  flex: 10%;
  border-right: 1px solid #000;
  text-align: center;
  padding-right: 20px;
}

.productsBlock {
  flex: 90%;
  padding-left: 20px;
}

.productCards {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.productCard {
  flex: 0 0 calc(25% - 20px);
  margin: 10px;
  border: 2px solid rgba(0, 0, 0, .2);
  border-radius: 10px;
  transition: .2s ease;
}

.productCard:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.productCard__img {
  text-align: center;
}

.productCard__text {
  padding: 0 20px 10px 20px;
}

.product__img {
  width: 100%;
}

.price::before {
  content:"$";
}

.brand {
  width: fit-content;
  margin: 10px auto;
  transition: .2s ease;
}

.brand:hover {
  border-bottom: 1px solid #000;
  transform: scale(1.05);
  cursor: pointer;
}

.header {
  margin: 10px 0;
  font-size: 24px;
}

@media screen and (min-width: 1025px) {
  .brand {
    font-size: 20px;
  }
  .product__img {
    width: 80%;
  }
}

@media screen and (min-width: 1441px) {
  .brand {
    font-size: 24px;
  }
  .product__img {
    width: 90%;
  }
}

@media screen and (min-width: 1921px) {
  .productCard {
    flex: 0 0 calc(20% - 20px);
  }
}

@media screen and (max-width: 1024px) {
  .product__img {
    width: 70%;
  }
}

@media screen and (max-width: 768px) {
  .productCard {
    flex: 0 0 calc(33% - 20px);
  }
}

@media screen and (max-width: 600px) {
  .productCard {
    flex: 0 0 calc(50% - 20px);
  }
}

@media screen and (max-width: 425px) {
  .productCard {
    flex: 0 0 calc(100% - 20px);
  }
}
</style>