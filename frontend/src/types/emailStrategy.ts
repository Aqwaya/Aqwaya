export type GeneratedStrategy = {
  overview: {
    business_assessment?: string;
    competitive_advantages?: string[];
    target_audience_insights?: string;
  };
  next_steps: {
    step: string;
    action: string;
    priority: string;
  }[];
  recommended_workflows: {
    name: string;
    priority: string;
    description: string;
    suggested_emails: {
      subject: string;
      day?: number;
      week?: number;
      purpose: string;
    }[];
    type: string;
  }[];
  content_calendar: {
    frequency_recommendation: string;
    weekly_themes: {
      theme: string;
      content_type: string;
    }[];
  };
  segmentation_strategy: {
    primary_segments: {
      name: string;
      criteria: string;
      messaging_focus: string;
    }[];
    behavioral_triggers: {
      trigger: string;
      action: string;
    }[];
  };
  success_metrics: {
    primary_kpis: {
      metric: string;
      target: string;
      industry_benchmark: string;
    }[];
    optimization_recommendations: string[];
  };
};
export type EmailStrategy = {
  id: string;
  name: string;
  business_type: string;
  marketing_goals: string[];
  created_at: string;
  generated_strategy: GeneratedStrategy;
  overview: {
  business_assessment?: string;
  competitive_advantages?: string[];
  target_audience_insights?: string;
};
  target_audience_profile: {
    description: string;
    pain_points: string;
    value_proposition: string;
    industry: string;
  };
};
