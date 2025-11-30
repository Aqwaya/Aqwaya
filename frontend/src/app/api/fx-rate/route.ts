export async function GET() {
  try {
    // Free API for live exchange rates
    const res = await fetch(
      "https://open.er-api.com/v6/latest/USD"
    );

    const data = await res.json();

    if (!data?.rates?.NGN) {
      return Response.json({ success: false }, { status: 500 });
    }

    return Response.json({
      success: true,
      rate: data.rates.NGN, // ← USD → NGN
    });

  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
