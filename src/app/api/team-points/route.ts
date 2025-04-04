// app/api/team-points/[teamId]/route.ts
import { NextResponse } from 'next/server'
import {getTeamPoints} from "@/actions/get-team-point";


export async function POST(
    request: Request
) {
    const body = await request.json();
    const result = await getTeamPoints(body.teamId);

    if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(result.data)
}