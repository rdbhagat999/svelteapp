export type TaskFilter = 'all' | 'pending' | 'completed';

export type TaskModel = {
	id: string;
	title: string;
	done: boolean;
};
