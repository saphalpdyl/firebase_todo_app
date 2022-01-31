// IMPORTS : REACT AND NEXT
import { useState } from "react";

// IMPORTS : FIREBASE
import { db } from "../firebase/firebaseClient";
import { addDoc, collection, Firestore } from "firebase/firestore";

interface TodoAddProps {
	uid: string;
}

const TodoAdd: React.FC<TodoAddProps> = ({ uid }) => {
	const [todo, setTodo] = useState<string>("");

	// Submit Handler
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addDoc(collection(db as Firestore, uid), {
			title: todo,
			done: false,
		});
		setTodo("");
	};

	// Change Handler
	const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setTodo(e.target.value);

	return (
		<div className="todo-add">
			<form onSubmit={handleSubmit}>
				<input onChange={handleTodoChange} value={todo} type="text" />
				<input disabled={todo == ""} type="submit" value="Add Todo" />
			</form>
		</div>
	);
};

export default TodoAdd;
