import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function isAdmin() {
  const cookieStore = cookies()
  const token = cookieStore.get("admin_token")

  if (!token) {
    return false
  }

  try {
    verify(token.value, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export async function requireAdmin() {
  const isAdminUser = await isAdmin()
  
  if (!isAdminUser) {
    throw new Error("Unauthorized")
  }
}

