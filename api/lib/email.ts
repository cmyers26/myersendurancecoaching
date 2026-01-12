import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send notification email to the owner when a purchase is made
 * 
 * @param email - Customer's email address
 * @param productType - Type of product purchased (e.g., 'level_1', 'pdf_5k')
 * @param amount - Purchase amount in cents
 * @returns Promise with email send result
 */
export async function sendOwnerNotificationEmail(
  email: string,
  productType: string,
  amount: number
): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in environment variables');
      return { success: false, error: 'Email service not configured' };
    }

    if (!process.env.OWNER_EMAIL) {
      console.error('OWNER_EMAIL is not set in environment variables');
      return { success: false, error: 'Owner email not configured' };
    }

    // Format amount for display (convert cents to dollars)
    const amountInDollars = (amount / 100).toFixed(2);

    // Format product type for display
    const productDisplayName = formatProductType(productType);

    // Send email to owner
    const result = await resend.emails.send({
      from: 'Myers Endurance Coaching <onboarding@resend.dev>',
      to: process.env.OWNER_EMAIL,
      subject: `New Purchase: ${productDisplayName} - $${amountInDollars}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
              <h1 style="color: #1976d2; margin: 0 0 16px 0; font-size: 24px;">
                🎉 New Purchase Notification
              </h1>
            </div>

            <div style="background-color: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
              <h2 style="color: #333; margin: 0 0 16px 0; font-size: 18px;">Purchase Details</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #666;">Product:</td>
                  <td style="padding: 8px 0; color: #333;">${productDisplayName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #666;">Amount:</td>
                  <td style="padding: 8px 0; color: #2e7d32; font-size: 18px; font-weight: 600;">$${amountInDollars}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #666;">Customer Email:</td>
                  <td style="padding: 8px 0; color: #333;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #666;">Product Type:</td>
                  <td style="padding: 8px 0; color: #666; font-family: monospace; font-size: 12px;">${productType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #666;">Date:</td>
                  <td style="padding: 8px 0; color: #333;">${new Date().toLocaleString('en-US', { 
                    dateStyle: 'full', 
                    timeStyle: 'short' 
                  })}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <p style="margin: 0; color: #856404; font-weight: 600;">
                📋 Next Steps:
              </p>
              <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #856404;">
                <li>Check Stripe Dashboard for payment details</li>
                <li>Review customer intake form in Supabase</li>
                <li>Reach out to customer via email to schedule onboarding</li>
              </ul>
            </div>

            <div style="text-align: center; padding-top: 16px; border-top: 1px solid #e0e0e0;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                Myers Endurance Coaching
              </p>
              <p style="color: #999; font-size: 12px; margin: 8px 0 0 0;">
                This is an automated notification from your coaching platform.
              </p>
            </div>
          </body>
        </html>
      `,
      text: `
New Purchase Notification

Purchase Details:
- Product: ${productDisplayName}
- Amount: $${amountInDollars}
- Customer Email: ${email}
- Product Type: ${productType}
- Date: ${new Date().toLocaleString()}

Next Steps:
- Check Stripe Dashboard for payment details
- Review customer intake form in Supabase
- Reach out to customer via email to schedule onboarding

---
Myers Endurance Coaching
This is an automated notification from your coaching platform.
      `.trim(),
    });

    if (result.error) {
      console.error('Resend API error:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log('Owner notification email sent successfully:', result.data?.id);
    return { success: true };

  } catch (error: any) {
    console.error('Error sending owner notification email:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send notification email' 
    };
  }
}

/**
 * Format product type for human-readable display
 * @param productType - Raw product type string
 * @returns Formatted product name
 */
function formatProductType(productType: string): string {
  const productNames: Record<string, string> = {
    'level_1': 'Bronze - Essential Coaching',
    'level_2': 'Silver - Premium Coaching',
    'level_3': 'Gold - Elite Virtual 1-on-1 Coaching',
    'strength_addon': 'Strength Training Program',
    'race_strategy_addon': 'Race Strategy Consultation',
    'pdf_5k': '5K Training Plan',
    'pdf_10k': '10K Training Plan',
    'pdf_half': 'Half Marathon Training Plan',
    'pdf_marathon': 'Marathon Training Plan',
  };

  return productNames[productType] || productType.replace(/_/g, ' ').toUpperCase();
}

