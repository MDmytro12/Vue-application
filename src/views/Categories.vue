<template>
    <div>
  <div class="page-title">
    <h3>{{'C_categories' | locale}}</h3>
  </div>
  <section>

    <Loader v-if="loading"/>

    <div class="row" v-else>
        <CategoryCreate 
          @addCategory="addNewCategory"
        />      

        <CategoryEdit 
        v-bind:categories="categories"
        v-on:update="updateCategory"
        v-bind:key="categories.length + updateCounter"
        v-if="categories.length"
        />
        <p class='center' v-else>{{"C_notCategory" | locale}}</p>
    </div>
  </section>
</div>
</template>

<script>
import CategoryEdit from '../components/CategoryEdit.vue'
import CategoryCreate from '../components/CategoryCreate.vue'
import Loader from '../components/Loader.vue'

export default {
  name : 'categories' ,
  components: {
    CategoryEdit , CategoryCreate,
    Loader
  },
  metaInfo(){
    return {
      title : this.$title("SB_category")
    }
  },
  data: () => ({
    categories: [] ,
    loading: true ,
    updateCounter : 0
  }),
  async mounted(){
    try{
      const cat = await this.$store.dispatch('fetchCategories')
      this.loading = false
      
      this.categories = cat  
    }catch(e) {}
  },
  methods:{
    addNewCategory(category){
      this.categories.push(category)
    } ,
    updateCategory({id , title , limit}){
      const i = this.categories.findIndex( c => c.id === id )
      this.categories[i].title = title
      this.categories[i].limit = limit
      this.updateCounter++
    }
  }
}
</script>
