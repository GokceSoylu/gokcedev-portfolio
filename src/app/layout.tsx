import React from 'react';
import './globals.css';

export const metadata = {
    title: 'Gökçe Soylu | Portfolio',
    description: 'Computer Engineer & Backend Developer',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr" className="scroll-smooth">
            <body className="bg-[#0d0f12] text-[#f4efe6] antialiased selection:bg-[#e2c391] selection:text-[#0d0f12] font-sans">
                {children}
            </body>
        </html>
    );
}