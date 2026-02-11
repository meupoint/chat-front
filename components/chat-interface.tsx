"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { handleSignOut } from "@/app/actions"

type Message = {
    id: string
    role: "user" | "assistant"
    content: string
}

export function ChatInterface({ userName }: { userName: string }) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: `Olá ${userName}! Como posso ajudar você hoje?`,
        },
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            // Call authentication/backend API here
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input }),
            })

            if (!response.ok) throw new Error("Falha ao enviar mensagem")

            const data = await response.json()

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.reply || "Desculpe, não consegui processar isso.",
            }

            setMessages((prev) => [...prev, botMessage])
        } catch (error) {
            console.error("Error:", error)
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Desculpe, algo deu errado. Por favor, tente novamente.",
            }
            setMessages((prev) => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            <header className="flex-none bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <Bot className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">Assistente de IA</h1>
                        <p className="text-xs text-green-500 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                            Online
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => handleSignOut()}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                    title="Sair"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </header>

            {/* Messages Area */}
            <main className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={cn(
                            "flex w-full",
                            message.role === "user" ? "justify-end" : "justify-start"
                        )}
                    >
                        <div
                            className={cn(
                                "flex max-w-[80%] md:max-w-[70%] rounded-2xl p-4 shadow-md",
                                message.role === "user"
                                    ? "bg-orange-600 text-white rounded-tr-none"
                                    : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                            )}
                        >
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-1">
                                    {message.role === "assistant" ? (
                                        <Bot className="w-5 h-5" />
                                    ) : (
                                        <User className="w-5 h-5" />
                                    )}
                                </div>
                                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                                    {message.content}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex w-full justify-start">
                        <div className="flex max-w-[80%] md:max-w-[70%] rounded-2xl p-4 shadow-md bg-white text-gray-800 rounded-tl-none border border-gray-100">
                            <div className="flex items-center space-x-2">
                                <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                                <span className="text-sm text-gray-500">Pensando...</span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>

            {/* Input Area */}
            <footer className="flex-none p-4 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto relative">
                    <form onSubmit={handleSubmit} className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Digite sua mensagem..."
                            className="w-full pl-4 pr-12 py-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm transition-all"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="absolute right-2 top-2 p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                    <p className="text-center text-xs text-gray-400 mt-2">
                        A IA pode cometer erros. Considere verificar informações importantes.
                    </p>
                </div>
            </footer>
        </div>
    )
}
