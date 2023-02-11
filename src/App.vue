<script setup>
	import { ref } from 'vue';
	const value = ref('');
	const List = ref([]);
	const data = ref();
	const scrollView = ref(null);
	const send = async () => {
		// 右边为1
		List.value.push({
			id: 1,
			value: value.value,
		});

		try {
			const res = await fetch('http://139.224.67.36:1234/openai', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					question: value.value,
				}),
			});
			const data = await res.json();
			// value.value = '';
			List.value.push({
				id: 2,
				value: data.bot,
			});
			// scrollView.value.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

			console.log('===========', data);
		} catch {
			console.log(data);
		}
	};
</script>

<template>
	<div class="main">
		<div class="box" v-for="(ele, index) in List" :key="index">
			<div class="left" v-if="ele.id === 2">
				<img class="avator" src="../public/chatGPT.png" alt="" srcset="" />
				<span class="msg">{{ ele.value }}</span>
			</div>
			<div class="left right" v-if="ele.id === 1">
				<span>{{ ele.value }}</span>
			</div>

			<!-- <div v-show="showData">{{ data }}</div> -->
		</div>
	</div>
	<div class="input">
		<input type="text" v-model="value" />
		<button @click="send">提问</button>
	</div>
</template>

<style scoped lang="less">
	.box {
		margin-bottom: 100px;
	}
	span {
		width: fit-content;
		height: fit-content;
		background-color: #f7f7f8;
		padding: 20px;
		border-radius: 10px;
	}
	.left {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 30px;
		padding: 20px;
	}
	.right {
		justify-content: flex-start;
		flex-direction: row-reverse;
	}
	.avator {
		margin-right: 20px;
		// margin-left: 40px;
		width: 50px;
		height: 50px;
		border-radius: 30px;
	}
	.input {
		display: flex;
		justify-content: space-between;
		position: fixed;
		width: 100%;
		height: 100px;
		font-size: 30px;
		border-radius: 15px;
		bottom: 0;
		input {
			width: 80%;
		}
		button {
			width: 20%;
		}
	}
</style>
