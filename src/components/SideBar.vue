<template>
    <ul class="sidenav app-sidenav " style="width: 265px;padding-top: 70px;" :class="{ open : !value }">

        <router-link
            v-for="link in links"
            :key="link.url"
            tag='li'
            active-class="active"
            :to="link.url"
            :exact="link.exact"
        >   
            <a href="#" class="waves-effect waves-orange pointer">{{ link.title}}</a>
        </router-link>  
    </ul>
</template>

<script>
import localizeFilter from '../filters/localize.filter'

    export default {
        props:[
            "value"
        ],
        data: () => ({
            links:[
                {title : localizeFilter("SB_bill") , url : '/' , exact : true},
                {title : localizeFilter("SB_history") , url : '/history'},
                {title : localizeFilter("SB_planning") , url : '/planning'},
                {title :  localizeFilter("SB_newRecord"), url : '/record'},
                {title : localizeFilter("SB_category"), url : '/categories'}
            ]
        })
    }

</script>
