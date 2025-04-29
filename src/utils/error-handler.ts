/**
 * Handle errors and return a structured error message and details.
 * @param error The error to handle.
 * @returns An object containing the error message and details.
 */
export function handleError(error: unknown): {
	message: string;
	details?: string;
} {
	if (error instanceof Error) {
		return {
			message: error.message,
			details: error.stack || "No stack trace available",
		};
	}
	return {
		message: "An unknown error occurred",
		details: JSON.stringify(error, null, 2),
	};
}
