import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { startOfWeek, endOfWeek, format } from "date-fns"
import { toZonedTime, fromZonedTime } from "date-fns-tz"

export async function GET(
  request: Request
) {
  const { searchParams } = new URL(request.url);

  // Get required query parameters
  const table = searchParams.get('table') || '';
  const payid = searchParams.get('payid') || '1';

  try {
    // Verify Supabase connection
    if (!supabase) {
      console.error('Supabase client not initialized');
      return NextResponse.json({ error: 'Database connection error' }, { status: 500 });
    }

    const melbourneTimeZone = "Australia/Melbourne"
    const nowInMelbourne = toZonedTime(new Date(), melbourneTimeZone)

    // Calculate start and end of the current week in Melbourne time
    const startOfCurrentWeek = startOfWeek(nowInMelbourne, { weekStartsOn: 1 }) // 1 means week starts on Monday
    const endOfCurrentWeek = endOfWeek(nowInMelbourne, { weekStartsOn: 1 })

    // Convert back to UTC for database query
    const startDate = fromZonedTime(startOfCurrentWeek, melbourneTimeZone)
    const endDate = fromZonedTime(endOfCurrentWeek, melbourneTimeZone)

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .neq('payid', payid)
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json({
        error: `Query error: ${error.message}`,
        details: error
      }, { status: 500 });
    }

    return NextResponse.json({ data });

  }

  catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      error: `Error: ${error}`,
      details: error
    }, { status: 500 });
  }
}