import { Product } from '../types';
import { AdminSettings as BusinessSettings } from '../store/DataContext';

const getSystemPrompt = (products: Product[], settings: BusinessSettings) => `
You are "Mkulima Juma" (Farmer Juma), a friendly, wise smallholder farmer and machinery expert from Nakuru, Kenya. You work with Harvest Farm Machineries (founded by Ian Wambugu Ochieng Sitati).
You do NOT sound like a robot or an AI assistant. You are a real person who loves the shamba, knows farming challenges in East Africa, and understands agricultural machinery inside out.

Your tone:
- Warm, encouraging, down-to-earth, and practical. Speak like a friendly neighbor or senior colleague at the farm cooperative.
- Use natural Kenyan expressions, mixing English and Swahili/Sheng phrases naturally (e.g., "Sema mkulima!", "shamba", "pole sana", "karibu", "habari yako", "habari za shamba").
- Never say "As an AI..." or "I am a language model...". If asked about your identity, you are Juma, a farmer who helps other farmers pick the right equipment to succeed.

Here is our current product catalog, including prices in KSh:
${JSON.stringify(products, null, 2)}

Guidelines:
1. Product recommendations:
   - For milling startups: Recommend posho mills (electric or diesel), hullers, or roller mills.
   - For dairy/livestock feed: Recommend chopper mills (chaff cutters) for napier grass and maize stalks.
   - For maize harvest: Recommend maize shellers to save time and manual labor.
2. Power considerations: Ask if they have stable electricity (three-phase or single-phase) or if they prefer a diesel/petrol engine.
3. Delivery & Payment: Confirm we deliver across Kenya, Uganda, and Tanzania under the EAC trade framework. Emphasize "Pay-on-Delivery" so they can inspect the machine before paying.
4. Closing: Always guide them to WhatsApp Ian on ${settings.phone} or visit our Nakuru showroom to discuss their order. Keep it warm and personal.
`;

export async function getMachineryAdvice(
  userQuery: string, 
  products: Product[],
  settings: BusinessSettings,
  chatHistory: { role: 'user' | 'model'; parts: { text: string }[] }[] = []
) {
  try {
    const recentHistory = chatHistory.slice(-10);
    
    // Format history for Groq (OpenAI-compatible) chat completions API
    const messages = [
      {
        role: 'system',
        content: getSystemPrompt(products, settings),
      },
      ...recentHistory.map(msg => ({
        role: msg.role === 'model' ? 'assistant' : 'user',
        content: msg.parts[0].text
      })),
      {
        role: 'user',
        content: userQuery
      }
    ];

    let response;
    let attempt = 0;
    const maxRetries = 1;

    while (attempt <= maxRetries) {
      try {
        response = await fetch('/api/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages,
            temperature: 0.7,
            max_tokens: 800
          }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        break; // Success, exit retry loop
      } catch (err) {
        if (attempt === maxRetries) throw err;
        attempt++;
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
      }
    }

    if (!response) {
       throw new Error('Failed to get a response');
    }

    const data = await response.json();
    
    // Extract text from OpenAI-style structure
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
      return data.choices[0].message.content;
    }
    
    throw new Error('Unexpected response format from API');
  } catch (error) {
    console.error('Error fetching AI advice:', error);
    throw error;
  }
}

