<template>
	<div class="exam">
		<div class="topic">
			<div class="title tj">
				<strong>{{ ['单选', '多选', '判断'][topic.type-1] }}题：</strong>
				{{ topic.title }}
			</div>
			<div class="answer">
				<van-checkbox-group
					v-model="checkbox"
					v-if="topic.type == 2"
					:disabled="topic.footAnswer ? true : false"
				>
					<van-cell-group>
						<van-cell
							v-for="(item, index) in topic.answers"
							:key="index"
							:title="item"
							clickable
							@click="clickCheckbox(index)"
						>
							<template #right-icon>
								<div class="mask"></div>
								<van-checkbox
									shape="square"
									:checked-color="topic.footAnswer ? topic.isPass ? '#1989fa' : '#ee0a24' : ''"
									:name="index"
								/>
							</template>
						</van-cell>
					</van-cell-group>
				</van-checkbox-group>

				<van-radio-group
					v-model="radio"
					v-else
					:disabled="(topic.footAnswer || topic.footAnswer === 0) ? true : false"
				>
					<van-cell-group>
						<van-cell
							v-for="(item, index) in topic.answers"
							:key="index"
							:title="item"
							clickable
							@click="clickRadio(index)"
						>
							<template #right-icon>
								<div class="mask"></div>
								<van-radio
									:checked-color="(topic.footAnswer || topic.footAnswer === 0) ? topic.isPass ? '#1989fa' : '#ee0a24' : ''"
									:name="index"/>
							</template>
						</van-cell>
					</van-cell-group>
				</van-radio-group>
				<!--提交答案-->
				<van-button class="checkboxSubmit" type="info" @click="clickSubmitCheckbox" v-if="topic.type == 2">确定</van-button>
			</div>
			<br>
			<van-notice-bar
				v-if="(topic.footAnswer || topic.footAnswer === 0)"
				:color="topic.isPass ? '#1989fa' : '#ff0000'"
				:background="topic.isPass ? '#ecf9ff' : '#ffecec'"
				:left-icon="topic.isPass ? 'passed' : 'close'"
			>
				正确答案：{{ topic.correct }}
			</van-notice-bar>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Exam',
	props: ['topic', 'index', 'topicIds', 'topicIndex', 'successObj', 'errorObj', 'successNum', 'errorNum'],
	data: () => ({
		radio: null,
		checkbox: []
	}),
	watch: {
		'topicIndex' (n, o) {
			if (n !== o) this.init()
		}
	},
	mounted () {
		this.init()
	},
	methods: {
		init () {
			this.radio = null
			this.checkbox = []
			if (this.topic.type === 2) {
				this.checkbox = this.topic.footAnswer || []
			} else {
				this.radio = this.topic.footAnswer || null
			}
		},
		clickRadio (index) {
			if (this.topic.footAnswer || this.topic.footAnswer === 0) return

			this.radio = index
			this.$emit('submitAnswer', ['A', 'B', 'C', 'D'][index], this.radio, this.index)
		},

		clickCheckbox (index) {
			if (this.topic.footAnswer) return

			if (this.checkbox.includes(index)) {
				this.checkbox.splice(this.checkbox.indexOf(index), 1)
			} else {
				this.checkbox.push(index)
			}
			this.checkbox.sort()
		},
		clickSubmitCheckbox () {
			if (this.topic.footAnswer) return

			let answer = ''
			if (this.checkbox.length > 0) {
				this.checkbox.sort()
				const answers = this.checkbox.map(item => { return ['A', 'B', 'C', 'D'][item] })
				answer = answers.join('')
			}
			this.$emit('submitAnswer', answer, this.checkbox, this.index)
		}
	}
}
</script>

<style scoped>
	.exam .topic{ padding: 20px; }
	.topic .title { font-size: 14px; line-height: 24px; }
	.topic .answer { margin-top: 50px; }
	.van-cell{ justify-content: space-between; position: relative; }
	.mask{ position: absolute; width: 12%; height: 100%; top: 0; right: 10px; z-index: 10; }
	.van-cell__title, .van-cell__value{
		max-width: 90%;
		word-wrap: break-word;
	}
	.checkboxSubmit{
		display: block;
		width: 100%;
		margin-top: 50px;
		border-radius: 5px;
	}
</style>
