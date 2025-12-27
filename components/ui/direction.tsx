import { cn } from "@/lib/utils";

const DirectionRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("flex flex-row", className)}>{children}</div>;

const DirectionColumn = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("flex flex-col", className)}>{children}</div>;

export { DirectionRow, DirectionColumn };
