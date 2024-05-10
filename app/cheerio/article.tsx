'use server';

import axios from "axios";
import cheerio from "cheerio"

/*
Initially, I used GPT to create the entire datascraping but it didn't work,
so I had to manually program it
*/

export type Article = {
    id: number
    title: string
    points: number
    poster: string
    posterLink : string
    commentCount: number
    commentLink: string
    date: Date
    articleLink: string
}

var MS_PER_MINUTE = 60000;

async function fetchHackerNews() {
    const response = await axios.get('https://news.ycombinator.com/');
    return response.data;
}

function parseComment(comment: string)  : number {
  if (comment === "discuss")
    return 0
  //I don't know why does string.replace(" comment","") does not work
  if (comment.replace("comment", "").length == 2)
    return 1
  //I also don't know why does string.replace(" comments","") does not work
  return Number(comment.replace("comments","").trim());
}

function parseDate(date: string): Date {
  return new Date(Date.parse(date));
}

function isEmpty(value: string) : boolean {
  return (value == null || (typeof value === "string" && value.trim().length === 0));
}

function extractArticles(html: string) {
    const $ = cheerio.load(html);
    const articles = [] as Article[];
  
    $('tr[class="athing"]').each(function(this: cheerio.Element) {
      const result = {} as Article
      result.id = Number($(this).attr('id'));
      result.title = $(this).children("td .title").children("span").children("a").text();
      result.points = Number($(this).next().children("td .subtext").children("span").children("span .score").text().replace(" points",""));
      result.poster = $(this).next().children("td .subtext").children("span").children("span .score").next().text();
      result.posterLink = "https://news.ycombinator.com/" + $(this).next().children("td .subtext").children("span").children("span .score").next().attr("href") as string;
      result.commentCount = parseComment($(this).next().children("td .subtext").children("span").children("span .score").next().next().next().next().next().text())
      result.commentLink = "https://news.ycombinator.com/" + $(this).next().children("td .subtext").children("span").children("span .score").next().next().next().next().next().attr("href") as string;
      result.date = parseDate($(this).next().children("td .subtext").children("span").children("span .score").next().next().attr("title") as string);
      result.articleLink = $(this).children("td .title").children("span").children("a").attr("href")!;

      if(!isEmpty(result.title) && !isEmpty(result.poster) && !isEmpty(result.posterLink) && !isEmpty(result.commentLink) && !isEmpty(result.articleLink))
        articles.push(result)
    })
  
    return articles;
}

export async function scrapeHackerNews() {
  try {
    const html = await fetchHackerNews();
    if (html) {
      const articles = extractArticles(html);
      return articles as Article[];
    } else {
      const empty: Article[] = new Array<Article>();
      return empty;
    }
  } catch (e) {
    console.log("Error fetching Hacker News")
    const empty: Article[] = new Array<Article>();
    return empty;
  }
}


const placeholder: Article[] = [
  {
    id: 0,
    title: "Swift",
    points: 55,
    poster: "mpweiher",
    posterLink: "test",
    commentCount: 27,
    commentLink: "test",
    date: new Date((new Date()).valueOf() - 4 * MS_PER_MINUTE),
    articleLink: "test"
  }, 
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    points: 215,
    poster: "emacsorccer",
    posterLink: "test1",
    commentCount: 45,
    commentLink: "test1",
    date: new Date((new Date()).valueOf() - 10 * MS_PER_MINUTE),
    articleLink: "test1"
  },
  {
    id: 2,
    title: "Deep",
    points: 347,
    poster: "aless",
    posterLink: "test1",
    commentCount: 30,
    commentLink: "test1",
    date: new Date((new Date()).valueOf() - 13 * MS_PER_MINUTE),
    articleLink: "test2"
  }
]