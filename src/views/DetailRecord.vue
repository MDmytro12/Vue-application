<template>
    <div>


    <Loader v-if="loading" />
    
  <div v-else>
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">Історія</router-link>
      <a class="breadcrumb">
        {{ record.typeText}}
      </a>
    </div>

    <div class="row">
      <div class="col s12 m6">
        <div class="card " :class="record.typeClass">
          <div class="card-content white-text">
            <p><strong>Опис :</strong> {{record.description}}</p>
            <p><strong>Сума :</strong> {{record.amount}}</p>
            <p><strong>Категорія </strong> {{record.categoryName}}</p>

            <small>{{record.date | date('datetime')}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</div>
</template>

<script>
export default {
  name : 'record-detail',
  data: () => ({
    loading : true ,
    record: null
  }),
  async mounted(){
    const id = this.$route.params.id
    const record = await this.$store.dispatch('getRecordById' , id)
    const category = await this.$store.dispatch('getCategoryById' , record.categoryId)
    
    this.record = {
      ...record ,
      categoryName : category.title ,
      typeClass : record.type === 'outcome' ? 'red' : 'green',
      typeText : record.type === 'outcome' ? 'Витрати' : 'Дохід'
    }

    this.loading = false
  }
}
</script>
