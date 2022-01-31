// IMPORTS : REACT AND NEXT
import { useEffect, useState, useContext, createContext, Context } from "react";

// IMPORTS : NPM
import nookies from "nookies";

// IMPORTS : FIREBASE
import { User, onIdTokenChanged, Auth } from "firebase/auth";
import { auth } from "../firebase/firebaseClient";

const AuthContext: Context<User | null> = createContext<User | null>(null);

const AuthProvider: React.FC = (props) => {
	const [user, setUser]: [User | null, Function] = useState<User | null>(null);

	useEffect(() => {
		// Every listener returns a unsubscribe function
		// Listen for id token change and set new cookies
		const unsub = onIdTokenChanged(auth as Auth, async (user: User | null) => {
			// If the user logged out (usually)
			if (!user) {
				setUser(null);
				nookies.set(undefined, "token", "", {});
				return;
			}

			// If the user logged in
			setUser(user);
			const token = await user.getIdToken();
			nookies.set(undefined, "token", token, {});
		});

		return unsub;
	}, []);

	return (
		<AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
	);
};

const getUser = () => useContext(AuthContext);

export { AuthProvider, getUser };
