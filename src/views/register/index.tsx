"use client"
import {
  Button,
  FormTitle,
  FormWrapper,
  InputPassword,
  InputText,
} from "@/components"
import Link from "next/link"
import React from "react"
import {useRegisterHook} from "./hook"

const RegisterView = () => {
  const {data, method} = useRegisterHook()
  return (
    <div className="px-4.5 mt-14 justify-start">
      <FormWrapper onSubmit={method.handleSubmitRegister}>
        <FormTitle className="px-4.5 mb-2" text="Register" />
        <InputText
          value={data.user.email}
          onChange={(val) => method.handleChange(val, "email")}
          className="my-input-class"
          placeholder="Enter Email"
        />
        <InputText
          value={data.user.userName}
          onChange={(val) => method.handleChange(val, "username")}
          className="my-input-class"
          placeholder="Create Username"
        />
        <InputPassword
          value={data.user.password}
          onChange={(val) => method.handleChange(val, "password")}
          className="my-input-class"
          placeholder="Create Password"
        />
        <InputPassword
          value={data.user.confirmPassword}
          onChange={(val) => method.handleChange(val, "confirmPassword")}
          className="my-input-class"
          placeholder="Confirm Password"
        />
        <Button
          text="Register"
          type="submit"
          disabled={data.submitDisabled}
          className="mt-2 mb-9"
        />
        <span className="self-center text-sm font-medium">
          Have an account?{" "}
          <Link href="/login" className="underline">
            Login here
          </Link>
        </span>
      </FormWrapper>
    </div>
  )
}

export default RegisterView
