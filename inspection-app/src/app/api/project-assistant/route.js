export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { query, modelInfos } = req.body;
  
    // You can safely stringify the modelInfos to let the assistant read it
    const modelInfoSummary = JSON.stringify(modelInfos, null, 2);
  
    const systemPrompt = `
  You are a smart assistant helping the user debug and understand a 3D viewer built with React, Three.js, and gsap.
  
  This project includes:
  - FBX model loading
  - Dynamic textures
  - gsap camera animation
  - Camera positions from modelInfos
  - An info panel showing defects
  
  Here is the actual modelInfos JSON for context:
  ${modelInfoSummary}
  
  Respond helpfully and concisely based on this context.
  `;
  
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query },
        ],
      }),
    });
  
    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content ?? 'No response.';
  
    return res.status(200).json({ answer });
  }
  