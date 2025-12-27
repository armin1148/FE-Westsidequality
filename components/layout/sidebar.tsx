"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Layout, BlocksIcon, Layers } from "lucide-react";
import Image from "next/image";

const menuItems = [
  { icon: Layers, label: "Pages", href: "/admin/pages" },
  { icon: Layout, label: "Block Templates", href: "/admin/block-templates" },
  { icon: BlocksIcon, label: "Block Types", href: "/admin/block-types" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200/60 bg-white/80 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-gray-200/60 px-6">
          <div className="flex items-center space-x-3">
            <Image src="/images/logo.svg" alt="logo" width={30} height={42} />
            <span className="text-lg font-bold text-[#0093FF]">
              Westside CMS
            </span>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-blue-50 text-[#0093FF] shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "text-[#0093FF]")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
