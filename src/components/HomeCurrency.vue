<template>
    <div class="col s12 m6 l8">
      <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
          <div class="card-header">
            <span class="card-title">{{"HC_currencyCourse" | locale}}</span>
          </div>
          <table>
            <thead>
            <tr>
              <th>{{"HB_currency" | locale}}</th>
              <th>{{"HB_course" | locale}}</th>
              <th>{{"T_date" | locale}}</th>
            </tr>
            </thead>

            <tbody>
            <tr 
                v-for="cur of currencies"
                v-bind:key="cur"
            >
              <td>{{ cur }}</td>
              <td>{{ rates[cur].toFixed(3) }}</td>
              <td>{{date}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>

export default {
    name: 'home-currency',
    props: ['rates' , 'date'],
    data: () => ({
        currencies : ["EUR" , "USD" , "RUB"]
    })
}

</script>
