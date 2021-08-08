<template>
    <div class='app-loader' style="padding-top: 100px;" >
        <div class="preloader-wrapper big active">
            <div class="spinner-layer" :class="color">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'loader',
    computed: {
        color() {
            const colors = [ 'spinner-red-only' , 'spinner-green-only' , 'spinner-blue-only' , 'spinner-yellow-only' , 'spinner-black-only' ]

            return colors[Math.floor( 5 * Math.random() )]
        }
    }
}

</script>
