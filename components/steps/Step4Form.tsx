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
import { ScrollArea } from "@/components/ui/scroll-area";

type FormData = z.infer<typeof formSchema>;

const Step4Form = () => {
  const { register, control, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "step4"
  });

  return (
    <div className='flex flex-col justify-center items-center w-96'>
      <div className='text-2xl font-bold'>Work Experience</div>
      <ScrollArea className='h-screen w-full rounded-md border p-4'>
        {fields.map((item, index) => (
          <div key={item.id} className='w-full'>
            <div className='m-4'>
              <label>Company Name</label>
              <Input {...register(`step4.${index}.company_name`, { required: 'Company Name is required' })} placeholder='Amazon' />
              {errors.step4?.[index]?.company_name &&
                <p>
                  {typeof errors.step4?.[index]?.company_name?.message === 'string' ? errors.step4[index].company_name.message : ''}
                </p>
              }
            </div>
            <div className='m-4'>
              <label>Role</label>
              <Input {...register(`step4.${index}.role`, { required: 'Role is required' })} placeholder="Sweeper" />
              {errors.step4?.[index]?.role &&
                <p>
                  {typeof errors.step4?.[index]?.role?.message === 'string' ? errors.step4[index].role.message : ''}
                </p>
              }
            </div>
            <div className='m-4'>
              <label>Start Date</label>
              <Controller
                name={`step4.${index}.work_start_date`}
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
                      {errors.step4?.[index]?.work_start_date?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className='m-4'>
              <label>End Date</label>
              <Controller
                name={`step4.${index}.work_end_date`}
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
                      {errors.step4?.[index]?.work_end_date?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className='m-4'>
              <label>Description</label>
              <Textarea
                placeholder="Tell us a little bit about your Work Experience"
                className="w-60"
                {...register(`step4.${index}.work_description`, { required: 'Work description is required' })}
              />
              {errors.step4?.[index]?.work_description &&
                <p>
                  {typeof errors.step4?.[index]?.work_description?.message === 'string' ? errors.step4[index].work_description.message : ''}
                </p>
              }
            </div>
            <div className='m-4'>
              <Button type="button" onClick={() => remove(index)}>Remove</Button>
            </div>
          </div>
        ))}
      </ScrollArea>
      <Button type="button" className='m-2' onClick={() => append({ company_name: '', role: '', work_start_date: '', work_end_date: '', work_description: '' })}>
        Add Work Experience
      </Button>
    </div>
  );
}

export default Step4Form;
