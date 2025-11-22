"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ApTextInput } from "@/components/input/textInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { signUpUser } from "@/redux/features/user/userThunk";
import { ApButton } from "@/components/button/button";
import { useRouter, useSearchParams } from "next/navigation";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";

function SignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralFromUrl = searchParams.get("ref") || "";

  // --- Step control ---
  const [step, setStep] = useState(1);

  // --- VALIDATIONS ---
  const stepOneSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    state: Yup.string().required("State is required"),
    phone: Yup.string()
      .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
      .required("Phone number is required"),
  });

  const stepTwoSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    pinCode: Yup.string()
      .matches(/^\d{4}$/, "PIN code must be exactly 4 digits")
      .required("PIN code is required"),
    referralCode: Yup.string().optional(),
  });

  // --- Submit ---
  const handleSubmit = async (values: any) => {
    const resultAction = await dispatch(signUpUser(values));
    if (signUpUser.fulfilled.match(resultAction)) {
      toast.success("🎉 Sign-up successful! Redirecting...");
      router.push(`/auth/verify?email=${values.email}&type=verify`);
    } else {
      toast.error(`❌ ${resultAction.payload || "Signup failed"}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 w-96 rounded-md shadow">
        <div className="flex justify-center mb-4">
          <Image src={logo} alt="PayOnce logo" width={50} height={40} />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Join Payonce today and start enjoying instant VTU recharges and
          seamless bill payments.
        </p>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            state: "",
            phone: "",
            referralCode: referralFromUrl,
            password: "",
            confirmPassword: "",
            pinCode: "",
          }}
          validationSchema={step === 1 ? stepOneSchema : stepTwoSchema}
          onSubmit={(values) => {
            if (step === 1) {
              setStep(2);
            } else {
              handleSubmit(values);
            }
          }}
        >
          {() => (
            <Form>
              {step === 1 && (
                <>
                  <ApTextInput label="First Name" name="firstName" />
                  <ApTextInput label="Last Name" name="lastName" />
                  <ApTextInput label="Email" name="email" />
                  <ApTextInput label="State" name="state" />
                  <ApTextInput label="Phone" name="phone" />

                  <ApButton type="submit" className="w-full mt-4">
                    Continue →
                  </ApButton>
                </>
              )}

              {step === 2 && (
                <>
                  <ApTextInput
                    label="Password"
                    name="password"
                    type="password"
                  />
                  <ApTextInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                  />
                  <ApTextInput label="PIN Code" name="pinCode" />
                  <ApTextInput
                    label="Referral Code (optional)"
                    name="referralCode"
                  />

                  <ApButton
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4"
                  >
                    {loading ? "Signing Up..." : "Complete Registration"}
                  </ApButton>

                  <button
                    type="button"
                    className="text-sm text-blue-600 mt-3"
                    onClick={() => setStep(1)}
                  >
                    ← Back to Step 1
                  </button>
                </>
              )}
            </Form>
          )}
        </Formik>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/auth/signin" className="text-green-500 hover:underline">
            Sign In
          </a>
        </p>

        <p className="text-center mt-6 text-sm text-green-600">
          Want to explore more?{" "}
          <Link
            href="/"
            className="font-medium text-green-600 hover:text-blue-800 hover:underline"
          >
            Go back home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function MainSignUp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUp />
    </Suspense>
  );
}
