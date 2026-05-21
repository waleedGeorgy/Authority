"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas";
import CardWrapper from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { FormError, FormSuccess } from "@/components/form-output";
import { loginAction } from "@/actions/login-action";

const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [show2FA, setShow2FA] = useState(false);

    const searchParams = useSearchParams();

    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with another provider" : "";

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const handleLoginForm = async (values: z.infer<typeof loginSchema>) => {
        setError("");
        setSuccess("");

        try {
            const result = await loginAction(values);
            if (result?.error) {
                form.reset()
                setError(result?.error);
            }
            if (result?.success) {
                form.reset();
                setSuccess(result?.success);
            }
            if (result?.twoFactor) setShow2FA(true);
        } catch (error) {
            if (error instanceof Error && error.message?.includes('NEXT_REDIRECT')) throw error;
            console.error("An unexpected login error occurred:", error);
            setError("An unexpected error occurred. Please try again.");
        }
    }

    return (
        <CardWrapper
            headerLabel="Hello again!"
            backButtonLabel="No account? Sign up here"
            backButtonHref="/auth/register"
            showSocial
            isSubmitting={form.formState.isSubmitting}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLoginForm)} className="space-y-6">
                    <div className="space-y-4">
                        {show2FA && (
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmation code</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="123456" disabled={form.formState.isSubmitting} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {!show2FA &&
                            <>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="john.doe@provider.com" type="email" disabled={form.formState.isSubmitting} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="******" type="password" disabled={form.formState.isSubmitting} />
                                            </FormControl>
                                            {form.formState.isSubmitting ?
                                                (<Button size="sm" variant="link" asChild className="px-0 font-normal w-fit m-auto text-neutral-600" disabled={form.formState.isSubmitting}>
                                                    <Link aria-disabled={form.formState.isSubmitting} className="pointer-events-none" href="/auth/reset">Forgot your password?</Link>
                                                </Button>) :
                                                (<Button size="sm" variant="link" asChild className="px-0 font-normal w-fit m-auto">
                                                    <Link href="/auth/reset">Forgot your password?</Link>
                                                </Button>)}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        }
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button type="submit" variant='secondary' className="w-full cursor-pointer" size="sm" disabled={form.formState.isSubmitting}>
                        {show2FA ? "Confirm code" : "Log In"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default LoginForm;