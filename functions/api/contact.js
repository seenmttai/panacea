export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    
    // Parse JSON request body
    const body = await request.json();
    const { name, email, organization, inquiryType, message } = body;

    const escapeHtml = (str) => {
      if (typeof str !== 'string') return '';
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const safeName = escapeHtml(name || '');
    const safeEmail = escapeHtml(email || '');
    const safeOrg = escapeHtml(organization || 'N/A');
    const safeInquiry = escapeHtml(inquiryType || 'General Inquiry');
    const safeMessage = escapeHtml(message || '');

    const apiKey = env.RESEND_API_KEY || env.RESEND_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'RESEND_KEY / RESEND_API_KEY is not defined in Cloudflare dashboard environment variables.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Panacea AI <onboarding@resend.dev>',
        to: ['kritagya.singh.dev@gmail.com'],
        subject: `New Clinical Inquiry: ${safeName} (${safeInquiry})`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #0F172A;">
            <h2 style="color: #0284C7;">Panacea Medical AI - New Contact Submission</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Institution / Network:</strong> ${safeOrg}</p>
            <p><strong>Inquiry Category:</strong> ${safeInquiry}</p>
            <hr style="border: none; border-top: 1px solid #CBD5E1; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: #F1F5F9; padding: 15px; border-radius: 8px;">${safeMessage}</p>
          </div>
        `
      })
    });

    const resendData = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: resendData }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(resendData), {
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
