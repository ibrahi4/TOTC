import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/loginComponents/AuthLayout";
import InputField from "../components/loginComponents/InputField";
import PasswordField from "../components/loginComponents/PasswordField";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase"; // ✅ db لازم هنا
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../authSlice";

const RegisterSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverMsg, setServerMsg] = useState(null);

  return (
    <AuthLayout
      title="Register"
      subtitle="Create a new account"
      page="register"
    >
      {serverMsg && (
        <div className="mb-4 rounded-lg px-4 py-2 text-sm font-medium bg-red-50 text-red-700">
          {serverMsg}
        </div>
      )}

      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setServerMsg(null);
          try {
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
            const user = userCredential.user;

            await updateProfile(user, { displayName: values.name });

            // ✅ نخزن بيانات المستخدم في Firestore
            await setDoc(doc(db, "users", user.uid), {
              name: values.name,
              email: values.email,
              isAdmin: false, // 👈 بشكل افتراضي المستخدم مش Admin
            });

            // نجيب البيانات تاني للتأكد
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            const userData = {
              uid: user.uid,
              email: user.email,
              name: values.name,
              isAdmin: docSnap.exists() ? docSnap.data().isAdmin : false,
            };

            dispatch(setCurrentUser(userData));

            navigate("/", { replace: true });
          } catch (error) {
            console.error(error);
            setServerMsg("Registration failed. Try again.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            <InputField name="name" label="Name" placeholder="Your name" />
            <InputField
              name="email"
              label="Email"
              placeholder="you@example.com"
            />
            <PasswordField name="password" label="Password" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-cyan-700 hover:bg-cyan-800 text-white py-3.5 font-semibold shadow-lg transition-all"
            >
              {isSubmitting ? "Creating account…" : "Register"}
            </button>

            <p className="text-center text-gray-900 dark:text-gray-100 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-700 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
