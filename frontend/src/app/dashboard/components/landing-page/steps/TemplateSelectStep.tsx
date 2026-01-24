import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
<<<<<<< HEAD
import {
  Layout,
  TrendingUp,
  Users,
  Play,
  ShoppingCart,
  Calendar,
} from "lucide-react";
=======
import { Layout, TrendingUp, Users, Play, ShoppingCart, Calendar } from "lucide-react";
>>>>>>> 31ab30e (update)

interface Template {
  id: string;
  name: string;
  description: string;
}

interface Props {
  templates: Template[];
  formData: {
    template: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

const TemplateSelectStep: React.FC<Props> = ({ templates, formData, handleInputChange }) => {
  const getTemplateIcon = (templateId: string) => {
    switch (templateId) {
      case "lead-gen": return <Users className="w-8 h-8 text-blue-500" />;
      case "product-launch": return <TrendingUp className="w-8 h-8 text-green-500" />;
      case "event-signup": return <Calendar className="w-8 h-8 text-purple-500" />;
      case "saas-signup": return <Play className="w-8 h-8 text-orange-500" />;
      case "ecommerce": return <ShoppingCart className="w-8 h-8 text-red-500" />;
      case "consultation": return <Layout className="w-8 h-8 text-indigo-500" />;
      default: return <Layout className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Choose Your Template</h2>
        <p className="text-gray-600">Select the template that best matches your goals</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              formData.template === template.id 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => handleInputChange("template", template.id)}
          >
            <CardHeader className="text-center pb-3">
              <div className="flex justify-center mb-3">
                {getTemplateIcon(template.id)}
              </div>
              <CardTitle className="text-lg">{template.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">{template.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelectStep;
