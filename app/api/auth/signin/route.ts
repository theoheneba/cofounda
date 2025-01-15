import { NextResponse } from "next/server"
import { compare } from "bcrypt"
import { db } from "@/lib/db"
import { sign } from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    
    // Find user by email
    const user = await db.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      )
    }

    // Compare passwords
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      )
    }

    // Generate JWT token
    const token = sign(
      { userId: user.id },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "1d" }
    )

    // Remove password from the response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      { message: "Signed in successfully", user: userWithoutPassword, token },
      { status: 200 }
    )
  } catch (error) {
    console.error("Signin error:", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}

