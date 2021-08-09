<template>
    <div>


    <Loader v-if="loading" />
    
  <div v-else>
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">{{"SB_history" | locale}}</router-link>
      <a class="breadcrumb">
        {{ record.typeText}}
      </a>
    </div>

    <div class="row">
      <div class="col s12 m6">
        <div class="card " :class="record.typeClass">
          <div class="card-content white-text">
            <p><strong>{{"R_description" | locale}} :</strong> {{record.description}}</p>
            <p><strong>{{"R_amount" | locale}} :</strong> {{record.amount}}</p>
            <p><strong>{{"SB_category" | locale}} </strong> {{record.categoryName}}</p>

            <small>{{record.date | date('datetime')}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</div>
</template>

<script>
import localizeFilter from '../filters/localize.filter'

export default {
  name : 'record-detail',
  data: () => ({
    loading : true ,
    record: null
  }),
  metaInfo(){
    return {
      title : this.$title("d")
    }
  },
  async mounted(){
    const id = this.$route.params.id
    const record = await this.$store.dispatch('getRecordById' , id)
    const category = await this.$store.dispatch('getCategoryById' , record.categoryId)
    
    this.record = {
      ...record ,
      categoryName : category.title ,
      typeClass : record.type === 'outcome' ? 'red' : 'green',
      typeText : record.type === 'outcome' ? localizeFilter("R_outcome") : localizeFilter("R_income") 
    }

    this.loading = false
  }
}
</script>
