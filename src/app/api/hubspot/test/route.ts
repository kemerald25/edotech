import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

  const testEmail = `test_${Date.now()}@edotech.community`;

  const results: Record<string, unknown> = {
    tokenConfigured: !!token,
    tokenPrefix: token ? token.substring(0, 10) + "..." : "missing",
    portalId,
  };

  if (!token) {
    return NextResponse.json({
      success: false,
      error: "HUBSPOT_ACCESS_TOKEN is missing from process.env. If you just added it to .env, please restart 'npm run dev'.",
      diagnostics: results,
    }, { status: 400 });
  }

  // 1. Test CRM API
  try {
    const crmRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          email: testEmail,
          firstname: "Test",
          lastname: "Tester",
          phone: "+2348000000000",
          jobtitle: "Software Engineer",
          lifecyclestage: "lead",
        },
      }),
    });

    const crmText = await crmRes.text();
    results.crmApiStatus = crmRes.status;
    results.crmApiOk = crmRes.ok;
    try {
      results.crmApiResponse = JSON.parse(crmText);
    } catch {
      results.crmApiResponse = crmText;
    }
  } catch (err: unknown) {
    results.crmApiError = err instanceof Error ? err.message : "Network error";
  }

  return NextResponse.json({
    success: true,
    testEmail,
    diagnostics: results,
  });
}
