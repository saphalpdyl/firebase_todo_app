// IMPORTS
import admin from "firebase-admin";

export const handleTokenVerification = async (token: string) => {
	if (!admin.apps.length) {
		admin.initializeApp({
			credential: admin.credential.cert({
				type: process.env.NEXT_PUBLIC_ADMIN_ACCOUNT_TYPE,
				project_id: process.env.NEXT_PUBLIC_ADMIN_PROJECT_ID,
				private_key_id: process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY_ID,
				private_key: process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY?.replace(
					/\\n/g,
					"\n"
				),
				client_email: process.env.NEXT_PUBLIC_ADMIN_CLIENT_EMAIL,
				client_id: process.env.NEXT_PUBLIC_ADMIN_CLIENT_ID,
				auth_uri: process.env.NEXT_PUBLIC_ADMIN_AUTH_URI,
				token_uri: process.env.NEXT_PUBLIC_ADMIN_TOKEN_URI,
				auth_provider_x509_cert_url:
					process.env.NEXT_PUBLIC_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
				client_x509_cert_url:
					process.env.NEXT_PUBLIC_ADMIN_CLIENT_X509_CERT_URL,
			} as any),
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
