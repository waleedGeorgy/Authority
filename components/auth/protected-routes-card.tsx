import { Card, CardContent, CardHeader } from "../ui/card";

interface protectedRouteCardProps {
    children: React.ReactNode,
    title: string,
    icon?: React.ReactNode
}

const ProtectedRouteCard = ({ children, title, icon }: protectedRouteCardProps) => {
    return (
        <Card className="w-1/3 mb-6">
            <CardHeader className="flex flex-row items-center justify-center gap-x-2 mb-3">
                {icon}<p className="text-center font-semibold text-3xl">{title}</p>
            </CardHeader>
            <CardContent className="space-y-3">
                {children}
            </CardContent>
        </Card>
    );
}

export default ProtectedRouteCard;