import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

// Environment variables (already in Vercel)
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // Minimal, harmless query — does NOT create data
    const { error } = await supabase
      .from('intakes') // <-- use any existing table
      .select('id')
      .limit(1)

    if (error) {
      console.error('Supabase keep-alive error:', error)
      return res.status(500).json({ success: false })
    }

    return res.status(200).json({
      success: true,
      message: 'Supabase keep-alive successful'
    })
  } catch (err) {
    console.error('Keep-alive exception:', err)
    return res.status(500).json({ success: false })
  }
}
