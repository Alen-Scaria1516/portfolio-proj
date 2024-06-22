import React, { useEffect } from 'react';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from "@/lib/utils";
import { Button } from '../ui/button';
import { Textarea } from "@/components/ui/textarea";
import formSchema from '@/lib/schema';
import { z } from 'zod';
import { ScrollArea } from "@/components/ui/scroll-area"

type FormData = z.infer<typeof formSchema>;

const Step2Form = () => {
  const { register, control, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "step2"
  });

  return (
    <div className='flex flex-col justify-center items-center w-96'>
      <div className='text-2xl font-bold'>Education</div>
      <ScrollArea className='h-screen w-full rounded-md border p-4'>
      <div>{fields.length == 0 ? errors.step2?.message : "" }</div>
      {fields.map((item, index) => (
        <div key={item.id} className='w-full'>
          <div className='m-4'>
            <label>Name of the Institution</label>
            <Input {...register(`step2.${index}.institution` as const, { required: 'Institution name is required' })} placeholder='IITB'/>
            {errors.step2?.[index]?.institution && 
              <p>{errors.step2[index].institution?.message}</p>
            }
          </div>
          <div className='m-4'>
            <label>Highest Qualification</label>
            <Input {...register(`step2.${index}.degree` as const, { required: 'Highest Qualification is required' })} placeholder="B.Tech"/>
            {errors.step2?.[index]?.degree && 
              <p>{errors.step2[index].degree?.message}</p>
            }
          </div>
          <div className='m-4'>
            <label>Start Date</label>
            <Controller
              name={`step2.${index}.start_date` as const}
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
                            format(new Date(field.value), "PPP")
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
                    {errors.step2?.[index]?.start_date?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className='m-4'>
            <label>End Date</label>
            <Controller
              name={`step2.${index}.end_date` as const}
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
                            format(new Date(field.value), "PPP")
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
                    {errors.step2?.[index]?.end_date?.message}
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
              {...register(`step2.${index}.description` as const, { required: 'Description is required' })}
            />
            {errors.step2?.[index]?.description && 
              <p>{errors.step2[index].description?.message}</p>
            }
          </div>
          <div className='m-4'>
            <Button type="button" onClick={() => remove(index)}>Remove</Button>
          </div>
        </div>
      ))}
      </ScrollArea>
      <Button type="button" className='m-2' onClick={() => append({ institution: '', degree: '', start_date: '', end_date: '', description: '' })}>
        Add Education
      </Button>
    </div>
  )
}

export default Step2Form;
