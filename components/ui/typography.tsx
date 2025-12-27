import { cn } from "@/lib/utils";

const TypographyP = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p className={cn("leading-7 [&:not(:first-child)]:mt-2", className)}>
    {children}
  </p>
);

const TypographyH2 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2
    className={cn(
      "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
      className
    )}
  >
    {children}
  </h2>
);

const TypographyH3 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h3
    className={cn(
      "scroll-m-20 text-2xl font-semibold tracking-tight",
      className
    )}
  >
    {children}
  </h3>
);

const TypographyH4 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h4
    className={cn(
      "scroll-m-20 text-xl font-semibold tracking-tight",
      className
    )}
  >
    {children}
  </h4>
);

export { TypographyP, TypographyH2, TypographyH3, TypographyH4 };
