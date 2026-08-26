import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Tüm alanları doldurunuz.' },
                { status: 400 }
            );
        }

        // 1. Supabase 'messages' tablosuna kaydet
        const { error: dbError } = await supabase
            .from('messages')
            .insert([{ name, email, message }]);

        if (dbError) {
            console.error('Database Error:', dbError);
            return NextResponse.json(
                { error: 'Mesaj kaydedilirken bir hata oluştu.' },
                { status: 500 }
            );
        }

        // 2. İsteğe Bağlı: Telegram/Discord Webhook (Opsiyonel)
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
        if (webhookUrl) {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: `📬 **Yeni Portfolyo Mesajı!**\n**Gönderen:** ${name} (${email})\n**Mesaj:** ${message}`,
                }),
            }).catch((err) => console.error('Webhook Error:', err));
        }

        return NextResponse.json({ success: true, message: 'Mesajınız başarıyla iletildi.' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Sunucu hatası oluştu.' },
            { status: 500 }
        );
    }
}