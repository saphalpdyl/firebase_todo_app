// IMPORTS : COMPONENTS
import TodoListItem from "./TodoListItem";

interface TodoListProps {
	todos: Todo[];
	deleteHandler?: Function; // --------------- TODO --------------------
	handleUpdateTodo: Function;
}

const TodoList: React.FC<TodoListProps> = ({ todos, handleUpdateTodo }) => {
	return (
		<div className="todo-list-container">
			{todos.map((todo, index) => (
				<TodoListItem
					handleUpdateTodo={handleUpdateTodo}
					key={index}
					todo={todo}
				/>
			))}
			<style jsx>
				{`
					.todo-list-container {
						display: flex;
						flex-direction: column;
						justify-content: center;
						gap: 20px;
						margin: 10px 0px;
						width: 600px;
					}
				`}
			</style>
		</div>
	);
};

export default TodoList;
