'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building, Palette, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import {
  businessProfileSchema,
  type BusinessProfileFormValues,
} from '../schemas';
import { employeeSizes, industries } from '../constants';

export function BusinessProfileForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoName, setLogoName] = useState<string>('');

  const form = useForm<BusinessProfileFormValues>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      businessName: '',
      industry: '',
      website: '',
      location: '',
      description: '',
      employees: '',
      brandColor: '#3B82F6',
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const logoFile = form.watch('logo');

  const onSubmit = async (values: BusinessProfileFormValues) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {/* Business Information */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold flex items-center gap-2'>
            <Building className='w-5 h-5' />
            Business Information
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='businessName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Your Business Name'
                      className='shadow-none'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='industry'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className='shadow-none w-full'>
                        <SelectValue placeholder='Select your industry' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='website'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='https://yourwebsite.com'
                      className='shadow-none'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='City, Country'
                      className='shadow-none'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='employees'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className='shadow-none w-full'>
                        <SelectValue placeholder='Select size' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employeeSizes.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Tell us about your business...'
                    rows={3}
                    className='shadow-none resize-none'
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Brand Identity */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold flex items-center gap-2'>
            <Palette className='w-5 h-5' />
            Brand Identity
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='logo'
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <div>
                      <input
                        ref={fileInputRef}
                        type='file'
                        accept='image/png, image/jpeg, image/jpg, image/svg+xml'
                        className='hidden'
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file);
                            setLogoName(file.name);
                          }
                        }}
                      />
                      <Button
                        type='button'
                        variant='outline'
                        className='w-full shadow-none'
                        disabled={isSubmitting}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className='w-4 h-4 mr-2' />
                        {(logoFile?.name ?? logoName) || 'Upload Logo'}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='brandColor'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Color</FormLabel>
                  <FormControl>
                    <div className='flex items-center gap-2'>
                      <input
                        type='color'
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className='w-12 h-10 rounded cursor-pointer border border-input'
                      />
                      <Input
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className='flex-1 shadow-none'
                        disabled={isSubmitting}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='pt-4 border-t'>
          <Button
            type='submit'
            className='w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 transition'
            disabled={isSubmitting}
            size='lg'
          >
            {isSubmitting ? (
              <Spinner />
            ) : (
              <span>Complete Setup & Continue</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
