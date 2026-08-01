export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    if (!env.HF_TOKEN) {
      return new Response(JSON.stringify({ error: 'HF_TOKEN is not defined in Cloudflare dashboard.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const spaceUrl = "https://maxiu-uzumaki-gastrovision.hf.space";
    
    // Read the raw image body from the frontend request
    const contentType = request.headers.get('Content-Type') || 'image/jpeg';
    const body = await request.arrayBuffer();

    // Directly forward the raw image to the Hugging Face space /api/predict
    const response = await fetch(`${spaceUrl}/api/predict`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.HF_TOKEN}`,
        'Content-Type': contentType
      },
      body: body
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: `Hugging Face API failed: ${errorText}` }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const json = await response.json();
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
