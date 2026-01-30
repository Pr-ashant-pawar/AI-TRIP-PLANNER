// OpenRouter API - No rate limits on free models!
import OpenAI from 'openai'

// Use environment variable if available, otherwise use hardcoded key for GitHub Pages demo
const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || "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"

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apiKey,
    dangerouslyAllowBrowser: true, // Required for browser usage
    defaultHeaders: {
        "HTTP-Referer": window.location.origin, // Required for OpenRouter rankings
        "X-Title": "AI Trip Planner", // Optional
    }
})

export const generateTripPlan = async (prompt) => {
    if (!apiKey) {
        throw new Error("API key not configured.")
    }

    try {
        console.log("Calling OpenRouter API...")

        // Explicitly enabling browser usage for client-side app
        const completion = await openai.chat.completions.create({
            model: "tngtech/deepseek-r1t2-chimera:free", // Free model
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.8,
            max_tokens: 4096,
            // Adding headers explicitly to the request config as well just in case
            headers: {
                "HTTP-Referer": "https://pr-ashant-pawar.github.io/AI-TRIP-PLANNER",
                "X-Title": "AI Trip Planner"
            }
        })

        const text = completion.choices[0]?.message?.content
        if (!text) {
            throw new Error("Empty response from AI")
        }

        console.log("API Response received successfully!")
        console.log("Raw response:", text.substring(0, 200))

        // Parse JSON response
        let cleanedResponse = text.trim()

        // Remove any thinking/reasoning text before JSON
        const jsonStartIndex = cleanedResponse.indexOf('{')
        if (jsonStartIndex > 0) {
            cleanedResponse = cleanedResponse.substring(jsonStartIndex)
        }

        // Remove markdown code blocks if present
        if (cleanedResponse.startsWith("```json")) {
            cleanedResponse = cleanedResponse.slice(7)
        } else if (cleanedResponse.startsWith("```")) {
            cleanedResponse = cleanedResponse.slice(3)
        }
        if (cleanedResponse.endsWith("```")) {
            cleanedResponse = cleanedResponse.slice(0, -3)
        }
        cleanedResponse = cleanedResponse.trim()

        // Try to extract JSON from the response
        const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
            cleanedResponse = jsonMatch[0]
        }

        return JSON.parse(cleanedResponse)

    } catch (error) {
        console.error("Error generating trip:", error)
        console.error("Error Details:", error.response?.data || error.message)

        if (error.message?.includes('JSON')) {
            throw new Error("AI response was not valid JSON. Please try again.")
        }

        // Explicitly handle 401
        if (error.status === 401) {
            throw new Error("API Authentication failed. Please check your API key.")
        }

        throw error
    }
}

export const isApiConfigured = () => {
    return !!apiKey
}
