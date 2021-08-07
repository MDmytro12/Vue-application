<template>
    <div>
  <div class="page-title">
    <h3>Категории</h3>
  </div>
  <section>
    <div class="row">
        <CategoryCreate />      

        <CategoryEdit />
    </div>
  </section>
</div>
</template>

<script>
import CategoryEdit from '../components/CategoryEdit.vue'
import CategoryCreate from '../components/CategoryCreate.vue'

export default {
  name : 'categories' ,
  components: {
    CategoryEdit , CategoryCreate
  }
}
</script>
