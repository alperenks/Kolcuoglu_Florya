import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      date, time, guests,
      firstName, lastName, email, phone,
      notes, allergies,
    } = body

    const tableType = body.tableType || 'standart'

    // Validate required fields
    if (!date || !time || !guests || !firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: 'Zorunlu alanlar eksik' },
        { status: 400 }
      )
    }

    // Mock response
    const mockReservation = {
      id: `res_${Date.now()}`,
      date,
      time,
      guests,
      tableType,
      firstName,
      lastName,
      email,
      phone,
      notes: notes ?? null,
      allergies: allergies ?? null,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }

    // Send notification email to admin (alperen.keles701@gmail.com)
    try {
      const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
      const smtpPort = parseInt(process.env.SMTP_PORT || '465')
      const smtpUser = process.env.SMTP_USER
      const smtpPass = process.env.SMTP_PASS

      if (smtpUser && smtpPass) {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        })

        const recipientEmail = process.env.RECIPIENT_EMAIL || 'alperen.keles701@gmail.com'

        const mailOptions = {
          from: `"Kolcuoğlu Rezervasyon" <${smtpUser}>`,
          to: recipientEmail,
          subject: `Yeni Rezervasyon / Teklif Talebi - ${firstName} ${lastName}`,
          text: `
            Yeni bir grup rezervasyonu / fiyat teklifi talebi alındı:

            Müşteri: ${firstName} ${lastName}
            Tarih: ${date}
            Saat: ${time}
            Kişi Sayısı: ${guests}
            E-posta: ${email}
            Telefon: ${phone}
            Özel İstekler: ${notes || 'Belirtilmedi'}
          `,
          html: `
            <div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 5px; background-color: #ffffff; color: #333333;">
              <h2 style="color: #c44b3b; border-bottom: 2px solid #c44b3b; padding-bottom: 10px; margin-top: 0;">Yeni Teklif & Rezervasyon Talebi</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold; width: 35%; color: #555555;">Müşteri:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #555555;">Tarih & Saat:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${date} @ ${time}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #555555;">Kişi Sayısı:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${guests} Kişi</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #555555;">E-posta:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${email}" style="color: #b87333; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #555555;">Telefon:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;"><a href="tel:${phone}" style="color: #b87333; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #555555;">Özel İstekler:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-style: italic;">${notes || 'Belirtilmedi'}</td>
                </tr>
              </table>
              <div style="margin-top: 25px; font-size: 11px; color: #888; text-align: center; border-top: 1px solid #f0f0f0; padding-top: 15px;">
                Bu e-posta Kolcuoğlu Kebap & Gastronomi web sitesinden otomatik olarak gönderilmiştir.
              </div>
            </div>
          `,
        }

        await transporter.sendMail(mailOptions)
        console.log(`Reservation email sent successfully to: ${recipientEmail}`)
      } else {
        console.warn('SMTP credentials missing. Email notification skipped.')
      }
    } catch (emailError) {
      console.error('Nodemailer error sending reservation notification email:', emailError)
    }

    return NextResponse.json(
      { success: true, reservation: mockReservation },
      { status: 201 }
    )
  } catch (error) {
    console.error('Reservation error:', error)
    return NextResponse.json(
      { error: 'Rezervasyon oluşturulamadı. Lütfen tekrar deneyiniz.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Bu endpoint kimlik doğrulaması gerektirir.' },
    { status: 401 }
  )
}
