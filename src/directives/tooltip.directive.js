export default {
    bind(el , {value}){
        const pos = ['top' , 'bottom' ]
        const randomPosition = Math.floor(Math.random() * 2)
        M.Tooltip.init(el , {html : value , position : pos[ randomPosition === 0 ? randomPosition : randomPosition - 1 ]})
    } ,
    unbind(el){
        const tooltip = M.Tooltip.getInstance(el)

        if(tooltip && tooltip.destroy){
            tooltip.destroy()
        }
    }
}
