import React from "react"
import { useCookies } from "react-cookie"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const [cookies] = useCookies(["exc_prop_user"])

  if (!cookies.exc_prop_user) {
    Navigate({ to: "/login", replace: true })
  }

  return <>{!cookies.exc_prop_user ? null : children}</>
}
