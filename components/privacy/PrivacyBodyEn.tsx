// English translation of the KVKK privacy notice (PrivacyBodyTr.tsx is the binding text).
// Keep the facts in step with the Turkish version whenever either one changes.
import CerezTercihi from '@/components/ui/CerezTercihi'
import { ADRES, Bolum, EPOSTA, Liste, MERSIS, TELEFON, UNVAN, Vurgu } from './parts'

export default function PrivacyBodyEn() {
  return (
    <>
      <p className="pb-4 text-base leading-relaxed" style={{ color: 'var(--color-text-desc)' }}>
        This notice explains how we process your personal data when you use kolcuogluflorya.com or contact us
        by phone, WhatsApp or social media, in accordance with Turkish Law No. 6698 on the Protection of
        Personal Data (KVKK).
      </p>
      <p className="pb-8 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        This English version is provided for convenience. If it differs from the Turkish version, the Turkish
        version prevails.
      </p>

      <Bolum baslik="Data controller">
        <p>
          <Vurgu>{UNVAN}</Vurgu> (Kolcuoğlu Florya)
          <br />
          MERSIS No: {MERSIS}
          <br />
          {ADRES}
          <br />
          Email: <a href={`mailto:${EPOSTA}`} style={{ color: 'var(--color-gold)' }}>{EPOSTA}</a> · Phone: {TELEFON}
        </p>
      </Bolum>

      <Bolum baslik="What data we process, and why">
        <Liste>
          <li>
            <Vurgu>Reservation and quote form:</Vurgu> your first name, last name, phone number, email address,
            date, time, number of guests, table preference and any notes you write. We use them to respond to
            your request and make your reservation (KVKK Art. 5(2)(c), establishing a contract). The form details
            are sent to our restaurant by email; the site does not store them in a separate database.
          </li>
          <li>
            <Vurgu>Phone calls, WhatsApp and social media messages:</Vurgu> the information you give us when you
            call or write to us (name, phone number, message content) is used to handle your reservation and
            answer your questions (KVKK Art. 5(2)(c), and Art. 5(2)(f), legitimate interest).
          </li>
          <li>
            <Vurgu>Site usage measurement:</Vurgu> we use Vercel Web Analytics and Speed Insights to measure
            which pages are visited and how fast the site loads. This measurement uses no cookies and does not
            identify you; we only see aggregate information such as country and device type.
          </li>
          <li>
            <Vurgu>Site usage analysis (Google Analytics):</Vurgu> if you click <Vurgu>Accept</Vurgu> on the
            cookie notice, we use Google Analytics 4 to measure which pages you view, your taps on the call and
            WhatsApp buttons and on the steps of the reservation form, where you came to the site from (such as
            Google Search, Instagram or an ad), your device type and your approximate location (city). Cookies
            whose names start with _ga and _ga_ are stored in your browser (KVKK Art. 5(1), explicit consent).
            The details you enter in the form, such as your name, phone number and email address, are never sent
            to Google Analytics. If you click <Vurgu>Decline</Vurgu>, these cookies are not set.
          </li>
          <li>
            <Vurgu>Ad measurement:</Vurgu> the Google Ads tag counts clicks on call and WhatsApp links as a
            reservation signal. If you click <Vurgu>Accept</Vurgu> on the cookie notice, Google measurement
            cookies are set (KVKK Art. 5(1), explicit consent); if you click <Vurgu>Decline</Vurgu>, no cookies
            are set and Google receives only a signal that contains no identifiers.
          </li>
        </Liste>
      </Bolum>

      <Bolum baslik="Who we share your data with">
        <p>We never sell your data or pass it on to others for advertising. To run our service, we use these providers:</p>
        <Liste>
          <li><Vurgu>Vercel Inc.</Vurgu> (website hosting and usage measurement)</li>
          <li><Vurgu>Google LLC</Vurgu> (email, site analytics, ad measurement, Google Maps)</li>
          <li><Vurgu>Meta Platforms</Vurgu> (when you contact us via WhatsApp, Instagram or Facebook)</li>
        </Liste>
        <p>
          These providers’ servers may be located outside Türkiye. We may also share data with public
          authorities when they are legally entitled to request it.
        </p>
      </Bolum>

      <Bolum baslik="How long we keep it">
        <p>
          We keep your reservation and contact details for no more than 1 year after your request has been
          completed. Records we are legally required to keep (such as invoices) are kept for the period set by
          the relevant legislation. When that period ends, the data is deleted or anonymised. Google keeps Google
          Analytics data for up to 14 months.
        </p>
      </Bolum>

      <Bolum baslik="Cookies">
        <Liste>
          <li>
            <Vurgu>Strictly necessary (stored in your browser):</Vurgu> your cookie preference and your light or
            dark theme choice. The site needs these to work, and they are not shared with anyone.
          </li>
          <li>
            <Vurgu>Site analytics (Google Analytics):</Vurgu> cookies whose names start with _ga and _ga_. They
            are set only with your consent and stay in your browser for up to 2 years.
          </li>
          <li>
            <Vurgu>Ad measurement (Google):</Vurgu> set only with your consent.
          </li>
        </Liste>
        <p>You can change your choice at any time. If you withdraw your consent, these cookies are deleted:</p>
        <CerezTercihi label="Change my cookie preferences" />
      </Bolum>

      <Bolum baslik="Kolcuoğlu Panel (our internal management tool)">
        <p>
          Kolcuoğlu Panel is an internal tool our managers use to see, in one place, the statistics of our own
          Google Ads account, Google Analytics property, Google Business Profile, Facebook page, Instagram
          account and Meta ad account. It is not available to the public.
        </p>
        <Liste>
          <li>
            When connected to a Google or Meta account, it only <Vurgu>reads</Vurgu> data: it displays ad
            results, profile statistics, reviews and messages. It never changes anything in any account and never
            sends messages.
          </li>
          <li>
            Access tokens are stored only on our business’s own computer. Messages and reviews you send us are
            shown on screen so that we can reply; they are not saved to disk and are kept only briefly in memory.
          </li>
          <li>This data is not shared with third parties, sold or used for advertising.</li>
          <li>
            Kolcuoğlu Panel’s use and transfer to any other app of information received from Google APIs will
            adhere to the{' '}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--color-gold)' }}
            >
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </li>
        </Liste>
      </Bolum>

      <Bolum baslik="Your rights and how to exercise them">
        <p>Under Article 11 of the KVKK, you have the right to:</p>
        <Liste>
          <li>find out whether your personal data is being processed and, if so, request information about it;</li>
          <li>find out the purpose of the processing and whether the data is being used for that purpose;</li>
          <li>know the third parties to whom it has been transferred;</li>
          <li>ask for it to be corrected if it is incomplete or inaccurate, and deleted where the legal conditions are met;</li>
          <li>object to any outcome against you that results from analysis by automated systems;</li>
          <li>claim compensation if you suffer loss because of unlawful processing.</li>
        </Liste>
        <p>
          You can send your request by email to{' '}
          <a href={`mailto:${EPOSTA}`} style={{ color: 'var(--color-gold)' }}>{EPOSTA}</a> or in writing to the
          address above. We will reply free of charge within 30 days at the latest.
        </p>
      </Bolum>
    </>
  )
}
