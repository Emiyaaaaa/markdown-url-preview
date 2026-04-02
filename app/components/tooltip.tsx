"use client";
import { type ReactNode, useRef, useState } from "react";
import "./tooltip.css";

interface TooltipProps {
	content: ReactNode;
	children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
	const [visible, setVisible] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

	const show = () => {
		clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => setVisible(true), 300);
	};

	const hide = () => {
		clearTimeout(timeoutRef.current);
		setVisible(false);
	};

	return (
		<div className="tooltip-wrapper" onMouseEnter={show} onMouseLeave={hide}>
			{children}
			{visible && <div className="tooltip-bubble">{content}</div>}
		</div>
	);
}
