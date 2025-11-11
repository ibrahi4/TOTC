import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/loginComponents/AuthLayout";
import InputField from "../components/loginComponents/InputField";
import PasswordField from "../components/loginComponents/PasswordField";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

const SignupSchema = Yup.object({
  name: Yup.string().min(2, "Too short").required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string()
    .min(3, "Minimum 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Register() {
  const navigate = useNavigate();
  const [serverMsg, setServerMsg] = useState(null);

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join and start learning today"
      page="register"
    >
      {serverMsg && (
        <div
          className={`mb-4 rounded-lg px-4 py-2 text-sm font-medium ${
            serverMsg.type === "error"
              ? "bg-red-50 text-red-700"
              : "bg-green-50 text-green-700"
          }`}
        >
          {serverMsg.message}
        </div>
      )}

      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
          password: "",
          confirm: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setServerMsg(null);
          const { name, email, password, username } = values;

          try {
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              name,
              email,
              username,
              isAdmin: false,
            });

            setServerMsg({
              type: "success",
              message: "Account created successfully!",
            });
            navigate("/", { replace: true });
          } catch (error) {
            console.error(error);
            setServerMsg({
              type: "error",
              message: error.message || "Signup failed",
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            <InputField name="name" label="Full Name" />
            <InputField name="username" label="Username" />
            <InputField name="email" label="Email" />
            <PasswordField name="password" label="Password" />
            <PasswordField name="confirm" label="Confirm Password" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-cyan-700 hover:bg-cyan-800 text-white py-3.5 font-semibold shadow-lg transition-all"
            >
              {isSubmitting ? "Creating…" : "Create Account"}
            </button>

            <p className="text-center text-gray-200 dark:text-gray-100 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-700 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
