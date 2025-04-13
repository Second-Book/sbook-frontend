import { CredentialsType, UserDataType } from "@/utils/types"
import apiClient from "./api"
import { UserStore } from "@/stores/userStore"

const authService = {
	async login(credentials: CredentialsType, store: UserStore) {
		try {
			console.log(credentials)
			const response = await apiClient.post("/token/", credentials)
			const userResponse = await apiClient.get<UserDataType>("/users/me/", {
				headers: {
					Authorization: `Bearer ${response.data.access}`,
				},
			})

			localStorage.setItem("access_token", response.data.access)
			console.log("access_token", response.data.access)
			localStorage.setItem("refresh_token", response.data.refresh)
			store.setAuthentication(true)
			store.setUser(userResponse.data)
			return response.data
		} catch (error) {
			console.error("Login failed:", error)
			throw error
		}
	},

	async refreshToken() {
		try {
			const refreshToken = localStorage.getItem("refresh_token")
			const response = await apiClient.post("/token/refresh/", {
				refresh: refreshToken,
			})
			localStorage.setItem("access_token", response.data.access)
			return response.data
		} catch (error) {
			console.error("Token refresh failed:", error)
			throw error
		}
	},

	async signup(credentials: CredentialsType) {
		try {
			const response = await apiClient.post("/signup/", credentials)
			return response.data
		} catch (error) {
			console.error("Signup failed:", error)
			throw error
		}
	},
}

export default authService
