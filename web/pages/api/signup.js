import cookie from "cookie";
import { API_URL, CLIENT_ID } from "../../config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const body = JSON.stringify({
      client_id:
        process.env.NODE_ENV === "development"
          ? process.env.CLIENT_ID
          : process.env.PROD_CLIENT_ID,
      email,
      password,
    });

    try {
      const apiRes = await fetch(`${API_URL}/api/v1/users`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await apiRes.json();

      if (apiRes.status === 200) {
        // res.setHeader("Set-Cookie", [
        //   cookie.serialize("access", data.user.access_token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV !== "development",
        //     maxAge: 60 * 60 * 8,
        //     sameSite: "strict",
        //     path: "/api/",
        //   }),
        //   cookie.serialize("refresh", data.user.refresh_token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV !== "development",
        //     maxAge: 60 * 60 * 24,
        //     sameSite: "strict",
        //     path: "/api/",
        //   }),
        // ]);

        return res.status(200).json({
          success: "Signed up successfully",
        });
      } else {
        return res.status(apiRes.status).json({
          error: "Authentication failed",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when authenticating",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} now allowed` });
  }
};
