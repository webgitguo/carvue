<template>
	<div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1"  @change="numboxchanged" ref="numbox" />
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted(){
        mui('.mui-numbox').numbox()
	},
	props:['max'],
	methods: {
		numboxchanged(){
			// console.log(this.$refs.numbox.value)
			this.$emit('func',parseInt(this.$refs.numbox.value))
		}
	},
	watch:{
		max:function(newvalue,oldvalue) {
			 mui('.mui-numbox').numbox().setOption('max',newvalue)
		}
	}
}
</script>

<style scoped>

</style>