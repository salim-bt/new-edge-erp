import sidebarOptions from "./sidebar-labels";
import Link from "next/link";

const Navbar = async() => {
    return (
        <nav className="hidden lg:block min-h-screen w-64 bg-gray-100 dark:bg-gray-800 overflow-y-auto">
          <div className="px-6 py-4 space-y-6">
            <h2 className="text-gray-500 text-xs font-semibold tracking-wide uppercase">Main</h2>
            <nav className="space-y-2">
                {sidebarOptions.map((option) => (
                    <Link
                        key={option.label}
                        className="flex items-center space-x-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900 p-2 rounded"
                        href={option.link}
                    >
                        {option.icon}
                        <span>{option.label}</span>
                    </Link>
                ))}
            </nav>
          </div>
        </nav>
    );
};

export default Navbar;

