<script lang="ts">
	let newTask = $state('');

	const { addTask }: { addTask: (title: string) => void } = $props();

	const formSubmitted = (event: SubmitEvent) => {
		event.preventDefault();

		if (newTask) {
			addTask(newTask);
			newTask = '';
		}
	};
</script>

<form onsubmit={formSubmitted}>
	<label>
		Task
		<input name="newTask" bind:value={newTask} />
	</label>
	<div class="button-container">
		<button>Add</button>
	</div>
</form>

<style>
	form {
		margin-bottom: 1rem;
	}
	.button-container {
		display: flex;
		justify-content: end;
	}
</style>
