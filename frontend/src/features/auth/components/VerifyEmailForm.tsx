'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';
import { VerifyEmailFormValues, verifyEmailSchema } from '../schemas';

export function VerifyEmailForm() {
  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { otp: '' },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: VerifyEmailFormValues) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='otp'
          render={({ field }) => (
            <FormItem className='flex flex-col items-center'>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
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
          {isSubmitting ? <Spinner /> : <span>Verify Email</span>}
        </Button>

        <p className='text-center text-sm text-muted-foreground'>
          Didn&apos;t receive an email?{' '}
          <button
            type='button'
            className='text-blue-600 hover:underline font-medium'
          >
            Resend
          </button>
        </p>

        <p className='text-center text-sm text-muted-foreground'>
          <Link href='/auth/login' className='hover:underline'>
            ← Back to login
          </Link>
        </p>
      </form>
    </Form>
  );
}
