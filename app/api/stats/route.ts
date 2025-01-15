import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const [startupsFounded, coFoundersMatched, fundingRaised, countriesRepresented] = await Promise.all([
      db.startup.count(),
      db.match.count(),
      db.funding.aggregate({ _sum: { amount: true } }),
      db.user.groupBy({ by: ['country'] }).count(),
    ])

    return NextResponse.json({
      startupsFounded,
      coFoundersMatched,
      fundingRaised: Math.round(fundingRaised._sum.amount / 1000000), // Convert to millions
      countriesRepresented: countriesRepresented.length,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

