'use client';

import { useState } from 'react';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Mail, ArrowLeft, CircleCheck } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Logo } from '@/components/Logo';
import {
  forgotPasswordSchema,
  ForgotPasswordValues,
} from '@/features/auth/schemas';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: ForgotPasswordValues) => {
    console.log(values);

    await new Promise((res) => setTimeout(res, 2000));
    // TODO: call your API here
    setSubmitted(true);
  };

  return (
    <div className='h-dvh flex items-center justify-center bg-gray-50 p-2'>
      <Card className='w-full max-w-sm sm:max-w-md shadow-lg border-0'>
        <CardHeader className='flex flex-col items-center'>
          <Logo />
          <CardTitle className='mt-4 text-2xl font-bold'>
            {submitted ? 'Check your email' : 'Forgot password?'}
          </CardTitle>
          <p className='text-sm text-muted-foreground text-center'>
            {submitted
              ? `We sent a reset link to ${form.getValues('email')}`
              : "Enter your email and we'll send you a reset link"}
          </p>
        </CardHeader>

        <CardContent>
          {submitted ? (
            <div className='flex flex-col items-center gap-4 py-4'>
              <div className='rounded-full bg-green-50 p-4'>
                <CircleCheck className='size-8 text-green-500' />
              </div>
              <p className='text-sm text-muted-foreground text-center'>
                Didn't receive it? Check your spam folder or{' '}
                <button
                  onClick={() => setSubmitted(false)}
                  className='text-primary underline underline-offset-4 hover:opacity-80 transition'
                >
                  try again
                </button>
                .
              </p>
              <Button
                asChild
                className='w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 transition'
                size='lg'
              >
                <Link href='/auth/login'>Back to Sign In</Link>
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
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

                <Button
                  type='submit'
                  className='w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 transition'
                  disabled={isSubmitting}
                  size='lg'
                >
                  {isSubmitting ? <Spinner /> : <span>Send Reset Link</span>}
                </Button>

                <Link
                  href='/auth/login'
                  className='flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors'
                >
                  <ArrowLeft className='size-4' />
                  Back to Sign In
                </Link>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
