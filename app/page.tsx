'use client'

import { Skeleton } from "@/components/ui/skeleton";
import { Article, scrapeHackerNews } from "./cheerio/article";
import Display from "./ui/display";
import Header from "./ui/header";
import React, { Suspense } from "react";
import DisplaySkeleton from "./ui/display-skeleton";
import { Metadata } from "next";

/*
I had an issue in where the getData() function being called on every render of the Home component, 
which causes the page to keep reloading

I sent a prompt of the entire code, and it suggested to use state to prevent continous calling
*/

export default function Home() {
  const[isLoading, setIsLoading] = React.useState(true);
  const[data, setData] = React.useState([] as Article[]);
  const[currentSort, setSort] = React.useState("top");

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await scrapeHackerNews();
      setData(result);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  
  const onButtonClick = (): void => {
    setIsLoading(true);
    const fetchDate = async () => {
      const result = await scrapeHackerNews();
      setData(result);
      setIsLoading(false);
    };
    fetchDate();
  }

  const onTabChange = (value: string): void => {
    console.log(value)
    if (value !== "top" && value !== "trending" && value !== "fresh") {
      setSort("top");
    }
    setSort(value);
  };

  return (
    <main className="flex flex-1 flex-grow flex-col pb-12">
      <Header onTabChange={onTabChange} onButtonClick={onButtonClick}/>
      <div className="w-4/5 h-full ml-auto mr-auto pl-4 rounded-lg">
        {isLoading ? (
          <DisplaySkeleton />
        ) : (
          <Display currentSort={currentSort} data={data} />
        )
        }
      </div>
    </main>
  );
}
