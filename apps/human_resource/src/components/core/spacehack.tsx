"use client";

import { Button } from "../ui/button";

const Spacehack = () => {
    return <span
        onClick={() => document.querySelector('aside')?.classList.contains('hidden')}
    className={`hidden lg:block w-1/6 `}></span>
}

export default Spacehack;