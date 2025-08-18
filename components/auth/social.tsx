"use client";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = ({ isSubmitting }: { isSubmitting: boolean | undefined }) => {
    const socialLogin = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        });
    };

    return (
        <div className="flex items-center gap-x-2 w-full">
            <Button size='lg' variant='secondary' disabled={isSubmitting} onClick={() => socialLogin('github')} className="grow cursor-pointer">
                <FaGithub />
            </Button>
            <Button size='lg' variant='secondary' disabled={isSubmitting} onClick={() => socialLogin('google')} className="grow cursor-pointer">
                <FcGoogle />
            </Button>
        </div>
    )
}

export default Social;