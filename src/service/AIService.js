// OpenRouter API - No rate limits on free models!
import OpenAI from 'openai'

const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY

const openai = apiKey ? new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // Required for browser usage
}) : null

export const generateTripPlan = async (prompt) => {
    if (!openai) {
        throw new Error("API key not configured. Please add VITE_OPENROUTER_API_KEY to your .env file.")
    }

    try {
        console.log("Calling OpenRouter API...")

        const completion = await openai.chat.completions.create({
            model: "tngtech/deepseek-r1t2-chimera:free", // Free model from user's example
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

        if (error.message?.includes('JSON')) {
            throw new Error("AI response was not valid JSON. Please try again.")
        }
        throw error
    }
}

export const isApiConfigured = () => {
    return !!apiKey
}
