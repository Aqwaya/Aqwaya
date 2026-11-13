import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

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
import { useLogin } from '../hooks/useLogin';
import { LoginFormValues, loginSchema } from '../schemas';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggingIn, login } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting || isLoggingIn;

  function onSubmit(values: LoginFormValues) {
    login(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className='relative'>
                  <Lock className='absolute left-3 top-3 size-5 text-gray-400' />
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='••••••••'
                      className='pl-10 pr-10 py-5 shadow-none'
                      {...field}
                      disabled={isSubmitting}
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
            );
          }}
        />

        {/* <div className='flex justify-end'>
          <Link
            href='/auth/forgot-password'
            className='text-sm hover:underline'
          >
            Forgot password?
          </Link>
        </div> */}

        <Button
          type='submit'
          className='w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 transition '
          disabled={isSubmitting}
          size='lg'
        >
          {isSubmitting ? <Spinner /> : <span>Sign In</span>}
        </Button>
      </form>
    </Form>
  );
}
