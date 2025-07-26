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
			if (e.key === "0" || e.code === "Space") updateCount(count + 1)
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [count])
	
	return (
		<>
			<div className="card">
				<p className="title">Layjack's Ticket Count</p>
				<section>
					<button onClick={() => updateCount(count + 1)}>
						count is {count}
					</button>
					<button onClick={() => updateCount(count - 1)}>
						-1
					</button>
					<button className="button--reset" onClick={() => updateCount(0)}>
						RESET
					</button>
				</section>
			</div>
		</>
	)
}
