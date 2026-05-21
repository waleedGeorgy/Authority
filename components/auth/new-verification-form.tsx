"use client";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SyncLoader } from "react-spinners"
import { emailVerificationAction } from "@/actions/verification-action";
import CardWrapper from "./card-wrapper";
import { FormError, FormSuccess } from "../form-output";

const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);

    const tokenId = useSearchParams().get("token");

    const verifyEmail = useCallback(async () => {
        setError(undefined);
        setSuccess(undefined);
        setLoading(true)

        if (!tokenId) {
            setError("Token does not exist");
            setLoading(false);
            return;
        }

        try {
            const verificationResults = await emailVerificationAction(tokenId);
            if (verificationResults.success) {
                setSuccess(verificationResults.success);
            } else {
                setError(verificationResults.error || "Something went wrong");
            }
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                setError(error.message);
                return;
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    }, [tokenId])

    useEffect(() => {
        verifyEmail()
    }, [verifyEmail]);

    return (
        <CardWrapper headerLabel="Confirming your email" backButtonLabel="Back to log-in page" backButtonHref="/auth/login">
            <div className="flex items-center justify-center w-full min-h-12">
                {loading ?
                    <SyncLoader color="white" loading={loading} />
                    :
                    <>
                        <FormSuccess message={success} />
                        <FormError message={error} />
                    </>
                }
            </div>
        </CardWrapper>
    );
}

export default NewVerificationForm;