"use client";

import { ErrorMessage, useField } from "formik";
import React, { forwardRef, useRef, useState } from "react";
import { ApText } from "../typograph/text";
import { Eye, EyeOff } from "lucide-react";

interface IProps {
  label?: string;
  type?: "text" | "password" | "textarea" | "number";
  name: string;
  value?: string;
  inputClassName?: string;
  readOnly?: boolean;
  placeHolder?: string;
  disabled?: boolean;
  ignoreFormik?: boolean;
  containerClassName?: string;
  onChange?: (val: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  maxlength?: number;
}

export const ApTextInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  IProps
>(
  (
    {
      label,
      type = "text",
      name,
      readOnly = false,
      onChange,
      onFocus,
      onBlur,
      inputClassName = "",
      placeHolder = "",
      containerClassName = "",
      disabled = false,
      ignoreFormik = false,
      maxlength,
      value,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const [showPassword, setShowPassword] = useState(false);

    let formikField: any = null;
    if (name && !ignoreFormik) {
      formikField = useField(name);
    }

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      let value = e.target.value;

      // Remove ALL non-digit characters for number fields
      if (type === "number") {
        value = value.replace(/[^\d]/g, "");
      }

      if (!ignoreFormik) formikField?.[2].setValue(value);
      onChange?.(value);
    };

    return (
      <div className={`flex flex-col ${containerClassName}`}>
        {label && (
          <ApText className="mb-1 text-sm font-medium text-gray-700">
            {label}
          </ApText>
        )}

        {type === "textarea" ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            className={`w-full rounded-md border border-gray-300 p-3 text-sm focus:border-purple-600 focus:outline-none disabled:opacity-50 ${inputClassName}`}
            placeholder={placeHolder}
            disabled={disabled}
            readOnly={readOnly}
            name={name}
            rows={5}
            {...(!ignoreFormik ? formikField[0] : { value })}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        ) : (
          <div className="relative mb-2">
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              // Force number inputs to be text (more stable)
              type={
                type === "password" && !showPassword
                  ? "password"
                  : type === "number"
                  ? "text"
                  : "text"
              }
              className={`w-full h-11 rounded-md border border-gray-300 px-3 text-sm focus:border-green-300 focus:outline-none disabled:opacity-50 ${inputClassName}`}
              placeholder={placeHolder}
              disabled={disabled}
              readOnly={readOnly}
              name={name}
              maxLength={maxlength}
              {...(!ignoreFormik ? formikField[0] : { value })}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />

            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>
        )}

        {!ignoreFormik && (
          <ErrorMessage
            name={name}
            component="div"
            className="mt-1 text-xs text-red-500"
          />
        )}
      </div>
    );
  }
);

ApTextInput.displayName = "ApTextInput";
