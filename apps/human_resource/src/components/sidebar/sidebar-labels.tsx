import { LayoutDashboardIcon ,User2Icon, Settings2Icon } from "lucide-react";

const sidebarOptions = [
    {
        label: 'Home',
        icon: <LayoutDashboardIcon />,
        link: '/'
    },
    {
        label: 'Profile',
        icon: <User2Icon />,
        link: '/profile'
    },
    {
        label: 'Settings',
        icon: <Settings2Icon />,
        link: '/settings'
    }
];

export default sidebarOptions;
