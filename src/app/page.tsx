"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [clanTag, setClanTag] = useState("#2Y2J0LQJ"); // Default Clan Tag
  const [clanData, setClanData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClanData = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = process.env.COC_API_KEY;
        const response = await fetch(
          `https://api.clashofclans.com/v1/clans/%23${encodeURIComponent(
            clanTag
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
          throw new Error(data.error || "Failed to fetch clan data");
        }

        setClanData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClanData();
  }, [clanTag]);

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
      {clanData && (
        <div>
          <h2>{clanData.name}</h2>
          <p>Tag: {clanData.tag}</p>
          <p>Type: {clanData.type}</p>
          <p>Members: {clanData.members}</p>
          <p>Clan Level: {clanData.clanLevel}</p>
          <p>Location: {clanData.location.name}</p>
          <p>Required Trophies: {clanData.requiredTrophies}</p>
        </div>
      )}
    </div>
  );
}
