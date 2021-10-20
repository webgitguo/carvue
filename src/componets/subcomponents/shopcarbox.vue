<template>
	<div class="mui-numbox" data-numbox-min='1' :data-numbox-max='9'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" :value="initcount"  @change="numboxchanged" ref="numbox"  readonly/>
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted(){
        mui('.mui-numbox').numbox()
	},
	
	methods: {
		numboxchanged(){
            this.$store.commit('updategoodsinfo',
            {
                id:this.goodsid,
                count:this.$refs.numbox.value
            })
        },
        
    },
    props:["initcount","goodsid"]
	
}
</script>

<style lang="scss" scoped>

</style>