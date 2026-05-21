import { FaUserLock } from "react-icons/fa";
import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="space-y-2 text-center">
        <div className="flex flex-row items-center justify-center space-x-2">
          <FaUserLock size={85} />
          <h1 className='text-8xl font-roboto'>
            <span className="text-indigo-700">Auth</span>ority
          </h1>
        </div>
        <p className="text-2xl font-light">An authentication service</p>
        <div className="mt-8">
          <LoginButton>
            <Button variant="secondary" size="lg" className="cursor-pointer text-lg bg-indigo-700 hover:bg-indigo-800">Enter</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
