"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
type NavlinkProps = {
  children: React.ReactNode;
  href: string;
};

const Navlink = ({ href, children }: NavlinkProps) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      className={`flex items-center gap-3 rounded-lg px-3 py-2 my-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
        isActive ? "bg-gray-100 dark:bg-gray-800 dark:text-gray-50" : ""
      }`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default Navlink;
