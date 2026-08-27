import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend istemcisi (API Key ortam değişkeninden çekilir)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        // Basit veri doğrulama (Validation)
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Lütfen tüm alanları doldurun.' },
                { status: 400 }
            );
        }

        // E-posta Gönderimi
        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Resend varsayılan göndericisi
            to: ['gokcesoylu24@gmail.com'], // Bildirimin düşmesini istediğin kendi e-postan
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

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Mesaj gönderilirken bir sunucu hatası oluştu.' },
            { status: 500 }
        );
    }
}