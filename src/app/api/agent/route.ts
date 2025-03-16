'use server';

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { agent_id, vars } = body;

        if (!agent_id) {
            return NextResponse.json(
                { error: "Agent ID is required" },
                { status: 400 }
            );
        }

        // Make a direct API call to the Retell API
        const response = await fetch("https://api.retellai.com/v2/create-web-call", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.RETELL}`,
            },
            body: JSON.stringify({
                agent_id,
                retell_llm_dynamic_variables: vars,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Retell API error (${response.status}):`, errorText);
            
            return NextResponse.json(
                { error: `Error from Retell API: ${response.status}`, details: errorText },
                { status: response.status }
            );
        }

        const callResponse = await response.json();
        return NextResponse.json(callResponse);
    } catch (error) {
        console.error("Error creating web call:", error);
        return NextResponse.json(
            { error: "Failed to create web call", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}