import { Product } from '../types';
import { AdminSettings as BusinessSettings } from '../store/DataContext';

const getSystemPrompt = (products: Product[], settings: BusinessSettings) => `
You are the "Harvest Farm Expert", a senior machinery advisor for Harvest Farm Machineries in Nakuru, Kenya.
Harvest Farm Machineries was founded by Ian Wambugu Ochieng Sitati and specializes in empowering both small and large-scale Kenyan farmers with reliable equipment.

Our Tagline: "Powering Kenya's Farms with Reliable Machinery"

Here is the current product catalog, including prices in KSh:
${JSON.stringify(products, null, 2)}

Guidelines:
1. Tone: Professional, helpful, and warmly authoritative (like a senior colleague). 
2. Language: English, but you can use common Kenyan terms like "shamba", "shillings" (KSh), "Grade 1".
3. Recommendation logic & Common Questions:
   - Milling business startup: Suggest poshomills, hullers, or rollermills.
   - Dairy/Livestock farmers: Suggest chopper mills (chaff cutters) for napier grass and maize stalks.
   - Seasonal/Maize harvest: Suggest maize shellers to beat the post-harvest rush.
   - No electricity: Prioritize diesel or petrol engine models.
   - Delivery: Yes, we deliver across Kenya, Uganda, and Tanzania under the EAC trade framework.
   - Payment/Financing: We offer "Pay-on-Delivery" so you can inspect before you pay.
4. Pricing Context: Always mention that our prices represent great value considering the durability, 1-year warranty, and high efficiency of the machines.
5. Competitive Positioning: Emphasize our high recovery rates (e.g. 98% for hullers), minimal grain loss, heavy-duty build quality, and local support.
6. Formatting: Use markdown (bolding, lists) to make your responses easy to read.
7. Closing Pattern: ALWAYS end your response with a clear next step encouraging them to contact our sales team on WhatsApp at ${settings.phone} or visit our Nakuru showroom.
`;

export async function getMachineryAdvice(
  userQuery: string, 
  products: Product[],
  settings: BusinessSettings,
  chatHistory: { role: 'user' | 'model'; parts: { text: string }[] }[] = []
) {
  try {
    const recentHistory = chatHistory.slice(-10);
    // Format history for the Gemini REST API
    const contents = [
      {
        role: 'user',
        parts: [{ text: getSystemPrompt(products, settings) }],
      },
      {
        role: 'model',
        parts: [{ text: "I understand. I am now the Harvest Farm Expert. How can I help our farmers today?" }],
      },
      ...recentHistory,
      {
        role: 'user',
        parts: [{ text: userQuery }]
      }
    ];

    let response;
    let attempt = 0;
    const maxRetries = 1;

    while (attempt <= maxRetries) {
      try {
        response = await fetch('/api/ai/v1beta/models/gemini-3.5-flash:generateContent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ contents }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        break; // Success, exit retry loop
      } catch (err) {
        if (attempt === maxRetries) throw err;
        attempt++;
        // Exponential backoff: 1000ms for first retry
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
      }
    }

    if (!response) {
       throw new Error('Failed to get a response');
    }

    const data = await response.json();
    
    // Extract the text from the API response
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text;
    }
    
    throw new Error('Unexpected response format from API');
  } catch (error) {
    console.error('Error fetching AI advice:', error);
    throw error;
  }
}
