"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema } from "@/schemas";
import CardWrapper from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { FormError, FormSuccess } from "@/components/form-output";
import { newPasswordAction } from "@/actions/new-password-action";

const NewPasswordForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const tokenId = useSearchParams().get('token') as string;

    const form = useForm<z.infer<typeof newPasswordSchema>>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: "",
        }
    });

    const handlePasswordResetForm = async (values: z.infer<typeof newPasswordSchema>) => {
        setError("");
        setSuccess("");
        const result = await newPasswordAction(values, tokenId);
        setError(result?.error);
        setSuccess(result?.success);
    }

    return (
        <CardWrapper
            headerLabel="Reset your password"
            backButtonLabel="Back to log-in page"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handlePasswordResetForm)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="******" type="password" disabled={form.formState.isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" variant='secondary' className="w-full cursor-pointer" size="sm" disabled={form.formState.isSubmitting}>
                        Reset Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default NewPasswordForm;