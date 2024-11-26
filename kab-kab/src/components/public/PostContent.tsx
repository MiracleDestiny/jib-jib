import Link from "next/link";

interface PostContentProps {
  text: string;
}

export default function PostContent({ text }: PostContentProps) {
  // Use regex to match hashtags (works for Thai and English hashtags)
  if (text) {
    const hashtagRegex = /#[\wก-๙]+/g;

    // Match all parts including hashtags and non-hashtag text
    const parts = text.split(/(#[\wก-๙]+)/g);

    return (
      <div>
        {parts.map((part, index) => {
          // Check if the part is a hashtag
          if (hashtagRegex.test(part)) {
            return (
              <Link href={`/${part}`} className="text-primary-yellow font-bold">
                {part}
              </Link>
            );
          } else {
            return <span key={index}>{part}</span>;
          }
        })}
      </div>
    );
  }
  return <></>;
}
