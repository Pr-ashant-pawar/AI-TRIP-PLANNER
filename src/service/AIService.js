// OpenRouter API Service - Dedicated to OpenRouter with Model Fallback
// Documentation: https://openrouter.ai/docs/api-reference

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

// List of free models to try in order
// Sometimes specific models have rate limits or downtime, so we fallback
const MODELS = [
    "google/gemini-2.0-flash-exp:free", // Often most reliable/fastest
    "meta-llama/llama-3.3-70b-instruct:free",
    "tngtech/deepseek-r1t2-chimera:free",
    "google/gemma-2-9b-it:free"
]

export const generateTripPlan = async (prompt, userKey) => {
    // 1. Get API Key & Clean it
    const envKey = import.meta.env.VITE_OPENROUTER_API_KEY
    let apiKey = (envKey || userKey || "").trim()

    if (!apiKey) {
        throw new Error("API Key is missing. Please click the key icon in the header and enter your OpenRouter API Key.")
    }

    // 2. Client-side Validation
    if (!apiKey.startsWith('sk-or-')) {
        console.error("Invalid key format detected:", apiKey.substring(0, 8) + "...")
        throw new Error(`Invalid Key Format. OpenRouter keys must start with 'sk-or-'. You provided: ${apiKey.substring(0, 5)}...`)
    }

    // 3. Try models in sequence until one works
    let lastError = null

    for (const model of MODELS) {
        try {
            console.log(`Trying model: ${model}...`)
            return await makeRequest(apiKey, model, prompt)
        } catch (error) {
            console.warn(`Failed with model ${model}:`, error)
            lastError = error

            // If it's an Auth error (401), stopping trying other models - the key is wrong
            if (error.message.includes('401') || error.message.includes('Authentication')) {
                throw error
            }
        }
    }

    throw lastError || new Error("All models failed to generate a response. Please check your network or try again later.")
}

const makeRequest = async (apiKey, model, prompt) => {
    const requestBody = {
        model: model,
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.8,
        max_tokens: 4096,
        // Add extra parameters that might help with free tier stability
        top_p: 0.9,
        repetition_penalty: 1.1
    }

    try {
        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.href, // Use exact current URL
                'X-Title': 'AI Trip Planner',
            },
            body: JSON.stringify(requestBody)
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            console.error(`API Error (${model}):`, errorData)

            // Specific Error Handling
            if (response.status === 401) {
                throw new Error(`Authentication Failed (401). OpenRouter rejected the key. \nTip: Ensure you have no extra spaces and the key is 'active' on openrouter.ai/keys.`)
            }
            if (response.status === 402) {
                throw new Error("Insufficient Credits. Even for free models, some accounts might need a minimal credit set up.")
            }
            if (response.status === 429) {
                throw new Error("Rate Limit Exceeded. OpenRouter free tier is busy. Retrying with next model...")
            }

            throw new Error(errorData.error?.message || `API Error: ${response.status}`)
        }

        const data = await response.json()

        const text = data.choices?.[0]?.message?.content
        if (!text) {
            throw new Error("Empty response from AI")
        }

        // Clean and Parse JSON
        return parseJsonLike(text)

    } catch (error) {
        throw error // Pass up to the loop
    }
}

const parseJsonLike = (text) => {
    let clean = text.trim()
    const start = clean.indexOf('{')
    const end = clean.lastIndexOf('}')

    if (start !== -1 && end !== -1) {
        clean = clean.substring(start, end + 1)
    }

    // Remove markdown code blocks if present
    clean = clean.replace(/```json/g, '').replace(/```/g, '')

    try {
        return JSON.parse(clean)
    } catch (e) {
        console.error("JSON Parse Error. Raw text:", text)
        throw new Error("AI generated text that couldn't be parsed as JSON. Please try again.")
    }
}
