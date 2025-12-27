"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, LogOut } from "lucide-react";
import { DialogType, useDialog } from "@/context/dialog-context";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const TopBar = () => {
  const { data: session } = useSession();
  const { openDialog } = useDialog();
  const router = useRouter();
  const handleCreateBlockType = () => {
    openDialog({
      type: DialogType.CREATE_BLOCK_TYPE,
      title: "Create Block Type",
      description: "",
    });
  };
  const handleCreateBlockTemplate = () => {
    openDialog({
      type: DialogType.CREATE_BLOCK_TEMPLATE,
      title: "Create Block Template",
      description: "",
    });
  };
  const handleCreatePage = () => {
    openDialog({
      type: DialogType.CREATE_PAGE,
      title: "Create Page",
      description: "",
    });
  };

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          signOut({ redirect: false }).then(() => {
            router.push("/admin/login");
          });
        }
      });
  };
  return (
    <header className="fixed left-64 right-0 top-0 z-30 h-16 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          {/* Breadcrumb or title can go here */}
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleCreateBlockType}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Block Type</span>
          </Button>
          <Button
            variant="outline"
            onClick={handleCreateBlockTemplate}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Block Template</span>
          </Button>

          <Button
            variant="primary"
            onClick={handleCreatePage}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Page</span>
          </Button>

          {/* Avatar with Dropdown */}
          <div className="ml-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-[#0093FF] text-white font-semibold">
                      AD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session?.user?.username}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
