export default function dateFilter(value , format = 'date') {
    
    const options = {}

    if(format.includes('date')){
        options.year = '2-digit'
        options.month = 'long'
        options.day = 'numeric'
    }

    if(format.includes('time')){
        options.hour = '2-digit'
        options.second = '2-digit'
        options.minute = '2-digit'
    }

    return new Intl.DateTimeFormat('uk-UK' , options).format(new Date(value))
}
