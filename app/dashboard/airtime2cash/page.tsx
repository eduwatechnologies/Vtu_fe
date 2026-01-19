"use client";

import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getDataServices } from "@/redux/features/services/serviceThunk";
import { AppDispatch, RootState } from "@/redux/store";
import ApHeader from "@/components/Apheader";
import { ApTextInput } from "@/components/input/textInput";
import { ApButton } from "@/components/button/button";

export default function AirtimeToCashPage() {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedNetwork, setSelectedNetwork] = useState("");

  // Fetch available airtime networks
  const dataServices = useSelector(
    (state: RootState) => state.easyAccessdataPlans?.dataServices ?? []
  );

  useEffect(() => {
    dispatch(getDataServices("airtime"));
  }, [dispatch]);

  /** ============================
   *  VALIDATION SCHEMAS
   * ============================ */
  const whatsappSchema = Yup.object({
    network: Yup.string().required("Select your network"),
    amount: Yup.number().required("Amount required").min(500, "Minimum is 500"),
    accountNumber: Yup.string()
      .required("Account Number required"),
      // .matches(/^\d{10}$/, "Invalid account number"),
    accountName: Yup.string().required("Account Name required"),
    bankName: Yup.string().required("Bank Name required"),
  });

  /** ============================
   *  HANDLERS
   * ============================ */

  const getTransferInstruction = (network: string) => {
    switch (network.toUpperCase()) {
      case "MTN":
        return "Dial *600*Recipient_Number*Amount*PIN# to transfer.";
      case "GLO":
        return "Dial *131*Recipient_Number*Amount*PIN# to transfer.";
      case "AIRTEL":
        return "Dial *432# and follow the prompts to transfer.";
      case "9MOBILE":
        return "Dial *223*PIN*Amount*Recipient_Number# to transfer.";
      default:
        return "";
    }
  };

  const handleWhatsAppRedirect = (values: any) => {
    const { network, amount, accountNumber, bankName, accountName } = values;

    const instruction = getTransferInstruction(network);

    const message = `Hello, I want to convert Airtime to Cash.

Details:
Network: ${network}
Amount: ${amount}
Bank: ${bankName}
Account No: ${accountNumber}
Account Name: ${accountName}

Transfer Instruction:
${instruction}

Please provide the recipient number  to proceed.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2348063249490?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <ApHeader title="Airtime To Cash" />

      <div className="flex bg-gray-100 justify-center mb-60">
        <div className="bg-white p-6 w-full max-w-md shadow-md rounded-md mt-6">
         
          <Formik
            initialValues={{
              network: "",
              amount: "",
              accountNumber: "",
              accountName: "",
              bankName: "",
            }}
            validationSchema={whatsappSchema}
            onSubmit={handleWhatsAppRedirect}
          >
            {({ setFieldValue, values }) => (
              <Form className="space-y-4 mb-24">
                {/* Networks */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Select Network
                  </label>
                  <div className="flex flex-wrap justify-center gap-4 mb-4">
                    {dataServices.map((service: any) => (
                      <button
                        key={service._id}
                        type="button"
                        className={`flex items-center justify-center p-3 border-2 rounded-xl transition-all ${
                          selectedNetwork === service.name
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
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
                  <ErrorMessage name="network">
                    {(msg) => <div className="text-red-500 text-xs">{msg}</div>}
                  </ErrorMessage>

                  {/* Dynamic Instruction */}
                  {values.network && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-sm text-blue-800">
                      <strong>How to transfer:</strong> <br />
                      {getTransferInstruction(values.network)}
                    </div>
                  )}
                </div>

                <ApTextInput
                  label="Amount"
                  name="amount"
                  type="number"
                  placeHolder="Enter amount (Min 500)"
                />

                <ApTextInput
                  label="Bank Name"
                  name="bankName"
                  placeHolder="e.g. GTBank, Opay"
                />

                <ApTextInput
                  label="Account Number"
                  name="accountNumber"
                  type="number"
                  placeHolder="0083509963"
                />

                <ApTextInput
                  label="Account Name"
                  name="accountName"
                  placeHolder="Account Holder Name"
                />

                <ApButton
                  type="submit"
                  className="w-full  bg-green-600 hover:bg-green-700"
                  title="Continue"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

