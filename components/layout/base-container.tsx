import { cn } from "@/lib/utils";

const BaseContainer = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <section className={cn("px-4 max-w-[1216px] mx-auto w-full", className)}>
    {children}
  </section>
);

export default BaseContainer;
