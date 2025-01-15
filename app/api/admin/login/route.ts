import { NextResponse } from "next/server"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    
    // Check if email matches admin email
    if (email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Verify password
    const passwordMatch = await compare(password, process.env.ADMIN_PASSWORD_HASH || "")
    
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = sign(
      { email, role: "admin" },
      JWT_SECRET,
      { expiresIn: "1d" }
    )

    // Set cookie
    cookies().set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    })

    return NextResponse.json(
      { message: "Logged in successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}

