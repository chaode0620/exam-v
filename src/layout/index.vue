<template>
	<div>
		<van-nav-bar
			:title="$route.meta.title"
		/>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'layout',
	methods: {
		init () {}
	}
}
</script>

<style scoped>

</style>
