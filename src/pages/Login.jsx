import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/loginComponents/AuthLayout";
import InputField from "../components/loginComponents/InputField";
import PasswordField from "../components/loginComponents/PasswordField";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"; // ✅ db لازم هنا
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../authSlice";

const LoginSchema = Yup.object({
  identifier: Yup.string().required("Email or username is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverMsg, setServerMsg] = useState(null);

  return (
    <AuthLayout title="Login" subtitle="Access your account" page="login">
      {serverMsg && (
        <div className="mb-4 rounded-lg px-4 py-2 text-sm font-medium bg-red-50 text-red-700">
          {serverMsg}
        </div>
      )}

      <Formik
        initialValues={{ identifier: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setServerMsg(null);
          try {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              values.identifier,
              values.password
            );
            const user = userCredential.user;

            // ✅ نجيب بيانات المستخدم من Firestore
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            const userData = {
              uid: user.uid,
              email: user.email,
              name: user.displayName || "",
              isAdmin: docSnap.exists() ? docSnap.data().isAdmin : false,
            };

            dispatch(setCurrentUser(userData));

            navigate("/", { replace: true });
          } catch (error) {
            console.error(error);
            setServerMsg("Login failed. Check your E-mail and Password.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            <InputField
              name="identifier"
              label="Email or Username"
              placeholder="you@example.com"
            />
            <PasswordField name="password" label="Password" />

            <div className="flex justify-end text-sm">
              <Link to="/reset" className="text-cyan-700 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-cyan-700 hover:bg-cyan-800 text-white py-3.5 font-semibold shadow-lg transition-all"
            >
              {isSubmitting ? "Signing in…" : "Login"}
            </button>

            <p className="text-center text-gray-900 dark:text-gray-100 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-cyan-700 font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
