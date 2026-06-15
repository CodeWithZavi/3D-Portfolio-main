# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# ai-services
- Use Groq API (not Gemini) for chat. The user provided a Groq key explicitly. Confidence: 0.80

# chat-api
- Always return SSE (text/event-stream) from chat API endpoints, even on errors, so the frontend ChatBot displays fallback messages consistently instead of silently dropping non-streaming JSON responses. Confidence: 0.70

