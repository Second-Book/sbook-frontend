"use client"

import { useRouter } from 'next/navigation'
import useUserStore from '@/hooks/useUserStore'
import authService from '@/services/authService'
import { useState } from 'react'

const LoginForm = () => {
    const router = useRouter()
    const store = useUserStore((state) => state)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        const formData = new FormData(e.currentTarget)
        const credentials = {
            username: (formData.get("username") as string) || "",
            password: (formData.get("password") as string) || "",
        }
        try {
            await authService.login(credentials, store)
            router.push("/textbooks")
        } catch {
            setError("Incorrect username or password")
        }
    }

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-zinc-400 font-bold mb-2">Username:</label>
                <input name="username" required className="w-full border border-zinc-300 rounded py-2 px-4 leading-tight focus:outline-none focus:border-zinc-500" />
            </div>
            <div>
                <label htmlFor="password" className="block text-zinc-400 font-bold mb-2">Password:</label>
                <input name="password" type="password" required className="w-full border border-zinc-300 rounded py-2 px-4 leading-tight focus:outline-none focus:border-zinc-500" />
            </div>
            <button type="submit" className="bg-red-800 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:bg-red-700">Login</button>
            {error && <p v-if="errorMessage" className="text-red-500 mt-2">{error}</p>}
        </form>
    )
}

export default LoginForm