// IMPORTS
import admin from "firebase-admin";
const serviceAccount = require("../secrets.json");

export const handleTokenVerification = async (token: string) => {
	if (!admin.apps.length) {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL:
				"https://todo-cd91a-default-rtdb.asia-southeast1.firebasedatabase.app/",
		});
	}

	// Verification part
	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		return decodedToken;
	} catch (err) {
		console.log("ERROR while decoding : ", err);
	}
};
