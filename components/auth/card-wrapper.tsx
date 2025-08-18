import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import BackButton from "./back-button";
import Header from "./header";
import Social from "./social";

interface cardWrapperProps {
    children: React.ReactNode,
    headerLabel: string,
    backButtonLabel: string,
    backButtonHref: string,
    showSocial?: boolean,
    isSubmitting?: boolean,
}

const CardWrapper = ({ children, headerLabel, backButtonLabel, backButtonHref, showSocial, isSubmitting }: cardWrapperProps) => {
    return (
        <Card className="w-md shadow-md">
            <CardHeader className="mb-2">
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social isSubmitting={isSubmitting} />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton
                    isSubmitting={isSubmitting}
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    );
}

export default CardWrapper;