import { NextRequest, NextResponse } from "next/server";

const COC_API_URL = "";

export async function GET(
  req: NextRequest,
  { params }: { params: { endpoint: string } }
) {
  const { endpoint } = params;
  const apiKey = process.env.COC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing da Api Key" }, { status: 500 });
  }

  try {
    const response = await fetch(`${COC_API_URL}/${endpoint}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!response.ok) {
      throw new Error(`Error getting data: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data), console.log(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
