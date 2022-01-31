// IMPORTS : REACT AND NEXT
import type { NextPage } from "next";

// IMPORTS : FIREBASE
import { createUserWithEmailAndPassword } from "firebase/auth";

// IMPORTS : COMPONENTS
import Form from "../../components/Form";

const SignUp = () => {
	return (
		<div className="signup-page-main-cont">
			<h1>Sign Up</h1>
			<Form authHandler={createUserWithEmailAndPassword} login={false} />
		</div>
	);
};

export default SignUp;
