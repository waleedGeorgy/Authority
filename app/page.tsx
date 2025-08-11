import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Roboto_Condensed } from "next/font/google";
import { FaUserLock } from "react-icons/fa";

const roboto = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['600']
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="space-y-2 text-center">
        <div className="flex flex-row items-center justify-center space-x-2">
          <FaUserLock size={85} />
          <h1 className={cn("text-8xl", roboto.className)}>
            <span className="text-emerald-600">Auth</span>ority
          </h1>
        </div>
        <p className="text-2xl font-light">An authentication service</p>
        <div className="mt-8">
          <LoginButton>
            <Button variant="secondary" size="lg" className="cursor-pointer text-lg bg-emerald-600 hover:bg-emerald-600/75">Enter</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
