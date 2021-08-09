<template>
    <div>
        <div class="page-title">
            <h3>{{"H_historyRecord" | locale}}</h3>
        </div>

        <div class="history-chart">
            <canvas ref="canvas" ></canvas>
        </div>

        <Loader v-if="loading" />

        <p class="center" v-else-if="!records.length">{{"H_emptyList" | locale}} <router-link to='/record'>{{"H_createNew" | locale }}</router-link></p>

        <section v-else>
            
            <Table
                :records="items"
             />

             <Paginate 
                v-model="page"
                :page-count="pageCount"
                :click-handler="onPageHandler"
                :prev-text="'H_back' | locale"
                :next-text="'H_forward' | locale"
                :container-class="'pagination center'"
                :page-class="'waves-effect'"
             />

        </section>
    </div>
</template>

<script>
import Table from '../components/Table.vue'
import paginationMixin from "../mixins/paginations.mixin"
import {Pie} from 'vue-chartjs'
import localizeFilter from '../filters/localize.filter'

export default {
    name: 'history',
    data: () => ({
        loading : true,
        records: []
    }),
    metaInfo(){
        return {
            title : this.$title("SB_history")
        }
    },
    extends: Pie ,
    mixins: [paginationMixin ] ,
    components : {
        Table
    },
    async mounted() {
        const categories = await this.$store.dispatch('fetchCategories')
        this.records = (await this.$store.dispatch('getRecords')).map( record => {
           return {
               ...record ,
               typeClass: record.type === "outcome" ? "red" : 'green',
               typeName: record.type === "outcome" ? localizeFilter("R_outcome") : localizeFilter("R_income") ,
               categoryName: categories.filter( category => {
                   return category.id.trim() === record.categoryId.trim()
               } )[0].title
           }
       })
       
       this.setup(categories)
    
       this.loading = false
    } , 
    methods : {
        setup(categories){
            this.setupPagination( this.records )

            this.renderChart(
            {
                labels: categories.map( c => c.title ) ,
                datasets: [{
                    label: localizeFilter("H_outcomeByCategories"),
                    data: categories.map( c => {
                        return this.records.reduce(( total , record ) => {
                            if ( c.id === record.categoryId  && record.type === 'outcome') {
                                total += +record.amount
                            }
                            return total
                        }  , 0)
                    } ) ,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }   
            )
        }
    }
}
</script>


