import LoginForm from "@/components/LoginForm"

const Login = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-white">
			<div className="bg-white shadow-md rounded p-8 max-w-md w-full mx-auto">
				<h2 className="text-2xl font-bold mb-4 text-blue-900">Login</h2>
				<LoginForm />
			</div>
		</div>
	)
}

export default Login
