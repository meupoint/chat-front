import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { saveUserProfile } from "../actions"

export default async function CompleteProfilePage() {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Complete seu Perfil
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Por favor, forneça seu número de telefone para continuar.
                    </p>
                </div>

                <form action={saveUserProfile} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="phoneNumber" className="item-center block text-sm font-medium text-gray-700">
                                Número de Telefone
                            </label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="+55 11 99999-9999"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-lg border border-transparent bg-orange-600 px-4 py-3 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
                        >
                            Salvar e Continuar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
