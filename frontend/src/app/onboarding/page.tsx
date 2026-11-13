import AuthGuard from '@/components/authguard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessProfileForm } from '@/features/onboarding/components/BusinessProfileForm';
import { Building } from 'lucide-react';

export default function page() {
  return (
    <AuthGuard>
      <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
        <Card className='w-full max-w-2xl'>
          <CardHeader className='text-center'>
            <div className='mx-auto w-16 h-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4'>
              <Building className='w-8 h-8 text-white' />
            </div>
            <CardTitle className='text-2xl'>
              Set Up Your Business Profile
            </CardTitle>
            <p className='text-gray-600'>
              Tell us about your business to get started
            </p>
          </CardHeader>
          <CardContent>
            <BusinessProfileForm />
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
}
