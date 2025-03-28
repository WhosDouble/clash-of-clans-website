// /pages/api/clash/search.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchType, searchQuery } = req.query; // Get the search type (e.g., clan, player) and search query (e.g., clan tag, player tag)
  const apiKey = process.env.COC_API_KEY; // Get the API key from environment variables

  // Check if API key exists
  if (!apiKey) {
    return res.status(500).json({ error: "API Key is missing" });
  }

  // Validate the input
  if (!searchType || !searchQuery) {
    return res
      .status(400)
      .json({ error: "Missing search parameters (searchType or searchQuery)" });
  }

  try {
    let url: string;

    // Construct the URL based on the search type
    if (searchType === "clan") {
      url = `https://api.clashofclans.com/v1/clans/%23${encodeURIComponent(
        searchQuery as string
      )}`;
    } else if (searchType === "player") {
      url = `https://api.clashofclans.com/v1/players/%23${encodeURIComponent(
        searchQuery as string
      )}`;
    } else {
      return res.status(400).json({
        error: "Invalid searchType. Supported types: 'clan', 'player'",
      });
    }

    // Fetch data from Clash of Clans API
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    // Parse the response from Clash of Clans API
    const data = await response.json();

    // Handle errors from the API response
    if (!response.ok) {
      return res
        .status(500)
        .json({ error: data.error || "Failed to fetch data" });
    }

    // Return the fetched data to the client
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
