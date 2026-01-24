import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";

interface ColorScheme {
  id: string;
  name: string;
  colors: string[];
}

interface Props {
  colorSchemes: ColorScheme[];
  formData: {
<<<<<<< HEAD
    colorScheme: string;
=======
    colorScheme?: string;
>>>>>>> 31ab30e (update)
  };
  handleInputChange: (field: string, value: string) => void;
}

const ColorSchemeStep: React.FC<Props> = ({
  colorSchemes,
  formData,
  handleInputChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Pick Your Color Scheme</h2>
        <p className="text-gray-600">Choose colors that represent your brand</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colorSchemes.map((scheme) => (
          <Card
            key={scheme.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              formData.colorScheme === scheme.id
                ? "ring-2 ring-blue-500 bg-blue-50"
                : "hover:bg-gray-50"
            }`}
            onClick={() => handleInputChange("colorScheme", scheme.id)}
          >
            <CardHeader className="text-center pb-3">
              <div className="flex justify-center mb-3">
                <Palette className="w-8 h-8 text-gray-600" />
              </div>
              <CardTitle className="text-lg">{scheme.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-2 mb-3">
                {scheme.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ColorSchemeStep;
