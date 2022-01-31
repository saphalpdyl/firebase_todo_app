// IMPORTS : REACT AND NEXT
import type { NextPage } from "next";

// IMPORTS : COMPONENTS
import Form from "../../components/Form";

// IMPORTS : FIREBASE
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage: NextPage = () => {
	return (
		<div className="login-page-main-cont">
			<h1>Log In</h1>
			<Form authHandler={signInWithEmailAndPassword} login />
		</div>
	);
};

export default LoginPage;
