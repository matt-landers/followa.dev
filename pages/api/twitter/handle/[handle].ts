import { NextApiRequest, NextApiResponse } from 'next';

const TWITTER_TOKEN = process.env.TWITTER_TOKEN;
const TWITTER_ENDPOINT = 'https://api.twitter.com/2/users/by?';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const params = {
    username: (req.query.handle as string).replace('@', ''),
    fields: 'created_at,description',
  };

  const url = `${TWITTER_ENDPOINT}usernames=${params.username}&user.fields=${params.fields}`;

  const result = await fetch(url, {
    headers: {
      authorization: `Bearer ${TWITTER_TOKEN}`,
    },
  });

  if (!result.ok) {
    return res.status(404).end();
  }

  const json = await result.json();

  if (json.errors) {
    return res.status(404).end();
  }

  return res.status(200).end();
}
