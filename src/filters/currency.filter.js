export default function currencyFilter(value , currency = "RUB") {
    return new Intl.NumberFormat( 'ua-UA' , { style : 'currency' , currency}).format(value)
}
