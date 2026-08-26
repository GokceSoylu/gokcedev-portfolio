import React from 'react';
import './globals.css';
export const metadata = {
    title: 'Gökçe Soylu | Portfolio',
    description: 'Full-Stack Software Engineer & System Architect',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr">
            <body className="bg-background text-foreground antialiased">
                {children}
            </body>
        </html>
    );
}