/***
 * 规则：
 * @param { string } title: 标题
 * @param { number } type: 题的类型。 value: 1单选、2多选、3判断
 * @param { array<string> } answers: 可选答案，判断题固定为 ['对', '错']
 * @param { string } correct：正确答案，多选按顺序排列， ABCD
 */

const exams = {
	1: {
		title: '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题',
		type: 1,
		answers: ['A.答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案', 'B', 'C', 'D'],
		correct: 'B'
	},
	2: {
		title: '第二题',
		type: 2,
		answers: ['A', 'B', 'C', 'D'],
		correct: 'ABC'
	},
	3: {
		title: '第三题',
		type: 3,
		answers: ['对', '错'],
		correct: 'A'
	},
	4: {
		title: '第四题, 这是复选题文章这是复选题文章这是复选题文章这是复选题文章这是复选题文章这是复选题文章这是复选题文章这是复选题文章这是复选题文章这是复选题文章这是复选题文章',
		type: 4,
		children: [{
			title: '第四题 第一小题',
			type: 3,
			answers: ['对', '错'],
			correct: 'A'
		}, {
			title: '第四题 第二小题',
			type: 2,
			answers: ['A', 'B', 'C', 'D'],
			correct: 'ABC'
		}]
	},
	5: {
		title: '第五题',
		type: 3,
		answers: ['对', '错'],
		correct: 'A'
	}
}

export default exams
