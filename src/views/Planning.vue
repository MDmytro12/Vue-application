<template>
  <div>
    <div class="page-title">
      <h3>{{"P_planning" | locale}}</h3>
      <h4>{{ info.bill | currency("RUB") }}</h4>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">{{"R_emptyList" | locale}} <router-link to="/categories">{{"R_addNewCategory" | locale}}</router-link></p>

    <section v-else>
      <div
        v-for="c of categories"
        :key="c.id"
      >
        <p>
          <strong>{{c.title}}</strong>
          {{c.spend | currency}} з {{ c.limit }}
        </p>
        <div class="progress"  v-tooltip="c.tooltipValue">
          <div
              class="determinate"
              :class="[c.progressColor]"
              :style="{ width : c.progressPrecent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>    
import {mapGetters} from 'vuex'
import currencyFilter from '../filters/currency.filter'
import localeFilter from '../filters/localize.filter'

  export default {
      name : 'planning' ,
      data : ()=> ({
        loading : true,
        records : [] , 
        categories: [] 
      }),
      async mounted(){
        const records = await this.$store.dispatch('getRecords')
        const categories = await this.$store.dispatch('fetchCategories') || []
    
        this.categories = categories.map( cat => {
          
          const spend = records.
            filter( c => c.categoryId === cat.id).
            filter( r => r.type === 'outcome').
            reduce(( total , record ) => {
              return total += +record.amount
            } , 0)

            const percent = 100*spend / cat.limit
            const progressPrecent = percent > 100 ? 100 : percent
            const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

            const tooltip = cat.limit - spend
    
            const tooltipValue = tooltip < 0 ? localeFilter("P_exceed") + `${currencyFilter(Math.abs(tooltip))}!` : localeFilter("P_left")+ `${currencyFilter(tooltip)}!`

            return {
              ...cat ,
              progressPrecent ,
              progressColor,
              spend,
              tooltipValue
            }
        })

        this.loading = false
      } ,
      computed:{
        ...mapGetters(['info'])
      }
  }

</script>
