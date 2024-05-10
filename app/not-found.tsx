'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";

export default function NotFound() {
    return (
        <main className="flex justify-center items-center h-screen">
                <div className="p-12 rounded-lg border bg-card text-card-foreground shadow-sm max-w-md w-full">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">404 - Page Not Found</h1>
                    <p className="text-gray-600 mb-6">The page you are looking for might have been removed, had its name changed or is
                        temporarily unavailable.</p>
                    <a href="/" className="inline-block py-3 px-6 bg-gray-50  hover:bg-gray-100 transition-colors duration-300 rounded-lg font-semibold">Go
                        back to homepage</a>
                </div>
        </main>
    )
}