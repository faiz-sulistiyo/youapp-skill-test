"use client"

import React from "react"
import {useLoginHook} from "./hook"
import {
  Button,
  FormTitle,
  FormWrapper,
  InputPassword,
  InputText,
  Notification,
} from "@/components"
import Link from "next/link"

const LoginView = () => {
  const {data, method} = useLoginHook()

  return (
    <div className="px-4.5 mt-14 justify-start">
      <Notification message={data.error.message} show={data.error.show} onClose={method.handleCloseNotif}/>
      <FormWrapper onSubmit={method.handleSubmitLogin}>
        <FormTitle className="px-4.5 mb-2" text="Login" />
        <InputText
          value={data.user.emailOrUserName}
          onChange={(val) => method.handleChange(val, "emailOrUserName")}
          className="my-input-class"
          placeholder="Enter Username/Email"
        />
        <InputPassword
          value={data.user.password}
          onChange={(val) => method.handleChange(val, "password")}
          className="my-input-class"
          placeholder="Enter Password"
        />
        <Button
          text="Login"
          type="submit"
          disabled={data.submitDisabled}
          className="mt-2 mb-9"
        />
        <span className="self-center text-sm font-medium">
          No account?{" "}
          <Link href="/register" className="underline">
            Register here
          </Link>
        </span>
      </FormWrapper>
    </div>
  )
}

export default LoginView
