import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from "@/lib/utils";
import { Button } from '../ui/button';
import { Textarea } from "@/components/ui/textarea";
import formSchema from '@/lib/schema';
import { z } from 'zod';

type FormData = z.infer<typeof formSchema>;

const Step2Form = () => {

  const { register, control, formState: { errors } } = useFormContext<FormData>();
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <div className='flex flex-col justify-center items-center w-96'>
      <div className='text-2xl font-bold'>Education</div>
      <div className='m-4'>
        <label>Name of the Institution</label>
        <Input {...register('step2.institution', { required: 'Institution name is required' })} placeholder='IITB'/>
        {errors.step2?.institution && 
          <p>
            {typeof errors.step2.institution.message === 'string' ? errors.step2.institution.message : ''}
          </p>
        }
      </div>
      <div className='m-4'>
        <label>Highest Qualification</label>
        <Input {...register('step2.degree', { required: 'Highest Qualification is required' })} placeholder="B.Tech"/>
        {errors.step2?.degree && 
          <p>
            {typeof errors.step2.degree.message === 'string' ? errors.step2.degree.message : ''}
          </p>
        }
      </div>
      <div className='m-4'>
        <label>Start Date</label>
        <Controller
          name="step2.start_date"
          control={control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date ? date.toISOString() : '')}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage>
                {typeof errors.step2?.start_date?.message === 'string' ? errors.step2.start_date.message : ''}
              </FormMessage>
            </FormItem>
          )}
        />
      </div>
      <div className='m-4'>
        <label>End Date</label>
        <Controller
          name="step2.end_date"
          control={control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date ? date.toISOString() : '')}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage>
                {typeof errors.step2?.end_date?.message === 'string' ? errors.step2.end_date.message : ''}
              </FormMessage>
            </FormItem>
          )}
        />
      </div>
      <div className='m-4'>
        <label>Description</label>
        <Textarea
          placeholder="Tell us a little bit about your Education"
          className="w-60"
          {...register('step2.description', { required: 'Description is required' })}
        />
        {errors.step2?.description && 
          <p>
            {typeof errors.step2.description.message === 'string' ? errors.step2.description.message : ''}
          </p>
        }
      </div>
    </div>
  )
}

export default Step2Form;
