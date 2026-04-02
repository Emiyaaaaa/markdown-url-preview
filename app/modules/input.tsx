"use client";
import { useState } from "react";
import { Tooltip } from "../components/tooltip";
import StarBorder from "../components/star-border";

export default function Input() {
	const [value, setValue] = useState("");
	const [loading, setLoading] = useState(false);

	const handleClick = () => {
		if (!value || loading) return;
		setLoading(true);
		window.location.href = `/?url=${value}`;
	};

	return (
		<>
			<main className="input-container">
				<div className="input-wrapper">
					<input
						placeholder="https://example.md"
						autoFocus
						className=""
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleClick()}
					/>
					{loading ? <span className="spinner" /> :
					<StarBorder as="div" onClick={handleClick} color="white" speed="6s" borderRadius={10}>
						Get Preview Link
					</StarBorder>
					}
				</div>
				<p>
					Input a online markdown file uri, get a online preview markdown link.
				</p>
				<br />
				<br />
				<div className="example">
					<strong>Example: </strong>
					<div className="example-item">
						Github profile:{" "}
						<Tooltip content="Click to try this">
							<span
								className="example-link"
								onClick={() => setValue("https://github.com/Emiyaaaaa/Emiyaaaaa/blob/main/README.md")}
							>
								https://github.com/Emiyaaaaa/Emiyaaaaa/blob/main/README.md
							</span>
						</Tooltip>
					</div>
					<div className="example-item">
						Github markdown:{" "}
						<Tooltip content="Click to try this">
							<span
								className="example-link"
								onClick={() => setValue("https://github.com/Emiyaaaaa/markdown-url-preview/blob/main/README.md")}
							>
								https://github.com/Emiyaaaaa/markdown-url-preview/blob/main/README.md
							</span>
						</Tooltip>
					</div>
					<div className="example-item">
						Npm package markdown:{" "}
						<Tooltip content="Click to try this">
							<span
								className="example-link"
								onClick={() => setValue("https://unpkg.com/next-routes-list@latest/README.md")}
							>
								https://unpkg.com/next-routes-list@latest/README.md
							</span>
						</Tooltip>
					</div>
				</div>
			</main>
		</>
	);
}
