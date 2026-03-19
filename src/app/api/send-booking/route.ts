import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize the Resend SDK with your environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // 1. Get the data from the frontend fetch
    const body = await request.json();
    const { venue, date, vibe } = body;

    // 2. Format the date to look nice in your email
    const formattedDate = date 
      ? new Date(date).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }) 
      : 'TBA';

    // 3. Send the email!
    // NOTE: Because you are on a free Resend tier without a custom domain, 
    // you MUST use 'onboarding@resend.dev' as the FROM address, and your account email as the TO address.
    const data = await resend.emails.send({
      from: 'Booking Request <onboarding@resend.dev>', 
      to: 'aaronalagban.work@gmail.com', // MUST MATCH the email you signed up to Resend with!
      subject: `New Booking Request: ${venue || 'TBA'}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Booking Request for BRUNCHBOY</h2>
          <hr />
          <p><strong>📍 Venue:</strong> ${venue || 'Not specified'}</p>
          <p><strong>📅 Date:</strong> ${formattedDate}</p>
          <p><strong>🎵 Vibe:</strong> ${vibe || 'Not specified'}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}