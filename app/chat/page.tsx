import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { ChatInterface } from "@/components/chat-interface"

export default async function ChatPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

    // Basic check for "phone number" (simulated by query param or checking session if we extended it)
    // For now, we rely on the redirection from Login/Actions or we can assume if they are here they are good.
    // Ideally, we would fetch the user from DB here to check profile completion.

    return <ChatInterface userName={session.user?.name || "User"} />
}
