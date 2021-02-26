<template>
	<div class="main">
		<div class="pt pb pl pr" v-if="topic.type == 4">
			<div class="title tj">
				<strong>复选题：</strong>
				{{ topic.title }}
			</div>
			<exam
				v-for="(item, index) in topic.children"
				:key="index"
				:topic="item"
				:index="index"
				:topicIds="topicIds"
				:topicIndex="topicIndex"
				:successObj="successObj"
				:errorObj="errorObj"
				:successNum="successNum"
				:errorNum="errorNum"
				@submitAnswer="submitAnswer"
			></exam>
		</div>
		<exam
			v-else
			:topic="topic"
			:topicIds="topicIds"
			:topicIndex="topicIndex"
			:successObj="successObj"
			:errorObj="errorObj"
			:successNum="successNum"
			:errorNum="errorNum"
			@submitAnswer="submitAnswer"
		></exam>
		<van-nav-bar :border="false" style="background-color: transparent;"/>
		<!--底部栏-->
		<van-nav-bar
			class="footer_bar"
			fixed
			:border="false"
			left-text="上一题"
			right-text="下一题"
			@click-left="clickPrev"
			@click-right="clickNext"
		>
			<template #title>
				<span class="success">对：{{ successNum }}</span>
				<span class="error pl">错：{{ errorNum }}</span>
			</template>
		</van-nav-bar>
	</div>
</template>

<script>
import Exam from './Exam'
import { Toast } from 'vant'
export default {
	name: 'Main',
	components: { Exam },
	data: () => ({
		exams: null,
		topicIds: null,
		topicIndex: 0,
		topic: null,
		successObj: {},
		successNum: 0,
		errorObj: {},
		errorNum: 0
	}),
	created () {
		this.exams = exams
		const ids = window.sessionStorage.getItem('ids')
		if (!ids) {
			const _this = this
			Toast('请选择练习类型')
			setTimeout(() => {
				_this.$router.replace('/')
			}, 1000)
		} else {
			this.topicIds = JSON.parse(ids)
			this.loadTopic(this.topicIndex)
		}
	},
	methods: {
		loadTopic (index) {
			const id = this.topicIds[index]
			if (this.successObj[id]) {
				this.topic = this.successObj[id]
			} else if (this.errorObj[id]) {
				this.topic = this.errorObj[id]
			} else {
				this.topic = this.exams[id]
			}
		},
		submitAnswer (answer, footAnswer, index) {
			if (this.topic.type === 4) {
				this.topic.children[index].footAnswer = footAnswer
				this.topic.children[index].isPass = answer === this.topic.children[index].correct
				const oldArr = this.topic.children.filter(item => { return item.footAnswer || item.footAnswer === 0 })

				if (oldArr.length === this.topic.children.length) {
					const passArr = this.topic.children.filter(item => { return (item.footAnswer || item.footAnswer === 0) && !item.isPass })

					if (passArr.length > 0) {
						this.errorObj[this.topicIds[this.topicIndex]] = this.topic
						this.errorNum = Object.keys(this.errorObj).length
					} else {
						this.successObj[this.topicIds[this.topicIndex]] = this.topic
						this.successNum = Object.keys(this.successObj).length
					}
				}
			} else {
				this.topic.footAnswer = footAnswer
				if (answer === this.topic.correct) {
					this.topic.isPass = true
					this.successObj[this.topicIds[this.topicIndex]] = this.topic
					this.successNum = Object.keys(this.successObj).length
				} else {
					this.topic.isPass = false
					this.errorObj[this.topicIds[this.topicIndex]] = this.topic
					this.errorNum = Object.keys(this.errorObj).length
				}
			}
		},
		clickPrev () {
			if (this.topicIndex > 0) {
				this.topicIndex --
				this.loadTopic(this.topicIndex)
			}
		},
		clickNext () {
			if (this.topicIndex < this.topicIds.length - 1) {
				this.topicIndex ++
				this.loadTopic(this.topicIndex)
			}
		}
	}
}
</script>

<style scoped>
	.main { background-color:#FFF; }
	.title { font-size: 14px; line-height: 24px; }
	.footer_bar { top: inherit; bottom: 0; }
</style>
