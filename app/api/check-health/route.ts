import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Ek simple GET request bhej kar check karna ki URL chal raha hai ya nahi
    const response = await fetch(url, { 
      method: 'GET',
      // 5 seconds ka timeout taaki agar link kharab ho toh humari app wait karke fass na jaye
      signal: AbortSignal.timeout(5000) 
    });

    if (response.ok) {
      return NextResponse.json({ status: "Live 🟢" });
    } else {
      return NextResponse.json({ status: "Down 🔴" });
    }
  } catch (error) {
    // Agar link puri tarah toot chuka hai, domain expire hai, ya crash hai
    return NextResponse.json({ status: "Down 🔴" });
  }
}