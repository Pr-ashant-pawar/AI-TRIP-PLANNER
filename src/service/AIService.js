// OpenRouter API - Direct fetch implementation to avoid SDK issues
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

export const generateTripPlan = async (prompt, userKey) => {
    // Use environment variable first (for local dev), then custom key
    // TRIM the key to remove accidental whitespace from copy-pasting
    const apiKey = (import.meta.env.VITE_OPENROUTER_API_KEY || userKey || "").trim()

    if (!apiKey) {
        throw new Error("API Key is missing. Please click the key icon in the header and enter your OpenRouter API Key.")
    }

    // Validate key format (basic check)
    if (!apiKey.startsWith('sk-or-')) {
        console.warn("Key does not start with sk-or-, it might be invalid:", apiKey.substring(0, 5) + "...")
    }

    const requestBody = {
        model: "tngtech/deepseek-r1t2-chimera:free", // Free model
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.8,
        max_tokens: 4096
    }

    try {
        console.log("Calling OpenRouter API via fetch...")

        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin, // Required for OpenRouter rankings
                'X-Title': 'AI Trip Planner'
            },
            body: JSON.stringify(requestBody)
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            console.error("API Error Response:", errorData)

            if (response.status === 401) {
                throw new Error(`Authentication failed (401). Please check your API Key. Ensure it starts with 'sk-or-'.`)
            }
            if (response.status === 402) {
                throw new Error("Insufficient credits. Although this model is free, verify your OpenRouter account status.")
            }

            throw new Error(errorData.error?.message || `API Error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        console.log("API Response received successfully!")

        const text = data.choices?.[0]?.message?.content
        if (!text) {
            throw new Error("Empty response from AI")
        }

        // Parse JSON logic
        let cleanedResponse = text.trim()

        const jsonStartIndex = cleanedResponse.indexOf('{')
        if (jsonStartIndex > 0) {
            cleanedResponse = cleanedResponse.substring(jsonStartIndex)
        }

        if (cleanedResponse.startsWith("```json")) {
            cleanedResponse = cleanedResponse.slice(7)
        } else if (cleanedResponse.startsWith("```")) {
            cleanedResponse = cleanedResponse.slice(3)
        }
        if (cleanedResponse.endsWith("```")) {
            cleanedResponse = cleanedResponse.slice(0, -3)
        }
        cleanedResponse = cleanedResponse.trim()

        const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
            cleanedResponse = jsonMatch[0]
        }

        return JSON.parse(cleanedResponse)

    } catch (error) {
        console.error("Error generating trip:", error)
        throw error
    }
}

export const isApiConfigured = () => {
    // We don't rely only on the env var anymore
    return true
}
