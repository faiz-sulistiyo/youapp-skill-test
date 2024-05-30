import React from "react"
import {useProfileHook} from "./hook"

const ProfileView = () => {
  const {} = useProfileHook()
  return <div>ProfileView {process.env.YOUAPP_API_URL}</div>
}

export default ProfileView
