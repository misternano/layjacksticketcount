import { useState, useEffect } from "preact/hooks"
import "./index.css"
import { Minus, Plus, RotateCw, Zap } from "lucide-react";

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
			<main className="mt-36 flex flex-col items-center">
				<p className="font-bold">Layjack's Ticket Count</p>
				<section className="flex flex-col gap-4 mt-16">
					<div className="bg-neutral-800 p-4 px-10 rounded-xl text-center">
						<span>ticket count is</span>
						<p className="text-yellow-500 font-bold text-2xl">{count}</p>
					</div>
					<div className="flex flex-row gap-4">
						<button className="group flex flex-row gap-1 items-center p-2 px-8 rounded-xl outline bg-green-400/10 outline-green-400 hover:bg-green-500/10 transition-all" onClick={() => updateCount(count + 1)}>
							<Plus size={16} className="group-hover:scale-115 group-hover:rotate-3 stroke-green-300" /> 1
						</button>
						<button className="group flex flex-row gap-1 items-center p-2 px-8 rounded-xl outline bg-red-400/10 outline-red-400 hover:bg-red-500/10 transition-all" onClick={() => updateCount(count - 1)}>
							<Minus size={16} className="group-hover:scale-115 group-hover:-rotate-3 stroke-red-300" /> 1
						</button>
					</div>
					<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-row gap-4 items-center rounded-lg bg-neutral-800 p-2 outline-neutral-700 outline-2">
						<button className="group flex flex-row items-center gap-2 outline-1 outline-red-400 bg-red-400/10 hover:bg-red-500/10 rounded-md py-1 pl-3 pr-4" onClick={() => updateCount(0)}>
							<RotateCw size={16} className="group-hover:animate-spin stroke-red-400" /> Reset Counter
						</button>
						<a href="https://nanos.club" target="noopen norel" className="bg-neutral-700 rounded-full p-2">
							<Zap size={20} className="stroke-[#ecba16] hover:scale-125 hover:rotate-6 transition-all" />
						</a>
						<div className="flex flex-row gap-2 items-center">
							<span>Set Counter:</span>
							<input className="w-[7ch] bg-neutral-700 px-2 rounded-md" type="number" value={count} onInput={e => updateCount(parseInt((e.target as HTMLInputElement).value || "0"))} />
						</div>
					</div>
				</section>
			</main>
		</>
	)
}
