<<<<<<< HEAD
"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LandingPageBuilder from "./LandingPageBuilder";
import {
  ArrowLeft,
  Globe,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react";
=======
// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import LandingPageBuilder from "./LandingPageBuilder";
// import {
//   ArrowLeft,
//   Globe,
//   Plus,
//   Eye,
//   Edit,
//   MoreHorizontal,
//   Loader2,
// } from "lucide-react";

// interface LandingPage {
//   id: number;
//   name: string;
//   status: string;
//   visits: number;
//   conversions: number;
//   conversionRate: string;
//   createdDate: string;
// }

// interface Stats {
//   totalPages: number;
//   totalVisits: number;
//   totalConversions: number;
//   avgConversionRate: string;
// }

// interface LandingPagesOverviewProps {
//   onBack: () => void;
//   onCreateNew?: () => void;
// }

// const LandingPagesOverview = ({ onBack }: LandingPagesOverviewProps) => {
//   const [currentView, setCurrentView] = useState("overview");
//   const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
//   const [stats, setStats] = useState<Stats | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("/api/landing-pages");
//         const data = await res.json();

//         setLandingPages(
//           Array.isArray(data.landingPages) ? data.landingPages : []
//         );
//         setStats(data.stats || null);
//       } catch (err) {
//         console.error("Error fetching landing pages:", err);
//         setLandingPages([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//     if (loading) {
//     return (
//       <div className="flex flex-col justify-center items-center h-screen space-y-3">
//         <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
//         <p className="text-gray-600 text-sm sm:text-base">
//           Loading landing pages...
//         </p>
//       </div>
//     );
//   }

//   // Handle builder view
//   if (currentView === "builder") {
//     return <LandingPageBuilder onBack={() => setCurrentView("overview")} />;
//   }

//   return (
//     <div className="space-y-6 overflow-x-hidden">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
//           <Button
//             variant="outline"
//             onClick={onBack}
//             className="flex items-center space-x-2 w-full sm:w-auto"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             <span>Back</span>
//           </Button>
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center space-x-2">
//               <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500" />
//               <span>Landing Pages</span>
//             </h1>
//             <p className="text-gray-600 text-sm sm:text-base">
//               Manage your landing pages and track their performance
//             </p>
//           </div>
//         </div>
//         <Button
//           variant="default"
//           onClick={() => setCurrentView("builder")}
//           className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Create New
//         </Button>
//       </div>

//       {/* Stats Overview */}
//       {stats && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {[
//             {
//               label: "Total Pages",
//               value: stats.totalPages,
//               icon: <Globe className="w-6 h-6" />,
//               color: "text-orange-600 bg-orange-50",
//             },
//             {
//               label: "Total Visits",
//               value: stats.totalVisits.toLocaleString(),
//               icon: <Eye className="w-6 h-6" />,
//               color: "text-blue-600 bg-blue-50",
//             },
//             {
//               label: "Total Conversions",
//               value: stats.totalConversions.toLocaleString(),
//               icon: <Plus className="w-6 h-6" />,
//               color: "text-green-600 bg-green-50",
//             },
//             {
//               label: "Avg. Conversion Rate",
//               value: stats.avgConversionRate,
//               icon: <Globe className="w-6 h-6" />,
//               color: "text-purple-600 bg-purple-50",
//             },
//           ].map((stat, i) => (
//             <Card key={i}>
//               <CardContent className="p-4 sm:p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">
//                       {stat.label}
//                     </p>
//                     <p className="text-2xl font-bold text-gray-900">
//                       {stat.value}
//                     </p>
//                   </div>
//                   <div
//                     className={`p-3 rounded-full ${stat.color} flex items-center justify-center`}
//                   >
//                     {stat.icon}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Landing Pages List */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Your Landing Pages</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {landingPages.length === 0 ? (
//             <p className="text-gray-600">No landing pages found.</p>
//           ) : (
//             <div className="space-y-4">
//               {landingPages.map((page) => (
//                 <div
//                   key={page.id}
//                   className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
//                       <Globe className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">
//                         {page.name}
//                       </h3>
//                       <p className="text-sm text-gray-600">
//                         Created on {page.createdDate}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm justify-start sm:justify-end">
//                     <div className="text-center">
//                       <p className="font-semibold text-gray-900">
//                         {page.visits.toLocaleString()}
//                       </p>
//                       <p className="text-gray-600 text-xs sm:text-sm">Visits</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="font-semibold text-gray-900">
//                         {page.conversions}
//                       </p>
//                       <p className="text-gray-600 text-xs sm:text-sm">
//                         Conversions
//                       </p>
//                     </div>
//                     <div className="text-center">
//                       <p className="font-semibold text-gray-900">
//                         {page.conversionRate}
//                       </p>
//                       <p className="text-gray-600 text-xs sm:text-sm">Rate</p>
//                     </div>
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs ${
//                         page.status === "Published"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       {page.status}
//                     </span>
//                     <div className="flex space-x-2">
//                       <Button variant="outline" size="sm">
//                         <Eye className="w-4 h-4" />
//                       </Button>
//                       <Button variant="outline" size="sm">
//                         <Edit className="w-4 h-4" />
//                       </Button>
//                       <Button variant="outline" size="sm">
//                         <MoreHorizontal className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default LandingPagesOverview;





import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe, Plus, Eye, Edit, MoreHorizontal } from "lucide-react";
>>>>>>> 31ab30e (update)

interface LandingPagesOverviewProps {
  onBack: () => void;
  onCreateNew?: () => void;
}

<<<<<<< HEAD
const LandingPagesOverview = ({ onBack }: LandingPagesOverviewProps) => {
  const [currentView, setCurrentView] = useState("overview");
=======
const LandingPagesOverview = ({ onBack, onCreateNew }: LandingPagesOverviewProps) => {
>>>>>>> 31ab30e (update)
  const [landingPages] = useState([
    {
      id: 1,
      name: "Summer Sale Landing Page",
      status: "Published",
      visits: 2847,
      conversions: 234,
      conversionRate: "8.2%",
<<<<<<< HEAD
      createdDate: "2024-01-15",
=======
      createdDate: "2024-01-15"
>>>>>>> 31ab30e (update)
    },
    {
      id: 2,
      name: "Product Launch Page",
      status: "Draft",
      visits: 0,
      conversions: 0,
      conversionRate: "0%",
<<<<<<< HEAD
      createdDate: "2024-01-20",
=======
      createdDate: "2024-01-20"
>>>>>>> 31ab30e (update)
    },
    {
      id: 3,
      name: "Free Trial Sign-up",
      status: "Published",
      visits: 1523,
      conversions: 187,
      conversionRate: "12.3%",
<<<<<<< HEAD
      createdDate: "2024-01-10",
    },
  ]);

  // Handle different views

  if (currentView === "builder") {
    return <LandingPageBuilder onBack={() => setCurrentView("overview")} />;
  }
  if (currentView === "overview") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
                <Globe className="w-8 h-8 text-orange-500" />
                <span>Landing Pages</span>
              </h1>
              <p className="text-gray-600">
                Manage your landing pages and track their performance
              </p>
            </div>
=======
      createdDate: "2024-01-10"
    }
  ]);

  const handleCreateNew = () => {
    if (onCreateNew) {
      onCreateNew();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
              <Globe className="w-8 h-8 text-orange-500" />
              <span>Landing Pages</span>
            </h1>
            <p className="text-gray-600">Manage your landing pages and track their performance</p>
>>>>>>> 31ab30e (update)
          </div>
          <Button
            onClick={() => setCurrentView("builder")}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Landing Page
          </Button>
        </div>
<<<<<<< HEAD

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Pages
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {landingPages.length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-50 text-orange-600">
                  <Globe className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Visits
                  </p>
                  <p className="text-2xl font-bold text-gray-900">4,370</p>
                  <p className="text-sm text-green-600">+15.3%</p>
                </div>
                <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                  <Eye className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Conversions
                  </p>
                  <p className="text-2xl font-bold text-gray-900">421</p>
                  <p className="text-sm text-green-600">+8.7%</p>
                </div>
                <div className="p-3 rounded-full bg-green-50 text-green-600">
                  <Plus className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Avg. Conversion Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900">9.6%</p>
                  <p className="text-sm text-green-600">+2.1%</p>
                </div>
                <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                  <Globe className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Landing Pages List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Landing Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {landingPages.map((page) => (
                <div
                  key={page.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {page.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Created on {page.createdDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">
                        {page.visits.toLocaleString()}
                      </p>
                      <p className="text-gray-600">Visits</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">
                        {page.conversions}
                      </p>
                      <p className="text-gray-600">Conversions</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">
                        {page.conversionRate}
                      </p>
                      <p className="text-gray-600">Rate</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        page.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {page.status}
                    </span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
=======
        <Button 
          onClick={handleCreateNew}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Landing Page
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pages</p>
                <p className="text-2xl font-bold text-gray-900">{landingPages.length}</p>
              </div>
              <div className="p-3 rounded-full bg-orange-50 text-orange-600">
                <Globe className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Visits</p>
                <p className="text-2xl font-bold text-gray-900">4,370</p>
                <p className="text-sm text-green-600">+15.3%</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                <Eye className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Conversions</p>
                <p className="text-2xl font-bold text-gray-900">421</p>
                <p className="text-sm text-green-600">+8.7%</p>
              </div>
              <div className="p-3 rounded-full bg-green-50 text-green-600">
                <Plus className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">9.6%</p>
                <p className="text-sm text-green-600">+2.1%</p>
              </div>
              <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                <Globe className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Landing Pages List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Landing Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {landingPages.map((page) => (
              <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{page.name}</h3>
                    <p className="text-sm text-gray-600">Created on {page.createdDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{page.visits.toLocaleString()}</p>
                    <p className="text-gray-600">Visits</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{page.conversions}</p>
                    <p className="text-gray-600">Conversions</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{page.conversionRate}</p>
                    <p className="text-gray-600">Rate</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    page.status === 'Published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {page.status}
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
>>>>>>> 31ab30e (update)
};

export default LandingPagesOverview;