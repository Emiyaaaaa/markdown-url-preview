"use client";
import { useState } from "react";

export default function Input() {
	const [value, setValue] = useState("");

	return (
		<>
			<main className="input-container">
				<div className="input-wrapper">
					<input
						placeholder="https://example.md"
						autoFocus
						className=""
						onChange={(e) => setValue(e.target.value)}
					/>
					<button type="button">
						<a href={`/?url=${value}`}>GO</a>
					</button>
				</div>
				<p>
					Input a online markdown file uri, get a online preview markdown link.
				</p>
				<br />
				<div className="example">
					<strong>Example: </strong>
					<p>
						Github profile:{" "}
						<a href="/?url=https://github.com/Emiyaaaaa/Emiyaaaaa/blob/main/README.md">
							https://github.com/Emiyaaaaa/Emiyaaaaa/blob/main/README.md
						</a>
					</p>
					<p>
						Github markdown:{" "}
						<a href="/?url=https://github.com/Emiyaaaaa/markdown-url-preview/blob/main/README.md">
							https://github.com/Emiyaaaaa/markdown-url-preview/blob/main/README.md
						</a>
					</p>
					<p>
						Npm package markdown:{" "}
						<a href="/?url=https://unpkg.com/next-routes-list@latest/README.md">
							https://unpkg.com/next-routes-list@latest/README.md
						</a>
					</p>
				</div>
			</main>
		</>
	);
}
