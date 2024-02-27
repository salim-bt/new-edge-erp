import React from 'react';
import { Lemon } from 'next/font/google';
const lemon = Lemon({
    subsets: ['latin-ext'],
    weight: '400'
});

const Greeting: React.FC = () => {
    return (
        <div
            className={lemon.className}
        >
            <h1>Welcome to the Notifications Page!</h1>
            <p>Here you can view and manage your notifications.</p>
        </div>
    );
};

export default Greeting;
