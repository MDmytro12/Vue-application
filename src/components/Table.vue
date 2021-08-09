<template>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Сумма</th>
                <th>Дата</th>
                <th>Категория</th>
                <th>Тип</th>
                <th>Открыть</th>
            </tr>
        </thead>

        <tbody>
            <tr 
                v-for="(r ,i) in records"
                :key="r.id"
            >
                <td>{{i + 1}}</td>
                <td>{{r.amount | currency("RUB")}}</td>
                <td>{{r.date | date('date')}}</td>
                <td>{{r.categoryName}}</td>
                <td>
                <span class="white-text badge" :class="[r.typeClass]">{{r.typeName}}</span>
                </td>
                <td>
                <button
                 class="btn-small btn" 
                 @click="$router.push('/detail-record/'+r.id)"
                 v-tooltip="'Прочитайте детальну інформацію!'"
                 >
                    <i class="material-icons">open_in_new</i>
                </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name : 'table' ,
    props: {
        records : {
            type: Array ,
            require : true
        }
    }
}
</script>
