"use client";
import { useState, useEffect } from "react";

export default function ClanInfo() {
  const [clanData, setClanData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clanTag, setClanTag] = useState("#2Y2J0LQJ");

  useEffect(() => {
    const fetchClanData = async () => {
      try {
        const response = await fetch(
          `/api/clash/clans/${encodeURIComponent(clanTag)}`
        );

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          const errorText = await response.text(); // Get the raw response text
          throw new Error(
            `Failed to fetch clan data. Status: ${response.status}. ${errorText}`
          );
        }

        // Attempt to parse the response as JSON
        const data = await response.json();

        setClanData(data); // Set the clan data state
      } catch (err: any) {
        // Handle errors
        setError(err.message);
      } finally {
        setLoading(false); // Set loading state to false after completion
      }
    };

    fetchClanData();
  }, [clanTag]); // Re-run this effect when the clanTag changes

  return (
    <div>
      <h1>Clash of Clans Clan Info</h1>
      <input
        type="text"
        value={clanTag}
        onChange={(e) => setClanTag(e.target.value)}
        placeholder="Enter Clan Tag"
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {clanData && <pre>{JSON.stringify(clanData, null, 2)}</pre>}
    </div>
  );
}
