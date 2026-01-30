// OpenRouter API SDK
import OpenAI from 'openai'

// Helper to get client with custom key
const getClient = (customKey) => {
    // Try to use environment variable first (for local dev), then custom key
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || customKey

    if (!apiKey) return null

    return new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
        defaultHeaders: {
            "HTTP-Referer": window.location.origin,
            "X-Title": "AI Trip Planner",
        }
    })
}

export const generateTripPlan = async (prompt, userKey) => {
    const openai = getClient(userKey)

    if (!openai) {
        throw new Error("API Key is missing. Please enter your OpenRouter API Key in the settings or header.")
    }

    try {
        console.log("Calling OpenRouter API...")

        const completion = await openai.chat.completions.create({
            model: "tngtech/deepseek-r1t2-chimera:free", // Free model
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.8,
            max_tokens: 4096
        })

        const text = completion.choices[0]?.message?.content
        if (!text) {
            throw new Error("Empty response from AI")
        }

        // Parse JSON logic (same as before)
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
        if (error.status === 401) {
            throw new Error("Invalid API Key. Please check your OpenRouter API Key.")
        }
        throw error // Re-throw other errors
    }
}
