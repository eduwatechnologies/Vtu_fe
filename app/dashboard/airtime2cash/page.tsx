"use client";

import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  sendA2CAirtime,
  verifyA2COtp,
  sendA2COtp,
  getDataServices,
} from "@/redux/features/services/serviceThunk";
import { AppDispatch, RootState } from "@/redux/store";
import ApHeader from "@/components/Apheader";
import { ApTextInput } from "@/components/input/textInput";
import { ApButton } from "@/components/button/button";

export default function AirtimeToCashPage() {
  const dispatch = useDispatch<AppDispatch>();

  const [step, setStep] = useState(1);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [airtimebalance, setAirtimeBalance] = useState("");

  // Fetch available airtime networks
  const dataServices = useSelector(
    (state: RootState) => state.easyAccessdataPlans?.dataServices ?? []
  );

  useEffect(() => {
    dispatch(getDataServices("airtime"));
  }, [dispatch]);

  // Redux state
  const loading = useSelector(
    (state: RootState) => state.easyAccessdataPlans?.a2cLoading
  );
  const error = useSelector(
    (state: RootState) => state.easyAccessdataPlans?.a2cError
  );

  /** ============================
   *  VALIDATION SCHEMAS
   * ============================ */
  const sendOtpSchema = Yup.object({
    network: Yup.string().required("Select your network"),
    senderNumber: Yup.string()
      .required("Phone number required")
      .matches(/^\d{11}$/, "Invalid phone number"),
  });

  const verifyOtpSchema = Yup.object({
    otp: Yup.string()
      .required("OTP required")
      .matches(/^\d{4,6}$/, "Invalid OTP"),
  });

  const sendAirtimeSchema = Yup.object({
    receiverNumber: Yup.string()
      .required("Receiver number required")
      .matches(/^\d{11}$/, "Invalid phone number"),
    amount: Yup.number().required("Amount required").min(50, "Minimum is 50"),
    pin: Yup.string()
      .optional()
      .matches(/^\d{4}$/, "PIN must be 4 digits")
      .nullable(),
  });

  /** ============================
   *  HANDLERS
   * ============================ */

  // STEP 1 → SEND OTP
  const handleSendOtp = async (values: any) => {
    const res = await dispatch(sendA2COtp(values));
    console.log(res.payload, "...");
    console.log(res.payload.data, "the corret");

    if (res.payload.data.status && res.payload.data.code === 200) {
      setIdentifier(res.payload.data.data.identifier);
      setStep(2);
    }
  };

  // STEP 2 → VERIFY OTP
  const handleVerifyOtp = async (values: any) => {
    const res = await dispatch(verifyA2COtp({ identifier, otp: values.otp }));

    if (res.payload.data.data.status && res.payload.data.data.code === 200) {
      setAirtimeBalance(res.payload.data.data.data.airtimeBalance);
      setSessionId(res.payload.data.data.data.sessionId);
      setStep(3);
    }
  };

  // STEP 3 → SEND AIRTIME FOR CASH
  const handleSendAirtime = async (values: any) => {
    const res = await dispatch(
      sendA2CAirtime({
        network: selectedNetwork.toUpperCase(),
        receiverNumber: values.receiverNumber,
        amount: values.amount,
        pin: values.pin || "",
        quantity: 1,
        sessionId: sessionId,
      })
    );

    // if (res.payload.data.data.data.status && res.payload.data.data.code === 200) {
    //   alert("Airtime successfully sent & converted to cash!");
    // }
  };

  return (
    <div className="min-h-screen bg-white">
      <ApHeader title="Airtime To Cash" />

      <div className="flex bg-gray-100">
        <div className="bg-white p-6 w-full max-w-md">
          <p className="text-sm text-gray-600 text-center py-2 mb-4">
            Swap your airtime for cash in just a few taps with Payonce!
          </p>

          {/* STEP 1: SEND OTP */}
          {step === 1 && (
            <Formik
              initialValues={{ network: "", senderNumber: "" }}
              validationSchema={sendOtpSchema}
              onSubmit={handleSendOtp}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-4">
                  {/* Networks */}
                  <div className="flex flex-wrap justify-center gap-4 mb-4">
                    {dataServices.map((service: any) => (
                      <button
                        key={service._id}
                        type="button"
                        className={`flex items-center justify-center p-3 border-2 rounded-xl ${
                          selectedNetwork === service.name
                            ? "border-blue-500"
                            : "border-gray-200"
                        }`}
                        onClick={() => {
                          setSelectedNetwork(service.name);
                          setFieldValue(
                            "network",
                            service.name.split(" ")[0].toUpperCase()
                          );
                        }}
                      >
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-10 h-10 object-contain"
                        />
                      </button>
                    ))}
                  </div>

                  <ApTextInput
                    label="Sender Number"
                    name="senderNumber"
                    placeHolder="08058858858"
                  />

                  <ApButton
                    type="submit"
                    className="w-full mt-4"
                    title={loading ? "Processing..." : "Send OTP"}
                  />
                </Form>
              )}
            </Formik>
          )}

          {/* STEP 2: VERIFY OTP */}
          {step === 2 && (
            <Formik
              initialValues={{ otp: "" }}
              validationSchema={verifyOtpSchema}
              onSubmit={handleVerifyOtp}
            >
              <Form className="space-y-6">
                <ApTextInput label="Enter OTP" name="otp" placeHolder="1234" />

                <ApButton
                  type="submit"
                  className="w-full mt-4"
                  title={loading ? "Verifying..." : "Verify OTP"}
                />
              </Form>
            </Formik>
          )}

          {/* STEP 3: SEND AIRTIME */}
          {step === 3 && (
            <Formik
              initialValues={{ receiverNumber: "", amount: "", pin: "" }}
              validationSchema={sendAirtimeSchema}
              onSubmit={handleSendAirtime}
            >
              <Form className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Your Airtime Balance:
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {airtimebalance}
                  </p>
                </div>

                <ApTextInput
                  label="Receiver Phone Number"
                  name="receiverNumber"
                  placeHolder="08058858858"
                />

                <ApTextInput
                  label="Amount"
                  name="amount"
                  type="number"
                  placeHolder="Amount to send"
                />

                <ApTextInput
                  label="SIM Transfer PIN (optional)"
                  name="pin"
                  type="password"
                  placeHolder="4-digit transfer PIN"
                />

                <ApButton
                  type="submit"
                  className="w-full mt-4"
                  title="Send Airtime"
                />
              </Form>
            </Formik>
          )}

          {error && (
            <p className="text-center text-red-500 text-sm mt-4">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
