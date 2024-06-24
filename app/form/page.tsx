"use client"
import React, { useEffect, useState } from 'react';
import StepIndicator from '@/components/steps/StepsIndicator';
import { useForm, FormProvider, FieldValues, Path } from 'react-hook-form';
import Step1Form from '@/components/steps/Step1Form';
import { zodResolver } from "@hookform/resolvers/zod";
import Step2Form from '@/components/steps/Step2Form';
import Step3Form from '@/components/steps/Step3Form';
import Step4Form from '@/components/steps/Step4Form';
import Step5Form from '@/components/steps/Step5Form';
import formSchema from '@/lib/schema';
import { Button } from '@/components/ui/button';
import {z} from 'zod'

type Step = {
  title: string;
  stepNumber: number;
};

type FormData = z.infer<typeof formSchema>

const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const steps: Step[] = [{
    title: "User Details",
    stepNumber: 1
  },{
    title: "Education",
    stepNumber: 2
  },{
    title: "Projects",
    stepNumber: 3
  }, {
    title: "Work Experience",
    stepNumber: 4
  },{
    title: "Skills",
    stepNumber: 5
  }]

  const stepForms = [
    <Step1Form key={1}/>,
    <Step2Form key={2}/>,
    <Step3Form key={3}/>,
    <Step4Form key={4}/>,
    <Step5Form key={5}/>
  ]

  const onError = (errors: any) => {
    const stepWithFirstError = getFirstErrorStep(errors);
    setCurrentStep(stepWithFirstError);
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };

  const getFirstErrorStep = (errors: any) => {
    const stepKeys = Object.keys(errors);
    if (stepKeys.length > 0) {
      const firstErrorStep = stepKeys[0];
      return parseInt(firstErrorStep.replace('step', '')) - 1; // Convert step1 -> 0, step2 -> 1, etc.
    }
    return 0;
  };
  
  const pages: string[] = ['step1', 'step2', 'step3', 'step4', 'step5'];
  type PageName = 'step1' | 'step2' | 'step3' | 'step4' | 'step5';

  const validateCurrentStep = async () => {
    const page = pages[currentStep]
    const result = await methods.trigger( page as PageName,{shouldFocus : true}); // Validate the entire form
    console.log(result);
    if (result) {
      setCurrentStep(currentStep + 1); // Move to the next step if validation passes
    } else {
      const firstErrorStep = getFirstErrorStep(methods.formState.errors);
      setCurrentStep(firstErrorStep); // Stay on the current step with errors if validation fails
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1); // Move back one step
  };

  return (
    <div className='flex justify-start items-center flex-col w-full h-screen bg-slate-500'>
        <div className='flex justify-start items-center pl-10 text-2xl font-bold w-full h-14'>
            Portfolio
        </div>
        <div className='flex items-start bg-white flex-grow w-full'>
            <div className='hidden md:flex flex-col items-start justify-center h-full w-1/3'>
              {steps.map((step) => (
                <StepIndicator title={step.title} currentStep={currentStep + 1} stepNumber={step.stepNumber} key={step.stepNumber} />))}
            </div>
            <div className='flex flex-col justify-center items-center h-full w-full md:w-2/3 bg-blue-500'>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
                {stepForms[currentStep]}
                <div className='flex justify-between items-center m-2'>
                <Button type="button" onClick={handleBack} disabled={currentStep === 0}>Back</Button>
                {currentStep < steps.length - 1 && (
                  <Button 
                    type="button" 
                    onClick={validateCurrentStep} 
                    disabled={currentStep === steps.length - 1}
                  >
                    Next
                  </Button>
                )}
                {currentStep === steps.length - 1 && <Button type="submit">Submit</Button>}
                </div>
              </form>
            </FormProvider>
            </div>
        </div>
    </div>
  );
};

export default Page;
