"use client";

import { Card } from "@/components/ui/card";
import { Article } from "../cheerio/article";
import { Separator } from "@radix-ui/react-separator";

//I thought naming this table might be too similar to the <Table> from other library

function renderComment(commentCount: number): string {
  switch(commentCount) {
    case 0:
      return "no comment"
    case 1:
      return "1 comment"
    case NaN:
      return "unknown amount of comment"
    default:
      return commentCount + " comments"
  }
}


//my prompt:
/*
I've scraped some data such as
"1 hour ago"
"10 hours ago"
"23 hours ago"
"1 day ago"
"2 day ago"

and I stored them as Date object.

Now I want to render them in the same format,
can you make a function for me
*/
function renderDate(date: Date): string {
  const now = new Date();
  const diff = Math.round((now.getTime() - date.getTime()) / 1000); // Difference in seconds

  if (diff < 60) {
    return `${diff} seconds ago`;
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else {
    const days = Math.floor(diff / 86400);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }
}

export function Row({ article }: { article: Article }) {
  return(
      <div className="pb-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex justify-items-start space-y-1.5 p-4">
                  <div className="flex flex-col pr-2">
                    <div className="w-20 h-20 rounded-full flex justify-center items-center bg-gray-100">
                      <p className="opacity-100 text-black text-xl">{article.points}</p>
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight hover:underline"><a href={article.articleLink}>{article.title}</a></h3>
                    <span className="flex">
                      <p className="text-sm text-muted-foreground">by <span className="hover:underline"><a href={article.posterLink}>{article.poster}</a></span></p>
                      <Separator orientation="vertical" className="pl-2 pr-2"/>
                      <p className="text-sm text-muted-foreground hover:underline">
                        <a href={article.commentLink}>
                        {renderComment(article.commentCount)}
                        </a>
                      </p>
                      <p className="text-sm text-muted-foreground ml-4">
                        {renderDate(article.date)}
                      </p>
                    </span>
                  </div>
              </div>
          </div>
      </div>
  )
}

const sortByDate = (a: Article, b : Article) => {
  if (a.date === null && b.date === null) {
    return 0;
  } else if (a.date === null) {
    return -1;
  } else if (b.date === null) {
    return 1;
  } else {
    return a.date > b.date ? -1 : 1;
  }
};


function sortData(data: Article[], sortOption: string) {
  var sortedData = {} as Article[]
  switch(sortOption) {
    case "top":
      sortedData = data.sort((a, b) => (a.points > b.points ? -1 : 1))
      break;
    case "trending":
      sortedData = data.sort((a, b) => (a.commentCount > b.commentCount ? -1 : 1))
      break;
    case "fresh":
      sortedData = data.sort(sortByDate);
      break;
  }
  const print = sortedData.map(s => ({id: s.id, points: s.points, commentCount: s.commentCount}));
  console.log(print)
  return sortedData;
}

export default function Display({ data, currentSort }: { data: Article[], currentSort: string }) {
    const sortedData = sortData(data, currentSort);

    return(
      <div>
        {data.length ? (
          data.map((article) => (
            <Row key={article.id} article={article} />
          ))
        ) : (
          <div>
            <Card>
              No result.
            </Card>
          </div>
        )}
    </div>
    )
}