// IMPORTS : REACT AND NEXT
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useState } from "react";
import { useEffect } from "react";

// IMPORTS : COMPONENTS
import { getUser } from "../contexts/AuthContext";
import { auth } from "../firebase/firebaseClient";
import TodoList from "../components/TodoList";
import TodoAdd from "../components/TodoAdd";

// IMPORTS : FIREBASE
import { handleTokenVerification } from "../firebase/firebaseAdmin";
import { db } from "../firebase/firebaseClient";
import {
	collection,
	onSnapshot,
	Firestore,
	updateDoc,
	doc,
} from "firebase/firestore";

// IMPORTS : NPM
import nookies from "nookies";

interface HomeProps {
	session?: string;
	uid?: string;
}

const Home: React.FC<HomeProps> = ({ uid, session }) => {
	const user = getUser();

	if (!uid) throw "No user id";

	// Change todo state
	const handleUpdateTodo = (todo_id: string, current_state: boolean) => {
		updateDoc(doc(db as Firestore, uid, todo_id), {
			done: !current_state,
		});
	};

	// Get todos of user
	const [todos, setTodos] = useState<Todo[]>([]);

	if (!uid) return <div>Loading...</div>;

	useEffect(() => {
		const unsub = onSnapshot(collection(db as Firestore, uid), (snapshot) => {
			const newTodos = snapshot.docs.map((doc) => {
				const data: Todo = doc.data() as Todo;
				data.uid = doc.id;
				return data;
			});

			setTodos(newTodos);
		});

		return unsub;
	}, []);

	// To prevent glitches from happening due to user entering the page using stolen JWT
	if (user) {
		return (
			<div className="home-container">
				<button
					onClick={() => {
						auth?.signOut();
						window.location.href = "/login";
					}}
				>
					Sign Out
				</button>
				<TodoList handleUpdateTodo={handleUpdateTodo} todos={todos} />
				<TodoAdd uid={uid} />
			</div>
		);
	} else {
		return <p>Loading ...</p>;
	}
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (
	ctx: GetServerSidePropsContext
) => {
	try {
		const cookies = nookies.get(ctx);
		const token: string = cookies.token;
		const newToken = await handleTokenVerification(token);

		// Throw error if there is no token
		if (!newToken) throw "No token";

		const { uid, email } = newToken;

		return {
			props: {
				session: `You are logged in with ${uid} and ${email}`,
				uid,
			},
		};
	} catch (err) {
		console.log("ERROR in server side props : ", err);
		// Return back to login page
		ctx.res.writeHead(302, { Location: "/login" });
		ctx.res.end();
		return {
			props: {},
		};
	}
};
