export function extractHashtags(text: string): string[] {
  // Regular expression to match hashtags
  const hashtagRegex = /#(\w+)/g;
  const matches = [];
  let match;

  // Use regex.exec in a loop to capture all hashtags
  while ((match = hashtagRegex.exec(text)) !== null) {
    matches.push(match[1]);
  }

  return matches;
}
