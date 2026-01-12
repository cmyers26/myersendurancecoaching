import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // Log environment variables (without exposing full values)
    console.log('Environment check:', {
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      supabaseUrlPrefix: process.env.SUPABASE_URL?.substring(0, 20),
    });

    // Initialize Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    // Test 1: Check if we can query the orders table
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('id')
      .limit(1);

    if (ordersError) {
      return res.status(500).json({
        success: false,
        test: 'query_orders',
        error: ordersError.message,
        code: ordersError.code,
        details: ordersError.details,
      });
    }

    // Test 2: Try to insert a test order
    const testOrder = {
      product_type: 'test',
      status: 'test',
      stripe_session_id: `test_${Date.now()}`,
      customer_email: 'test@test.com',
      amount_total: 100,
      currency: 'usd',
      created_at: new Date().toISOString(),
    };

    const { data: insertData, error: insertError } = await supabase
      .from('orders')
      .insert([testOrder])
      .select();

    if (insertError) {
      return res.status(500).json({
        success: false,
        test: 'insert_order',
        error: insertError.message,
        code: insertError.code,
        details: insertError.details,
        hint: insertError.hint,
      });
    }

    // Test 3: Clean up test order
    if (insertData && insertData.length > 0) {
      await supabase
        .from('orders')
        .delete()
        .eq('id', insertData[0].id);
    }

    return res.status(200).json({
      success: true,
      message: 'All Supabase tests passed!',
      ordersTableAccessible: true,
      canInsertOrders: true,
      testOrderId: insertData?.[0]?.id,
    });

  } catch (error: any) {
    console.error('Test error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
    });
  }
}

