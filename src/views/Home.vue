<template>
    <div>
  <div class="page-title">
    <h3>{{"SB_bill" | locale}}</h3>

    <button class="btn waves-effect waves-light btn-small" @click="refresh">
      <i class="material-icons">refresh</i>
    </button>
  </div>

  <Loader  v-if="loading"/>

  <div v-else class="row">
    
    <HomeBill 
      v-bind:rates="currency.rates"
    />

    <HomeCurrency 
      v-bind:rates="currency.rates"
      v-bind:date="currency.date"
      />

  </div>
</div>

</template>
<script>
import HomeCurrency from '../components/HomeCurrency'
import HomeBill from '../components/HomeBill'

export default {
  name: 'home',
  components: {
    HomeCurrency , HomeBill
  },
  data: () => ({
    loading: true,
    curency: null
  }) ,
  async mounted(){
    this.currency = await this.$store.dispatch('getCurrencyInfo')
    this.loading = false
  } ,
  methods: {
    async refresh() {
      this.loading = true
      this.curency = await this.$store.dispatch('getCurrencyInfo')
      this.loading = false
    }
  }
}
</script>
