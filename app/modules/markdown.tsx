"use client";
import "github-markdown-css/github-markdown.css";
import { useEffect, useState } from "react";
import { parseGithubMarkdown, parseMarkdown } from "../utils";

export const revalidate = 600;

export default function Markdown(props: { url: string }) {
	const [__html, setMarkdownHtml] = useState<string>();
	const [error, setError] = useState<string>();

	const fetchMarkdownData = async (
		url: string,
	): Promise<{ data?: string; error?: string }> => {
		// client fetch
		const clientResult = await fetch(props.url, {
			signal: AbortSignal.timeout(10000),
		})
			.then((res) => {
				if (!res.ok) return undefined;
				return res.text();
			})
			.catch(() => undefined);

		if (clientResult) return { data: clientResult };

		// server fetch
		const serverRes = await fetch(`/api/fetch?url=${url}`).catch(
			() => undefined,
		);
		if (!serverRes) return { error: "Network error: unable to reach server" };

		const json = await serverRes.json().catch(() => undefined);
		if (!serverRes.ok || !json?.data) {
			return {
				error:
					json?.error ?? `Failed to fetch markdown (${serverRes.status})`,
			};
		}

		return { data: json.data };
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchMarkdownData(props.url).then((result) => {
			if (result.error || !result.data) {
				setError(result.error ?? "Failed to load markdown content");
				return;
			}

			let __html: string;

			// Github url
			if (result.data.trimStart().startsWith("<!DOCTYPE html>")) {
				__html =
					parseGithubMarkdown(result.data, props.url) ??
					"<div>Can not find markdown</div>";
			} else {
				// normal markdown
				console.log(result.data);
				__html = parseMarkdown(result.data);
				console.log(__html);
			}

			setMarkdownHtml(__html);
		});
	}, [props.url]);

	if (error) {
		return (
			<main className="markdown-body">
				<div className="fetch-error">
					<h2>Failed to load markdown</h2>
					<p>{error}</p>
					<p>
						URL: <code>{props.url}</code>
					</p>
				</div>
			</main>
		);
	}

	if (!__html) return null;

	return (
		<>
			<main className="markdown-body">
				<div dangerouslySetInnerHTML={{ __html }} />
			</main>
			<footer className="powered-by">
				<a href="https://github.com/Emiyaaaaa/markdown-url-preview">
					markdown-url-preview
				</a>
				<span> powered by </span>
				<a href="https://github.com/Emiyaaaaa">emiya</a>
			</footer>
		</>
	);
}
