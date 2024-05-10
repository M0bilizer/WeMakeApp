'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

/*
I was having issue with Type{onTabChange: xxx} is not assignable to type 'InstrinsicAttributes & xxx,
so I copied my code from page.tsx and the function Header parameter to GPT,

and it resolved my issue by defining the HeaderProp
*/


type HeaderProp = {
    onTabChange: (value: string) => void;
    onButtonClick: () => void;
  };
  

export default function Header({onTabChange, onButtonClick}: HeaderProp) {
    return(
        <header className="sticky top-0 bg-white">
            <div className="flex pt-12 pb-4">
                <div className="w-4/5 ml-auto mr-auto rounded-lg">
                    <div className="flex justify-between pl-4">
                        <div className="flex">
                            <Tabs defaultValue="top" onValueChange={onTabChange} className="w-[400px]">
                                <TabsList>
                                    <TabsTrigger className="hover:bg-gray-50 transition-colors duration-300" value="top">Top</TabsTrigger>
                                    <TabsTrigger className="hover:bg-gray-50 transition-colors duration-300" value="trending">Trending</TabsTrigger>
                                    <TabsTrigger className="hover:bg-gray-50 transition-colors duration-300" value="fresh">Fresh</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                        <div className="flex">
                            <button onClick={onButtonClick} className="group items-center h-10 px-4 py-2 font-medium transition-colors duration-300 transform bg-gray-50 rounded-lg hover:bg-gray-100">
                                <svg className="w-5 h-5 mx-1 fill-gray-400 transition-colors duration-300 group-hover:fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}