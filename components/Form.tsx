// IMPORTS : REACT AND NEXT
import { useState } from "react";

// IMPORTS : FIREBASE
import { auth } from "../firebase/firebaseClient";
import type { Auth } from "firebase/auth";

interface FormProps {
	authHandler: Function;
	login: boolean;
}

const Form: React.FC<FormProps> = ({ authHandler, login }) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [busy, setBusy] = useState<boolean>(false);

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setBusy(true);
		if (email && password) {
			try {
				await authHandler(auth as Auth, email, password);
				window.location.href = "/";
			} catch (err: any) {
				console.log("Error : ", err.message);
			}
		}

		setBusy(false);
	};

	// Handle email change
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	return (
		<form onSubmit={handleSubmit} className="login-form">
			<div>
				<label htmlFor="email">Email</label>
				<input
					name="email"
					onChange={handleEmailChange}
					type="email"
					placeholder="Email"
				/>
			</div>

			<div>
				<label htmlFor="password"> Password </label>
				<input
					name="password"
					onChange={handlePasswordChange}
					type="password"
					placeholder="Password"
				/>
			</div>
			{/* -------------------TURN THIS INTO A COMPONENT--------------------- */}
			<input
				className="submit-btn"
				disabled={email == "" || password == "" || busy}
				type="submit"
				value={login ? "Log In" : "Sign Up"}
			/>
			<style jsx>
				{`
					label {
						font-family: "consolas", sans-serif;
					}

					.login-form {
						display: flex;
						flex-direction: column;
						justify-content: center;
						gap: 20px;
						width: 300px;
					}

					.login-form div {
						display: flex;
						flex-direction: inherit;
						gap: 10px;
					}

					.submit-btn {
						// Light blue background
						background-color: #5accdc;
						outline: none;
						border: none;
						border-radius: 5px;
						color: white;
						font-family: "Dongle";
						font-size: 2rem;
						transition: all 0.1s ease-in-out;
						cursor: pointer;
					}

					.submit-btn:hover {
						// Darken background
						background-color: #00a5b5;
					}

					.submit-btn:disabled {
						// Grey out button
						background-color: #d3d3d3;
						cursor: not-allowed;
					}
				`}
			</style>
		</form>
	);
};

export default Form;
