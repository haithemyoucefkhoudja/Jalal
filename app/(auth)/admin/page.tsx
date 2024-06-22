import LoginForm from "@/components/Auth/LoginForm";
import { LucideGitPullRequestArrow } from "lucide-react";
export default async function Login() {
    return (
      <section className="container px-5 md:h-screen ">
        <div className="  flex flex-col max-w-md mx-auto  px-6 bg-slate-100 py-12   items-center justify-center rounded-2xl my-10  w-fit  shadow-lg">
          <header className="flex flex-col space-y-4 items-center mb-4">
            <LucideGitPullRequestArrow  className="h-8 w-8"/>
            <h1 className=" text-xl font-bold" dir="rtl">
              مرحبا مجددا! 
            </h1>
          </header>
          <LoginForm />
        </div>
    </section>
    );
}