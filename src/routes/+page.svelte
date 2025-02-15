<script lang="ts">
	import TasksForm from '$lib/components/tasks-form.svelte';
	import TasksList from '$lib/components/tasks-list.svelte';
	import type { TaskFilter, TaskModel } from '$lib/types.ts';

	let appTitle = 'Tasks App';

	let taskList: TaskModel[] = $state<TaskModel[]>([
		{
			id: crypto.randomUUID(),
			title: 'Learn JavaScript',
			done: false
		},
		{
			id: crypto.randomUUID(),
			title: 'Eat dinner',
			done: true
		},
		{
			id: crypto.randomUUID(),
			title: 'Learn Svelte 5',
			done: false
		}
	]);

	let taskListDone = $derived(taskList.filter((t) => t.done));

	let currentTaskListFilter = $state<TaskFilter>('all');

	let filteredTasks = $derived.by(() => {
		switch (currentTaskListFilter) {
			case 'all':
				return taskList;
			case 'pending':
				return taskList.filter((t) => !t.done);
			case 'completed':
				return taskList.filter((t) => t.done);
			default:
				return taskList;
		}
	});

	const addTask = (title: string) => {
		console.log(title);
		const todo: TaskModel = {
			id: crypto.randomUUID(),
			title,
			done: false
		};

		// taskList.push(todo);
		// taskList = taskList.concat(todo);
		taskList = [...taskList, todo];

		console.log($state.snapshot(taskList));
	};

	const toggleTask = (id: string) => {
		console.log('id', id);
		taskList = taskList.map((t) => {
			if (t.id == id) {
				t.done = !t.done;
			}
			return t;
		});

		console.log($state.snapshot(taskList));
	};

	const removeTask = (id: string) => {
		console.log('id', id);
		taskList = taskList.filter((t) => t.id != id);

		console.log($state.snapshot(taskList));
	};
</script>

{#snippet filterButton(filter: TaskFilter)}
	<button
		class="secondary filterButton"
		class:contrast={currentTaskListFilter === filter}
		onclick={() => (currentTaskListFilter = filter)}>{filter}</button
	>
{/snippet}

<main>
	<h1>{appTitle}</h1>

	<TasksForm {addTask} />

	<p>
		{#if taskList.length}
			{taskListDone.length} / {taskList.length} tasks completed
		{:else}
			Add a task to get started.
		{/if}
	</p>

	{#if taskList.length}
		<div class="button-container">
			<!-- <button
				class="secondary"
				class:contrast={currentTaskListFilter == 'all'}
				onclick={() => (currentTaskListFilter = 'all')}>All</button
			> -->
			{@render filterButton('all')}
			{@render filterButton('pending')}
			{@render filterButton('completed')}
		</div>
	{/if}

	<TasksList taskList={filteredTasks} {removeTask} {toggleTask} />
</main>

<style>
	main {
		margin: 1rem auto;
		max-width: 800px;
	}

	.button-container {
		display: flex;
		justify-content: end;
		align-items: center;
		margin-bottom: 1rem;
		gap: 0.5rem;
	}

	.filterButton {
		text-transform: capitalize;
	}
</style>
