import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

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
import { Spinner } from '@/components/ui/spinner';
import { SignupFormValues, signupSchema } from '../schemas';
import { useSignup } from '../hooks/useSignup';

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { isRegistering, signup } = useSignup();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting || isRegistering;

  const onSubmit = async (values: SignupFormValues) => {
    signup(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid sm:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <div className='relative'>
                  <User className='absolute left-3 top-3 size-5 text-gray-400' />
                  <FormControl>
                    <Input
                      placeholder='John'
                      className='pl-10 py-5 shadow-none'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <div className='relative'>
                  <User className='absolute left-3 top-3 size-5 text-gray-400' />
                  <FormControl>
                    <Input
                      placeholder='Doe'
                      className='pl-10 py-5 shadow-none'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className='relative'>
                <Mail className='absolute left-3 top-3 size-5 text-gray-400' />
                <FormControl>
                  <Input
                    type='email'
                    placeholder='your@email.com'
                    className='pl-10 py-5 shadow-none'
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className='relative'>
                <Lock className='absolute left-3 top-3 size-5 text-gray-400' />
                <FormControl>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    className='pl-10 pr-10 py-5 shadow-none'
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <button
                  type='button'
                  onClick={() => setShowPassword((prev) => !prev)}
                  className='absolute right-3 top-3 text-gray-400 hover:text-gray-600'
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className='size-5' />
                  ) : (
                    <Eye className='size-5' />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 transition'
          disabled={isSubmitting}
          size='lg'
        >
          {isSubmitting ? <Spinner /> : <span>Create Account</span>}
        </Button>
      </form>
    </Form>
  );
}
