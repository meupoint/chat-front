"use server"

import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

export async function saveUserProfile(formData: FormData) {
    const session = await auth()
    if (!session || !session.user) {
        throw new Error("Não autenticado")
    }

    const phoneNumber = formData.get("phoneNumber") as string

    if (!phoneNumber) {
        throw new Error("Número de telefone é obrigatório")
    }

    const userData = {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        phoneNumber: phoneNumber,
    }

    // TODO: Send to backend (n8n or other)
    console.log("Saving user data to backend:", userData)

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
    // Example call (commented out until real backend provided)
    // await fetch(`${backendUrl}/users`, {
    //   method: "POST",
    //   body: JSON.stringify(userData),
    //   headers: { "Content-Type": "application/json" }
    // })

    // For now, we just redirect to chat
    // In a real app, we would update the session or DB state so the check passes next time

    redirect("/chat?profileCompleted=true")
}

export async function handleSignOut() {
    await signOut()
}
