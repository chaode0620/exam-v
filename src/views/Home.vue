<template>
	<div class="home">
		<van-cell-group>
			<van-cell title="随机练习" is-link @click="clickRandom"/>
			<van-cell title="顺序练习" is-link @click="clickOrder"/>
			<van-cell title="模拟考试" is-link />
		</van-cell-group>
	</div>
</template>

<script>
export default {
	name: 'Home',
	methods: {
		clickRandom () {
			const ids = Object.keys(exams)
			const len = ids.length
			for (let i = 0; i < len - 1; i++) {
				const index = parseInt(Math.random() * (len - i))
				const temp = ids[index]
				ids[index] = ids[len - i - 1]
				ids[len - i - 1] = temp
			}
			this.routerExam(ids)
		},
		clickOrder () {
			const ids = Object.keys(exams)
			this.routerExam(ids)
		},
		routerExam (ids) {
			window.sessionStorage.setItem('ids', JSON.stringify(ids))
			this.$router.push('/main')
		}
	}
}
</script>

<style scoped>
	.home { margin: 20px auto; }
</style>
