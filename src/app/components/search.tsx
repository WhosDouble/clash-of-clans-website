"use client";
import { useState, useEffect } from "react";

export default function ClanInfo() {
  const [clanData, setClanData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clanTag, setClanTag] = useState("#2Y2J0LQJ"); // Example clan tag

  useEffect(() => {
    const fetchClanData = async () => {
      try {
        const response = await fetch(
          `/api/clash/clans/${encodeURIComponent(clanTag)}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch clan data.");
        }

        setClanData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClanData();
  }, [clanTag]); // Re-fetch when the clanTag changes

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
