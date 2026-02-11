import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const session = await auth()

    if (!session || !session.user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const { message } = await req.json()
        const n8nUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

        if (!n8nUrl || n8nUrl.includes("placeholder")) {
            // Mock response if no valid URL
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            return NextResponse.json({
                reply: `I received your message: "${message}". \n\nHowever, the n8n webhook URL is not configured yet. Please check your .env.local file.`
            })
        }

        const response = await fetch(n8nUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chatInput: message,
                sessionId: session.user.email,
                metadata: {
                    userId: session.user.id,
                    userName: session.user.name,
                }
            }),
        })

        if (!response.ok) {
            throw new Error(`n8n responded with ${response.status}`)
        }

        const data = await response.json()
        // Assuming n8n returns { "reply": "..." } or similar
        // Adjust based on actual n8n workflow response structure
        return NextResponse.json(data)

    } catch (error) {
        console.error("[CHAT_API]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
