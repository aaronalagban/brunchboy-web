import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize the Resend SDK with your environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // 1. Get the data from the frontend fetch
    const body = await request.json();
    const { instagram, contactNumber, venue, date, vibe } = body;

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
    const data = await resend.emails.send({
      from: 'Booking Request <onboarding@resend.dev>', 
      to: 'aaronalagban.work@gmail.com', // MUST MATCH the email you signed up to Resend with!
      subject: `New Booking Request: ${venue || 'TBA'}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #111;">
          <h2 style="margin-bottom: 5px;">New Booking Request for BRUNCHBOY</h2>
          <p style="color: #666; margin-top: 0;">You have received a new set of details through the site.</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          
          <h3 style="margin-bottom: 10px; color: #0024E0;">Contact Info</h3>
          <p style="margin: 5px 0;"><strong>📱 Instagram:</strong> <a href="https://instagram.com/${instagram?.replace('@', '')}" target="_blank" style="color: #FF3300; text-decoration: none;">${instagram || 'Not specified'}</a></p>
          <p style="margin: 5px 0;"><strong>📞 Contact Number:</strong> ${contactNumber || 'Not specified'}</p>

          <h3 style="margin-top: 25px; margin-bottom: 10px; color: #0024E0;">Event Details</h3>
          <p style="margin: 5px 0;"><strong>📍 Venue:</strong> ${venue || 'Not specified'}</p>
          <p style="margin: 5px 0;"><strong>📅 Date:</strong> ${formattedDate}</p>
          <p style="margin: 5px 0;"><strong>🎵 Vibe:</strong> ${vibe || 'Not specified'}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}