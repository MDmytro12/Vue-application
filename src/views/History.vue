<template>
    <div>
        <div class="page-title">
            <h3>История записей</h3>
        </div>

        <div class="history-chart">
            <canvas></canvas>
        </div>

        <Loader v-if="loading" />

        <p class="center" v-else-if="!records.length">Поки що список записів пустий! <router-link to='/record'>Створіть новий запис!</router-link></p>

        <section v-else>
            
            <Table
                :records="items"
             />

             <Paginate 
                v-model="page"
                :page-count="pageCount"
                :click-handler="onPageHandler"
                :prev-text="'Назад'"
                :next-text="'Вперед'"
                :container-class="'pagination center'"
                :page-class="'waves-effect'"
             />

        </section>
    </div>
</template>

<script>
import Table from '../components/Table.vue'
import paginationMixin from "../mixins/paginations.mixin"

export default {
    name: 'history',
    data: () => ({
        loading : true,
        records: []
    }),
    mixins: [paginationMixin] ,
    components : {
        Table
    },
    async mounted() {
        const categories = await this.$store.dispatch('fetchCategories')
        const records = (await this.$store.dispatch('getRecords')).map( record => {
           return {
               ...record ,
               typeClass: record.type === "outcome" ? "red" : 'green',
               typeName: record.type === "outcome" ? "Витрати" : "Дохід" ,
               categoryName: categories.filter( category => {
                   return category.id.trim() === record.categoryId.trim()
               } )[0].title
           }
       })
       this.records = records
       this.setupPagination( this.records )
    
       this.loading = false
    }
}
</script>

