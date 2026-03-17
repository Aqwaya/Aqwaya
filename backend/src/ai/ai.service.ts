import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async getMockResponse(prompt: string, details: any) {
    await new Promise(res => setTimeout(res, 1200));

    // 1. Check for the key 'UPDATE_INDUSTRY' (matching your button action type)
    if (!details || !details.UPDATE_INDUSTRY) {
      return {
        text: "I see you're starting a new campaign! To give you the best advice, could you tell me which industry your business belongs to?",
        suggestions: [
          { label: 'E-commerce', action: 'UPDATE_INDUSTRY', value: 'ecommerce' },
          { label: 'SaaS / Tech', action: 'UPDATE_INDUSTRY', value: 'saas' },
          { label: 'Real Estate', action: 'UPDATE_INDUSTRY', value: 'real-estate' }
        ]
      };
    }

    // 2. If Industry exists, but Channel is missing, move to the next question
    if (!details.SET_CHANNEL) {
      const industryName = details.UPDATE_INDUSTRY;
      return {
        text: `Since you are in ${industryName}, I recommend a lead-generation campaign. Should we focus on Email or Social Media?`,
        suggestions: [
          { label: 'Focus on Email', action: 'SET_CHANNEL', value: 'email' },
          { label: 'Social Media Ads', action: 'SET_CHANNEL', value: 'social' }
        ]
      };
    }

    // 3. Final state reached
    return {
      text: `Great choice! I'm now setting up your ${details.SET_CHANNEL} strategy for the ${details.UPDATE_INDUSTRY} sector. Ready to see the draft?`,
      suggestions: [
        { label: 'Yes, show me', action: 'COMPLETE', value: true }
      ]
    };
  }
}