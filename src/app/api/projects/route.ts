import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        const { data: projects, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data: projects }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: 'Sunucu hatası oluştu.' }, { status: 500 });
    }
}