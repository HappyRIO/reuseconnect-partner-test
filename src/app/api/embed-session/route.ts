import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getServerConfig } from "@/lib/config";
import { findUserById } from "@/lib/db";

type EmbedSessionResponse = {
  success: boolean;
  data?: {
    embedPath: string;
    token?: string;
    expiresAt?: string;
  };
  error?: string;
};

/**
 * Server-to-server: mint a ReuseConnect embed session for the logged-in partner user.
 * API key never leaves the server.
 */
export async function POST(request: Request) {
  try {
    const current = await getCurrentUser();
    if (!current) {
      return NextResponse.json(
        { success: false, error: "Not logged in" },
        { status: 401 },
      );
    }

    const user = findUserById(current.id);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    const body = (await request.json().catch(() => ({}))) as {
      mode?: "new" | "returning";
    };
    const mode = body.mode === "returning" ? "returning" : "new";

    const { apiBaseUrl, embedApiKey, embedOrigin } = getServerConfig();

    const payload =
      mode === "returning"
        ? { email: user.email }
        : {
            externalUserId: user.externalUserId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone || undefined,
            organisationName: user.organisationName || undefined,
            registrationNumber: user.registrationNumber || undefined,
            vatNumber: user.vatNumber || undefined,
            address: user.address || undefined,
          };

    const upstream = await fetch(`${apiBaseUrl}/api/embed/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Embed-Api-Key": embedApiKey,
      },
      body: JSON.stringify(payload),
    });

    const result = (await upstream.json()) as EmbedSessionResponse;

    if (!upstream.ok || !result.success || !result.data?.embedPath) {
      return NextResponse.json(
        {
          success: false,
          error:
            result.error ||
            `Embed session failed (${upstream.status})`,
        },
        { status: upstream.status >= 400 ? upstream.status : 502 },
      );
    }

    const embedUrl = `${embedOrigin}${result.data.embedPath}`;

    return NextResponse.json({
      success: true,
      data: {
        embedUrl,
        embedPath: result.data.embedPath,
        mode,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create embed session";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
