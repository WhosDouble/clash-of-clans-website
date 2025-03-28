import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { clanTag } = req.query;
  const apiKey = process.env.COC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API Key is missing" });
  }

  try {
    const response = await fetch(
      `https://api.clashofclans.com/v1/clans/%23${encodeURIComponent(
        clanTag as string
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch clan data" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
