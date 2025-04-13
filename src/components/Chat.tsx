import useUserStore from "@/hooks/useUserStore"
import { Message } from "@/utils/types"
import { useState, useRef, useEffect, FormEvent } from "react"

const roomName = "jaime12"

const Chat = () => {
	const { user } = useUserStore((state) => state)
	const [messages, setMessages] = useState<Message[]>([])
	const [messageInput, setMessageInput] = useState("")
	const wsRef = useRef<WebSocket | null>(null)

	useEffect(() => {
		console.log(user)
		if (user) {
			const url = `ws://localhost:8000/chat/${roomName}/?token=${localStorage.getItem(
				"access_token"
			)}`
			const ws = new WebSocket(url)
			wsRef.current = ws
			ws.onopen = () => console.log("Connection successful")
			ws.onmessage = (event) => {
				const parsedData = JSON.parse(event.data) as Message
				setMessages((prev) => [...prev, parsedData])
			}
		}

		return () => {
			if (wsRef.current) {
				wsRef.current.close()
			}
		}
	}, [user])

	useEffect(() => console.log(messages), [messages])

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (wsRef.current?.readyState === WebSocket.OPEN) {
			wsRef.current.send(
				JSON.stringify({ message: messageInput, sender_id: user?.id })
			)
			setMessageInput("")
		} else {
			console.log("Connection closed: ", wsRef.current)
		}
	}

	return (
		<section className="w-150 max-w-full h-[80vh] flex flex-col bg-rose-100 mx-auto">
			<div className="overflow-y-auto grow">
				<div className="w-full flex flex-col gap-2 py-2 px-2">
					{messages.map((message) => (
						<div
							key={`${message.sender_id}_${message.message}`}
							className={`p-4 max-w-9/10 bg-[#f2f2f2] rounded-2xl ${
								message.sender_id === user?.id
									? " bg-rose-800 text-white self-end"
									: "self-start"
							}`}>
							{message.message}
						</div>
					))}
				</div>
			</div>
			<form
				onSubmit={handleSubmit}
				className="h-20 shrink-0 bg-gray-300 flex items-center rounded-t-xl gap-2 px-4">
				<input
					type="text"
					value={messageInput}
					onChange={(e) => setMessageInput(e.target.value)}
					className="grow h-8 pl-4 bg-white rounded-full"
				/>
				<button
					type="submit"
					className="h-8 px-4 bg-rose-800 text-white rounded-full hover:cursor-pointer">
					Send
				</button>
			</form>
		</section>
	)
}

export default Chat
