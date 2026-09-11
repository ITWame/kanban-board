// src/routes/index.tsx
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { useClerk } from "@clerk/tanstack-react-start";
import { Button } from "../components/ui/button";
import { HomeIcon, House, Plus, PlusIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../components/ui/avatar";
import Board from "../features/kanban/components/board";

const authStateFn = createServerFn().handler(async () => {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated) {
    throw redirect({
      to: "/login/$",
    });
  }

  return { userId };
});

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: async () => await authStateFn(),
});

function Home() {
  const { signOut } = useClerk();
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-20 flex flex-col py-8 items-center gap-16 shrink-0">
        <img src="/icon.svg" height={40} width={40} />
        <div className="flex flex-col gap-8">
          <div className="bg-indigo-600 w-10 h-10 rounded-full items-center flex justify-center">
            <House />
          </div>
          <div className="w-10 h-10 rounded-full items-center flex justify-center border border-input border-dashed hover:bg-white/5 cursor-pointer">
            <Plus />
          </div>
        </div>
      </div>

      <div className="w-full h-full p-2 overflow-hidden">
        <div className="bg-card w-full h-full rounded-xl border border-border flex flex-col overflow-hidden">
          <div className="p-4 flex items-center px-6 border-b justify-between shrink-0">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    render={
                      <Link to="/">
                        <HomeIcon size={16} />
                      </Link>
                    }
                  />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link to="/">Issues</Link>} />
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex gap-4">
              <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12">
                <AvatarGroup>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/maxleiter.png"
                      alt="@maxleiter"
                    />
                    <AvatarFallback>LR</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/evilrabbit.png"
                      alt="@evilrabbit"
                    />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                  <AvatarGroupCount>+3</AvatarGroupCount>
                </AvatarGroup>
              </div>
              <Button variant={"outline"}>
                <PlusIcon />
                Add Member
              </Button>
            </div>
          </div>
          <Board />
        </div>
      </div>
    </div>
  );
}
