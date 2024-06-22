import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from "@/components/ui/input"
import formSchema from '@/lib/schema';
import { z } from 'zod';

type FormData = z.infer<typeof formSchema>;

const Step1Form = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();


  return (
    <div className='flex flex-col justify-center items-center w-96'>
      <div className='text-2xl font-bold'>Step 1: User Details</div>
      <div className='m-4'>
        <label>Username</label>
        <Input {...register('step1.username', { required: 'Username is required' })} placeholder='johndoe' />
        {errors.step1?.username && (
          <span className="error-message">{errors.step1.username.message}</span>
        )}
      </div>
      <div className='m-4'>
        <label>Email</label>
        <Input {...register('step1.email', { required: 'Email is required' })} type="email" placeholder="johndoe@gmail.com" />
        {errors.step1?.email && (
          <span className="error-message">{errors.step1.email.message}</span>
        )}
      </div>
      <div className='m-4'>
        <label>Password</label>
        <Input {...register('step1.password', { required: 'Password is required' })} type="password" />
        {errors.step1?.password && (
          <span className="error-message">{errors.step1.password.message}</span>
        )}
      </div>
      <div className='m-2'>
        <label>Image Link</label>
        <Input {...register('step1.profile_pic', { required: 'Image link is required' })} type="url" />
        {errors.step1?.profile_pic && (
          <span className="error-message">{errors.step1.profile_pic.message}</span>
        )}
      </div>
    </div>
  )
}

export default Step1Form;
