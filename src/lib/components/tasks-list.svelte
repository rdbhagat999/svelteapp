<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { TaskModel } from '$lib/types.ts';

	let {
		taskList,
		toggleTask,
		removeTask
	}: { taskList: TaskModel[]; toggleTask: (id: string) => void; removeTask: (id: string) => void } =
		$props();
</script>

<section>
	{#each taskList as task}
		<article class="task" transition:fade>
			<label>
				<input checked={task?.done} onchange={() => toggleTask(task?.id)} type="checkbox" />
				<span class:done={task?.done}>{task?.title}</span>
			</label>

			<button onclick={() => removeTask(task?.id)} class="outline">Remove</button>
		</article>
	{/each}
</section>

<style>
	.done {
		text-decoration: line-through;
	}

	.task {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
