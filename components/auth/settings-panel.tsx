"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Settings } from 'lucide-react';
import { useCurrentUser } from "@/hooks/use-current-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema } from "@/schemas";
import { UserRole } from "@prisma/client";
import { settingsAction } from "@/actions/settings-action";
import ProtectedRouteCard from "./protected-routes-card";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "../ui/select";
import { FormError, FormSuccess } from "../form-output";
import SkeletonCard from "../skeleton-card";
import { Separator } from "@/components/ui/separator";

const SettingsPanel = () => {
    const sessionUser = useCurrentUser();

    const { update, status } = useSession();

    const [success, setSuccess] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);

    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            password: undefined,
            newPassword: undefined,
            name: '',
            email: '',
            role: UserRole.USER,
            is2FAEnabled: false,
        }
    });

    useEffect(() => {
        let isMounted = true;
        const initialize = async () => {
            if (status === "unauthenticated") {
                await new Promise(resolve => setTimeout(resolve, 100));
                if (status === 'unauthenticated') {
                    await update();
                }
            }

            if (isMounted && sessionUser) {
                form.reset({
                    name: sessionUser.name || '',
                    email: sessionUser.email || '',
                    role: sessionUser.role || UserRole.USER,
                    is2FAEnabled: sessionUser.is2FAEnabled || false,
                    password: undefined,
                    newPassword: undefined
                });
                setInitialLoadComplete(true);
            }
        };

        initialize();
        return () => { isMounted = false };
    }, [status, sessionUser, form, update]);

    if (!initialLoadComplete && sessionUser?.isOAuth) {
        return (
            <ProtectedRouteCard title="Settings" icon={<Settings size={32} className="mt-0.5" />}>
                <SkeletonCard rows={2} hasBigSkeleton={false} hasButton />
            </ProtectedRouteCard>
        );
    }

    if (!initialLoadComplete && !sessionUser?.isOAuth) {
        return (
            <ProtectedRouteCard title="Settings" icon={<Settings size={32} className="mt-0.5" />}>
                <SkeletonCard rows={5} hasBigSkeleton hasButton />
            </ProtectedRouteCard>
        );
    }

    const handleSettingsForm = async (values: z.infer<typeof settingsSchema>) => {
        try {
            const results = await settingsAction(values);
            if (results.success) {
                update();
                setSuccess(results.success);
            }
            if (results.error) {
                setError(results.error);
            }
        } catch (error) {
            setError("Something went wrong");
        }
    }

    return (
        <ProtectedRouteCard title="Settings" icon={<Settings size={32} className="mt-0.5" />}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSettingsForm)} className="space-y-6">
                    <div className="space-y-4">
                        <FormDescription className="text-right">
                            Personal info
                        </FormDescription>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="John Doe" disabled={form.formState.isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {!!sessionUser?.isOAuth === false && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="email" placeholder="johnDoe@example.com" disabled={form.formState.isSubmitting} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Separator />
                                <FormDescription className="text-right">
                                    Update your password
                                </FormDescription>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password" placeholder="******" disabled={form.formState.isSubmitting} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password" placeholder="******" disabled={form.formState.isSubmitting} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Separator />
                            </>
                        )}
                        <FormDescription className="text-right">
                            Miscellaneous
                        </FormDescription>
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value} disabled={form.formState.isSubmitting}>
                                        <FormControl>
                                            <SelectTrigger className="w-full cursor-pointer">
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem className="cursor-pointer" value={UserRole.ADMIN}>Admin</SelectItem>
                                            <SelectItem className="cursor-pointer" value={UserRole.USER}>User</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {!!sessionUser?.isOAuth === false && (
                            <FormField
                                control={form.control}
                                name="is2FAEnabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row justify-between items-center border-1 border-accent rounded-lg p-3">
                                        <div className="space-y-1">
                                            <FormLabel>2-factor Authentication</FormLabel>
                                            <FormDescription className="text-xs">Enable 2FA on login, for a better account protection.</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch className="data-[state=checked]:bg-emerald-600 data-[state=unchecked]:bg-slate-300 cursor-pointer" disabled={form.formState.isSubmitting} checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                    {error ? <FormError message={error} /> : <FormSuccess message={success} />}
                    <div className="flex flex-row items-center justify-center">
                        <Button type="submit" variant='secondary' className="w-1/3 cursor-pointer" size="default" disabled={form.formState.isSubmitting}>
                            Save changes
                        </Button>
                    </div>
                </form>
            </Form>
        </ProtectedRouteCard>
    );
}

export default SettingsPanel;