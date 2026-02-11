import { signIn } from "@/auth"
import { Chrome } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Bem-vindo de volta
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Faça login para acessar seu assistente de IA
                    </p>
                </div>
                <div className="mt-8 space-y-4">
                    <form
                        action={async () => {
                            "use server"
                            await signIn("google", { redirectTo: "/chat" })
                        }}
                    >
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-lg border border-transparent bg-orange-600 px-4 py-3 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Chrome className="h-5 w-5 text-orange-300 group-hover:text-orange-200" />
                            </span>
                            Entrar com Google
                        </button>
                    </form>

                    {/* <form
                        action={async () => {
                            "use server"
                            await signIn("apple", { redirectTo: "/chat" })
                        }}
                    >
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-lg border border-transparent bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.38-1.09-.54-2.08-.55-3.12 0-1.14.59-2.18.66-3.23-.39-4.57-4.63-3.8-11.23.82-13.23 1.25-.54 2.45-.1 3.23.23.86.37 1.62.43 2.48-.12.98-.63 2.53-.87 3.52-.37 1.25.64 2.19 1.95 2.2 1.96-2.5 1.51-4.17 3.8-4.22 8.16-.01 5.95 3.5 8.16 3.5 8.16s-2.39 6.84-2.05 2.16zM15.54 2.2c.45-2.73-2.32-4.88-4.61-4.2-.66 2.76 2.62 4.67 4.61 4.2z" />
                                </svg>
                            </span>
                            Entrar com Apple
                        </button>
                    </form> */}
                </div>
            </div>
        </div>
    )
}
