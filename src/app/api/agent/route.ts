'use server';

import { NextResponse } from "next/server";

import Retell from 'retell-sdk';


const retellClient = new Retell({
    apiKey: process.env.RETELL!,
});

export async function POST(
    request: Request,
) {
    try {
        const { agent_id, vars } = await request.json()

        const createCallResponse = await retellClient.call.createWebCall({
            agent_id: agent_id,
            retell_llm_dynamic_variables: vars,
        });

        return NextResponse.json(createCallResponse);
    } catch (error: unknown) {
        console.error('Error creating web call: ', error);
        return NextResponse.json(
            {
                error: 'Failed to create web call',
                details: error
            },
            { status: 500 }
        )
    }
}