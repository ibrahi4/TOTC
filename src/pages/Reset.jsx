import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import AuthLayout from "../components/loginComponents/AuthLayout";

const ResetSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function Reset() {
  const [serverMsg, setServerMsg] = useState(null);

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="We’ll send a reset link"
      page="reset"
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
        initialValues={{ email: "" }}
        validationSchema={ResetSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setServerMsg(null);
          try {
            await sendPasswordResetEmail(auth, values.email);
            setServerMsg({
              type: "success",
              message: "If the account exists, a reset email has been sent.",
            });
            resetForm();
          } catch (error) {
            console.error(error);
            setServerMsg({
              type: "error",
              message: "Reset failed. Try again.",
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-xs text-red-600 mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-cyan-700 hover:bg-cyan-800 text-white py-3.5 font-semibold shadow-lg transition-all disabled:opacity-60"
            >
              {isSubmitting ? "Sending…" : "Send reset email"}
            </button>

            <p className="text-center text-sm text-gray-700 dark:text-gray-300">
              <Link
                to="/login"
                className="text-cyan-800 font-semibold hover:underline"
              >
                Back to login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
