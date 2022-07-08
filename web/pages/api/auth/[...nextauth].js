import NextAuth from "next-auth";
import { API_URL } from "../../../config/index";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // The 'url' is pointing to a Rails API endpoint which returns a JWT Token
        const url = `${API_URL}/api/v1/oauth/token`;

        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            grant_type: "password",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          // I SAW EXAMPLES RETURNING {"email": "blah@tst.com"}
          return user; // MY CONTENT {token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJyb2xl…0.OAGiwjj9O_NsH02lIjA2D4HYZkmTQ3_SqtKcVgaIul0'}
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, isNewUser }) {
      // This user return by provider {} as you mentioned above MY CONTENT {token:}
      if (user) {
        if (user.access_token) {
          token = { accessToken: user.access_token };
        }
      }
      return token;
    },

    // That token store in session
    async session({ session, token }) {
      // this token return above jwt()
      session.accessToken = token.accessToken;
      //if you want to add user details info

      const apiRes = await fetch(`${API_URL}/api/v1/users/me`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      const data = await apiRes.json();

      // console.log("session...", data);

      session.user = { user: data }; //this user info get via API call or decode token. Anything you want you can add
      return session;
    },
  },
});
