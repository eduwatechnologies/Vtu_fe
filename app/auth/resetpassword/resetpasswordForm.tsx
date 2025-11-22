"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { ApTextInput } from "@/components/input/textInput";
import { ApButton } from "@/components/button/button";
import { useDispatch } from "react-redux";
import { resetPassword } from "@/redux/features/user/userThunk";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import logo from "@/public/images/logo.png";
import Image from "next/image";

export function ResetPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const code = searchParams.get("code") || "";

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    const resultAction = await dispatch(resetPassword(values));
    setIsSubmitting(false);

    if (resetPassword.fulfilled.match(resultAction)) {
      toast.success("✅ Password reset successfully");
      router.push("/auth/signin");
    } else {
      toast.error(`❌ ${resultAction.payload || "Password reset failed"}`);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white/40 p-6 rounded-lg  w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <Image src={logo} alt="PayOnce logo" width={50} height={40} />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Enter your registered email!.
        </p>
        <Formik
          initialValues={{
            email: email,
            code: code,
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              {/* <ApTextInput
                label="Email"
                name="email"
                placeHolder="Enter your email"
              /> */}
              <ApTextInput
                label="New Password"
                name="newPassword"
                type="password"
                placeHolder="Enter new password"
              />
              <ApTextInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeHolder="Confirm new password"
              />

              <ApButton
                type="submit"
                className="w-full mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </ApButton>
            </Form>
          )}
        </Formik>

        <p className="text-center mt-4 text-sm">
          Remember your password?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
