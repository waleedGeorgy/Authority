import Link from "next/link";
import { Button } from "../ui/button";

interface backButtonProps {
    href: string,
    label: string,
    isSubmitting?: boolean
}

const BackButton = ({ href, label, isSubmitting }: backButtonProps) => {
    if (isSubmitting) {
        return (
            <Button size='sm' variant='link' className="font-normal text-center m-auto w-fit text-neutral-600" asChild disabled={isSubmitting}>
                <Link className="pointer-events-none" aria-disabled={isSubmitting} href={href}>{label}</Link>
            </Button>
        )
    }

    return (
        <Button size='sm' variant='link' className="font-normal text-center m-auto w-fit" asChild>
            <Link href={href}>{label}</Link>
        </Button>
    );
}

export default BackButton;