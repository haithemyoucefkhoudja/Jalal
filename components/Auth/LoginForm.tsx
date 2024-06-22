"use client";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { LoginFormSchema } from "@/schemas/Form";
import { Loading } from "@/components/ui/buttonLoading";
import { useRouter } from "next/navigation";
import { LucideAlertCircle } from "lucide-react";


const LoginForm = () => {
  const router = useRouter();
    const {
      setError,
      register,
      handleSubmit,
      formState: { isSubmitting,errors },
    }  = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    const loginData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect:false
    });
    
    if (loginData?.error) {
      setError('root', {message:loginData.error} )
    }
    if(loginData?.ok){
      router.replace('/Dashboard')
    }
    return loginData
  };
  

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-96 space-y-6">
        
      {/*<p className="text-center text-md text-gray-600 mt-5">
      if you aren't affiliated with a company,
      <Link className="text-blue-500 hover:underline ml-1" href="/register">
          Signup here
        </Link>  to register your firm.
        
            </p>
            */}
        <div className="space-y-2">
          
      <div className="space-y-1">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" dir="rtl">الايمايل:</label>
        <Input {...register("email")} type="text" placeholder="JoeDoe@gmail.com" />
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}
      </div>
      <div className="space-y-1">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" dir="rtl">كلمة السر:</label>
      <Input {...register("password")} type="password" placeholder="password" />
      {errors.password && (
        <div className="text-sm font-medium text-red-500">{errors.password.message}</div>
      )}
      </div>
        </div>
            {errors.root &&
              <div className=" flex items-center space-x-4">
                <LucideAlertCircle  color="red"/>
                  <p className="text-sm font-medium text-red-500">
                  {errors.root.message}
                  </p>
            </div>
            }
            <button className="h-10 px-4 py-2 w-full bg-gray-900 text-gray-50 hover:bg-gray-900/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 "  disabled={isSubmitting} type="submit">
          <Loading text="تسجيل دخول" isLoading={isSubmitting}/>
        </button>

      </form>

  );
};

export default LoginForm;