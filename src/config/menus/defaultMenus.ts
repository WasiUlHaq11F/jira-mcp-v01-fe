import { MenuItem } from "@/interface/common"
import * as LucideIcons from 'lucide-react';

export const authMenus : MenuItem[] = [
{
    label: 'user',
    key: '/userLogin',
	scope: []}]
export const defaultMenus : MenuItem[] = [
    {
        key: "/users",
        label: "Users",
        scope: ["user:admin"],
        icon: LucideIcons.Users
    },
    {
        key: "/tickets",
        label: "Tickets",
        scope: ["user:admin", "user:projectManager", "user:developer", "user:qaTeam", "user:leadership"],
        icon: LucideIcons.Ticket
    },
    {
        key: "/sprints",
        label: "Sprints",
        scope: ["user:admin", "user:projectManager", "user:developer", "user:qaTeam", "user:leadership"],
        icon: LucideIcons.Gauge
    },
    {
        key: "/releases",
        label: "Releases",
        scope: ["user:admin", "user:projectManager", "user:developer", "user:qaTeam", "user:leadership"],
        icon: LucideIcons.GitBranch
    },
    {
        key: "/ticket-sprints",
        label: "Ticket Sprints",
        scope: ["user:admin", "user:projectManager", "user:developer", "user:qaTeam"],
        icon: LucideIcons.Workflow
    },
    {
        key: "/ticket-releases",
        label: "Ticket Releases",
        scope: ["user:admin", "user:projectManager", "user:developer", "user:qaTeam"],
        icon: LucideIcons.Package
    },
    {
        key: "/notifications",
        label: "Notifications",
        scope: ["user:admin", "user:projectManager", "user:developer", "user:qaTeam", "user:leadership"],
        icon: LucideIcons.Bell
    }
]