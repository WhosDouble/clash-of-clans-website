"use client";
import { useState, useEffect } from "react";

export default function ClanInfo() {
  const [data, setData] = useState<any>(null); // This will store either clan or player data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<string>("clan"); // Default search type is 'clan'
  const [searchQuery, setSearchQuery] = useState("#2Y2J0LQJ"); // Default search query (clan tag or player tag)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/clash/search?searchType=${searchType}&searchQuery=${encodeURIComponent(
            searchQuery
          )}`
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch data. Status: ${response.status}. ${errorText}`
          );
        }

        const data = await response.json();
        setData(data); // Set the data based on whether it's a clan or player
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchType, searchQuery]); // Re-run the effect when the searchType or searchQuery changes

  return (
    <div>
      <h1>Clash of Clans Info</h1>

      {/* Dropdown to choose between searching for clan or player */}
      <div>
        <label>Search Type: </label>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="clan">Clan</option>
          <option value="player">Player</option>
        </select>
      </div>

      {/* Input for clan tag or player tag */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={
          searchType === "clan" ? "Enter Clan Tag" : "Enter Player Tag"
        }
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {data && (
        <div>
          {searchType === "clan" && (
            <div>
              <h2>{data.name}</h2>
              <p>Tag: {data.tag}</p>
              <p>Type: {data.type}</p>
              <p>Members: {data.members}</p>
              <p>Clan Level: {data.clanLevel}</p>
              <p>Location: {data.location.name}</p>
              <p>Required Trophies: {data.requiredTrophies}</p>
            </div>
          )}

          {searchType === "player" && (
            <div>
              <h2>{data.name}</h2>
              <p>Tag: {data.tag}</p>
              <p>Level: {data.level}</p>
              <p>Clan: {data.clan.name}</p>
              <p>Trophies: {data.trophies}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
