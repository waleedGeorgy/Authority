import { Skeleton } from "./ui/skeleton";

interface skeletonCardProps {
    rows: number,
    hasBigSkeleton: boolean,
    hasButton: boolean
}

const SkeletonCard = ({ rows, hasBigSkeleton, hasButton }: skeletonCardProps) => {
    const skeletonRows = [];
    for (let i = 0; i < rows; i++) {
        skeletonRows.push(
            <div className="space-y-2" key={i}>
                <Skeleton className="h-[14px] w-1/5" />
                <Skeleton className="h-8 w-full" />
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-5">
            {skeletonRows}
            {hasBigSkeleton && <Skeleton className="h-14 w-full" />}
            {hasButton && <Skeleton className="h-9 w-1/3 mt-2 mx-auto" />}
        </div>
    );
}

export default SkeletonCard;