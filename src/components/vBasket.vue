<template>
  <div class="container">
    <header class="basket__header">
      <div class="logo">
        <router-link to="/"><img src="../assets/images/logo.png" alt=""></router-link>
      </div>
    </header>
    <div class="mainContent">
      <h1>Shopping Cart</h1>
      <div class="row" v-for="item in content" v-bind:key="item.id">
        <div class="column__img">
          <img class="position__img" :src="require(`../assets${ item.image }`)">
        </div>
        <div class="column__title">
          <p class="position__title">{{ item.brand }}/{{ item.title }}</p>
        </div>
        <div class="column__price">
          <p class="position__price">{{ item.regular_price.value }}</p>
        </div>
        <div class="column__sum" v-for="it in countArr" v-bind:key="it.id">
          <div class="column__qty">
            <button class="button__qty" v-if="item.id == it.id" @click="removeCount(item.id)">-</button>
            <label class="qty" type="text" name="qty" v-if="item.id == it.id">{{ it.count }}</label>
            <button class="button__qty" v-if="item.id == it.id" @click="addCount(item.id)">+</button>
          </div>
          <div class="column__total" v-if="item.id == it.id">
            <p class="position__total">{{ it.sum }}</p>
          </div>
        </div>
        <div class="column__delete">
          <button class="button__delete" @click="removeFromBasket(item)">
            <img class="delete-basket__img" src="../assets/images/delete-basket.svg" alt="">
          </button>
        </div>
      </div>
      <div class="total">
        <p class="total__text">Subtotal: ${{ total }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
	name: 'vBasket',
	data() {
		return {
			content: [],
			countArr: [],
			total: 0
		}
	},
	methods: {
		countTotal() {
			this.total = 0
			for (let j = 0; j < this.countArr.length; j++) {
				this.total = Math.round((this.total + this.countArr[j].sum)*100)/100
			}
		},
		addCount(id) {
			for (let j = 0; j < this.countArr.length; j++) {
				if (id == this.countArr[j].id) {
					this.countArr[j].count++
					this.countArr[j].sum = Math.round((this.countArr[j].sum + this.countArr[j].price)*100)/100
					this.countTotal();
					return
				}
			}
		},
		removeCount(id) {
			for (let j = 0; j < this.countArr.length; j++) {
				if (id == this.countArr[j].id && this.countArr[j].count > 1) {
					this.countArr[j].count--
					this.countArr[j].sum = Math.round((this.countArr[j].sum - this.countArr[j].price)*100)/100
					this.countTotal();
					return
				}
			}
		},
    putToBasket() {
      if (localStorage.getItem('basket')) {
        try {
          this.content = JSON.parse(localStorage.getItem('basket'));
          
        } catch(e) {
          localStorage.removeItem('basket');
        }
        this.fillCountArr()
      }
    },
    fillCountArr() {
      this.countArr = []
      for (let j = 0; j < this.content.length; j++) {
        this.countArr.push({id: this.content[j].id, count: 1, price: this.content[j].regular_price.value, sum: this.content[j].regular_price.value})
      }
      this.countTotal()
    },
    removeFromBasket(item) {
      for (let i = 0; i < this.content.length; i++) {
        if (this.content[i].id == item.id) { this.content.splice(i, 1); }
      }
      this.saveBasket()
      this.fillCountArr()
    },
    saveBasket() {
      const parsed = JSON.stringify(this.content);
      localStorage.setItem('basket', parsed);
    }
	},
	created() {
		this.putToBasket()
		this.countTotal()
  }
}
</script>

<style>
.basket__header {
	text-align: center;
  padding: 20px;
  border-bottom: 2px solid #000;
	margin: 0 20px;
}

.row {
	display: flex;
	border-bottom: 1px solid #000;
	border-radius: 10px;
	margin: 10px 20px;
}

.column__img {
	flex: 20%;
	width: 20%;
	display: flex;
  align-items: center;
}

.position__img {
	width: 100%;
}

.column__title {
	flex: 30%;
	width: 30%;
	align-items: center;
	display: flex;
}

.position__title {
	font-size: 20px;
}

.column__price {
	flex: 10%;
	width: 10%;
	text-align: center;
	display: flex;
	align-items: center;
}

.position__price {
	width: fit-content;
	margin: 0 auto;
	font-size: 20px;
}

.position__price:before {
	content: '$';
}

.column__sum {
	display: flex;
	text-align: center;
	align-items: center;
	font-size: 20px;
}

.position__total:before {
	content: '$';
}

.column__delete {
	flex: 10%;
	width: 10%;
	text-align: center;
	display: flex;
	align-items: center;
}

.button__qty {
	width: 40px;
	height: 40px;
	font-size: 20px;
	background: inherit;
	transition: .2s ease;
}

.button__qty:hover {
	transform: scale(1.1);
}

.delete-basket__img {
	width: 30px;
}

.button__delete {
	background: inherit;
	margin: 0 auto;
	transition: .2s ease;
}

.button__delete:hover {
	transform: scale(1.1);
}

h1 {
	margin: 10px 20px;
	font-size: 24px;
}

.total {
	text-align: right;
	font-size: 30px;
	font-weight: bold;
	margin: 10px 20px;
}

.qty {
	display: flex;
  align-items: center;
}

.column__qty {
	display: flex;
}

@media screen and (min-width: 1025px) {
  .position__img {
    width: 80%;
  }
}

@media screen and (min-width: 1441px) {
  .position__img {
    width: 90%;
  }
}

@media screen and (min-width: 1921px) {
}

@media screen and (max-width: 1024px) {
  .position__img {
    width: 80%;
  }
}

@media screen and (max-width: 768px) {
}

@media screen and (max-width: 600px) {
	.position__title,
	.position__price,
	.button__qty,
	.column__sum {
		font-size: 14px;
	}

	.total {
		font-size: 24px;
	}

	.button__delete {
		width: 20px;
		height: 20px;
	}

	.delete-basket__img {
		width: 20px;
	}
}

@media screen and (max-width: 500px) {
	.row {
		margin: 10px 0;
	}
}
</style>