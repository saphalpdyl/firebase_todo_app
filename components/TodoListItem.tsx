interface TodoListItemProps {
	todo: Todo;
	handleUpdateTodo: Function;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
	todo,
	handleUpdateTodo,
}) => {
	// Handle change done
	const handleClick = () => handleUpdateTodo(todo.uid, todo.done);

	return (
		<div
			onClick={handleClick}
			className={"todo-list-item " + (todo.done ? "todo-list-item-done" : "")}
		>
			<p>{todo.title}</p>
			<style jsx>
				{`
					.todo-list-item {
						background: #f6f6f6;
						padding: 3px 10px;
						border-radius: 5px;
						transition: all 0.1s ease-in-out;
						cursor: pointer;
					}

					.todo-list-item-done {
						text-decoration: line-through;
						color: #777;
					}

					.todo-list-item:hover {
						border-left: 5px solid #00bcd4;
					}
				`}
			</style>
		</div>
	);
};

export default TodoListItem;
