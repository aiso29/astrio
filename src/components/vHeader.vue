<template>
    <header>
      <div class="logo">
        <router-link to="/"><img src="../assets/images/logo.png" alt=""></router-link>
      </div>
      <div class="basket">
        <router-link to="/basket">
          <img class="basket__img" src="../assets/images/basket.svg" alt="">
          <p class="basket__count">{{ this.basket.length || 0 }}</p>
        </router-link>
        
      </div>
    </header>
</template>

<script>
import { bus } from '../main';

export default {
  name: 'vHeader',
  data() {
    return {
      basket: 0
    }
  },
  created() {
    this.putToBasket();
    bus.$on('add-to-basket', data => {
      this.basket = data;
    });
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
    }
  }
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #000;
}

.basket {
  max-height: 34px;
  position: relative;
}

.basket__count {
  position: absolute;
  top: 0;
  right: 0;
  border: 2px solid #000;
  border-radius: 10px;
  background: #FFF;
  padding: 0 2px;
}

.basket__img {
  height: 34px;
}
</style>
