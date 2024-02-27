"use client";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
    return (
        <div className="flex flex-row items-center justify-center w-full h-full">
            {/* Mobile view */}
            <div className="lg:hidden">
                <SearchIcon size={24} />
            </div>

            {/* Larger screen view */}
            <div className="hidden lg:flex">
                <Input type="text" placeholder="Search..." />
                <button className="ml-2">
                    <SearchIcon size={24} />
                </button>
            </div>
        </div>
    );
}

export default SearchBar;