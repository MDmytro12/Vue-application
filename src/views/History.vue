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
                :records="records"
             />

        </section>
    </div>
</template>

<script>
import Table from '../components/Table.vue'

export default {
    name: 'history',
    data: () => ({
        loading : true,
        records: []
    }),
    components : {
        Table
    },
    async mounted() {
       const records = await this.$store.dispatch('getRecords')
       const categories = await this.$store.dispatch('fetchCategories')
       this.records = records.map( record => {
           return {
               ...record ,
               typeClass: record.type === "outcome" ? "red" : 'green',
               typeName: record.type === "outcome" ? "Витрати" : "Дохід" ,
               categoryName: categories.filter( c => c.id === record.categoryId ).title 
           }
       } ) 
    
       this.loading = false
    },
}
</script>

