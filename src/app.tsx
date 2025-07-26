import { useState, useEffect } from "preact/hooks"
import "./app.css"

export function App() {
	const [count, setCount] = useState(() => {
		const stored = sessionStorage.getItem("count")
		return stored ? parseInt(stored) : 0
	})
	
	const updateCount = (value: number) => {
		setCount(value)
		sessionStorage.setItem("count", value.toString())
	}
	
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "0" || "space") updateCount(count + 1)
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [count])
	
	return (
		<>
			<div class="card">
				<p>Layjack's Ticket Count</p>
				<button onClick={() => updateCount(count + 1)}>
					count is {count}
				</button>
			</div>
		</>
	)
}
