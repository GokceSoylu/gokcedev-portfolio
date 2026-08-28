import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
    try {
        const apiKey = process.env.RESEND_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'RESEND_API_KEY ortam değişkeni bulunamadı.' },
                { status: 500 }
            );
        }

        const resend = new Resend(apiKey);
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Lütfen tüm alanları doldurun.' },
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: ['gokcesoylu24@gmail.com'],
            replyTo: email,
            subject: `📩 Yeni İletişim Formu Mesajı: ${name}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333; background-color: #f9f9f9; border-radius: 8px;">
                  <h2 style="color: #059669;">Yeni Portfolyo Mesajı</h2>
                  <p><strong>Gönderen:</strong> ${name} (${email})</p>
                  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
                  <p><strong>Mesaj:</strong></p>
                  <p style="white-space: pre-wrap; background: #fff; padding: 15px; border-radius: 6px; border: 1px solid #eee;">${message}</p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend Hata Detayı:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('Sunucu Hatası:', error);
        return NextResponse.json(
            { error: error?.message || 'Sunucu hatası oluştu.' },
            { status: 500 }
        );
    }
}