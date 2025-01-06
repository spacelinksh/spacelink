"use client";

import * as React from "react";
import {
  GalleryVerticalEnd,
  SquareTerminal,
  UserRoundSearch,
  Wallet,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser, NavUserProps } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./sidebar";

const data = {
  teams: [
    {
      name: "Spacelink",
      logo: GalleryVerticalEnd,
      plan: "Members Club",
    },
  ],
  navMain: [
    {
      title: "Visão geral",
      url: "/",
      icon: SquareTerminal,
    },
    {
      title: "Usuários",
      url: "/customers",
      icon: UserRoundSearch,
    },
    {
      title: "Carteira",
      url: "/wallet",
      icon: Wallet,
    },
  ],
};

export interface AppSidebarProps
  extends React.ComponentProps<typeof Sidebar>,
    NavUserProps {}

export function AppSidebar({
  user,
  accountRouter,
  financeRouter,
  signOut,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={user}
          accountRouter={accountRouter}
          financeRouter={financeRouter}
          signOut={signOut}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
