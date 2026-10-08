// KVKK aydınlatma metni (Türkçe, bağlayıcı metin). Diğer diller: PrivacyBody<Dil>.tsx.
// Keep in sync with: reservation form (components/pages/ReservationClient.tsx, app/api/reservations),
// Google tag and consent banner (components/analytics/*), Vercel Analytics / Speed Insights
// (components/layout/RootDocument.tsx) — and with the translations next to this file.
import CerezTercihi from '@/components/ui/CerezTercihi'
import { ADRES, Bolum, EPOSTA, Liste, MERSIS, TELEFON, UNVAN, Vurgu } from './parts'

export default function PrivacyBodyTr() {
  return (
    <>
      <p className="pb-8 text-base leading-relaxed" style={{ color: 'var(--color-text-desc)' }}>
        Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, kolcuogluflorya.com sitesini
        kullandığınızda, bizimle telefon, WhatsApp veya sosyal medya üzerinden iletişime geçtiğinizde kişisel
        verilerinizin nasıl işlendiğini açıklar.
      </p>

      <Bolum baslik="Veri sorumlusu">
        <p>
          <Vurgu>{UNVAN}</Vurgu> (Kolcuoğlu Florya)
          <br />
          MERSİS No: {MERSIS}
          <br />
          {ADRES}
          <br />
          E-posta: <a href={`mailto:${EPOSTA}`} style={{ color: 'var(--color-gold)' }}>{EPOSTA}</a> · Telefon: {TELEFON}
        </p>
      </Bolum>

      <Bolum baslik="Hangi verileri, neden işliyoruz?">
        <Liste>
          <li>
            <Vurgu>Rezervasyon ve teklif formu:</Vurgu> adınız, soyadınız, telefonunuz, e-posta adresiniz, tarih,
            saat, kişi sayısı, masa tercihi ve yazdığınız notlar. Talebinizi yanıtlamak ve rezervasyonunuzu
            yapmak için kullanılır (KVKK m.5/2-c, sözleşmenin kurulması). Form bilgileri restoranımıza e-posta ile
            iletilir; sitede ayrıca bir veritabanında saklanmaz.
          </li>
          <li>
            <Vurgu>Telefon, WhatsApp ve sosyal medya mesajları:</Vurgu> bize yazdığınız veya aradığınız bilgiler
            (ad, telefon numarası, mesaj içeriği) rezervasyon ve sorularınızı yanıtlamak için kullanılır (KVKK
            m.5/2-c ve m.5/2-f, meşru menfaat).
          </li>
          <li>
            <Vurgu>Site kullanım ölçümü:</Vurgu> Vercel Web Analytics ve Speed Insights ile hangi sayfaların
            ziyaret edildiğini ve sitenin hızını ölçeriz. Bu ölçüm çerez kullanmaz ve sizi tanımlamaz; ülke ve
            cihaz türü gibi toplu bilgiler görürüz.
          </li>
          <li>
            <Vurgu>Site kullanım analizi (Google Analytics):</Vurgu>{' '}çerez bildiriminde{' '}
            <Vurgu>Kabul et</Vurgu>{' '}derseniz Google Analytics 4 ile hangi sayfalara baktığınızı, Ara ve WhatsApp
            düğmelerine ve rezervasyon formunun adımlarına dokunmanızı, siteye nereden geldiğinizi (Google araması,
            Instagram, reklam gibi), cihaz türünüzü ve yaklaşık konumunuzu (şehir) ölçeriz; tarayıcınıza _ga ve
            _ga_ ile başlayan çerezler yazılır (KVKK m.5/1, açık rıza). Formda yazdığınız ad, telefon, e-posta gibi
            bilgiler Google Analytics&apos;e gönderilmez.{' '}<Vurgu>Reddet</Vurgu>{' '}derseniz bu çerezler yazılmaz.
          </li>
          <li>
            <Vurgu>Reklam ölçümü:</Vurgu>{' '}Google Ads etiketi, &quot;Ara&quot; veya &quot;WhatsApp&quot;
            bağlantılarına tıklanmasını bir rezervasyon sinyali olarak sayar. Çerez bildiriminde{' '}
            <Vurgu>Kabul et</Vurgu> derseniz Google ölçüm çerezleri yazılır (KVKK m.5/1, açık rıza);{' '}
            <Vurgu>Reddet</Vurgu>{' '}derseniz çerez yazılmaz, Google&apos;a yalnızca kimlik içermeyen bir sinyal
            gider.
          </li>
        </Liste>
      </Bolum>

      <Bolum baslik="Verileriniz kimlerle paylaşılır?">
        <p>Verilerinizi satmayız ve reklam amacıyla başkalarına vermeyiz. Hizmeti sunabilmek için şu sağlayıcıları kullanırız:</p>
        <Liste>
          <li><Vurgu>Vercel Inc.</Vurgu> (sitenin barındırılması ve kullanım ölçümü)</li>
          <li><Vurgu>Google LLC</Vurgu> (e-posta altyapısı, site analizi, reklam ölçümü, Google Haritalar)</li>
          <li><Vurgu>Meta Platforms</Vurgu> (WhatsApp, Instagram ve Facebook üzerinden bize yazdığınızda)</li>
        </Liste>
        <p>
          Bu sağlayıcıların sunucuları yurt dışında bulunabilir. Ayrıca kanunen yetkili kamu kurumlarının talebi
          olursa veriler bu kurumlarla paylaşılabilir.
        </p>
      </Bolum>

      <Bolum baslik="Ne kadar süre saklarız?">
        <p>
          Rezervasyon ve iletişim bilgilerinizi talebiniz sonuçlandıktan sonra en fazla 1 yıl saklarız; yasal
          saklama yükümlülüğü olan kayıtlar (ör. fatura) ilgili mevzuattaki süre boyunca tutulur. Süre dolunca
          veriler silinir veya anonim hâle getirilir. Google Analytics verileri Google&apos;da en fazla 14 ay
          saklanır.
        </p>
      </Bolum>

      <Bolum baslik="Çerezler">
        <Liste>
          <li>
            <Vurgu>Zorunlu (tarayıcınızda):</Vurgu> çerez tercihiniz ve açık/koyu tema seçiminiz. Siteyi
            kullanabilmeniz için gereklidir, kimseyle paylaşılmaz.
          </li>
          <li>
            <Vurgu>Site analizi (Google Analytics):</Vurgu>{' '}_ga ve _ga_ ile başlayan çerezler; yalnızca onay
            verirseniz yazılır, en fazla 2 yıl tarayıcınızda kalır.
          </li>
          <li>
            <Vurgu>Reklam ölçümü (Google):</Vurgu> yalnızca onay verirseniz yazılır.
          </li>
        </Liste>
        <p>Tercihinizi istediğiniz zaman değiştirebilirsiniz; onayı geri alırsanız bu çerezler silinir:</p>
        <CerezTercihi label="Çerez tercihimi değiştir" />
      </Bolum>

      <Bolum baslik="Kolcuoğlu Panel (iç yönetim aracımız)">
        <p>
          Kolcuoğlu Panel, işletme yöneticilerimizin kendi Google Ads hesabımızın, Google Analytics
          mülkümüzün, Google İşletme Profilimizin,
          Facebook sayfamızın, Instagram hesabımızın ve Meta reklam hesabımızın istatistiklerini tek yerde
          görmek için kullandığı bir iç araçtır. Herkese açık değildir.
        </p>
        <Liste>
          <li>
            Google veya Meta hesabıyla bağlandığında yalnızca <Vurgu>okuma</Vurgu> yapar: reklam sonuçları,
            profil istatistikleri, yorumlar ve mesajlar görüntülenir; hiçbir hesapta değişiklik yapılmaz,
            mesaj gönderilmez.
          </li>
          <li>
            Erişim anahtarları yalnızca işletmemizin kendi bilgisayarında saklanır. Bize gönderdiğiniz mesaj ve
            yorumlar yanıtlayabilmemiz için ekranda gösterilir; diske kaydedilmez, kısa süreli bellekte tutulur.
          </li>
          <li>Bu veriler üçüncü kişilerle paylaşılmaz, satılmaz ve reklam amacıyla kullanılmaz.</li>
          <li>
            Kolcuoğlu Panel&apos;in Google API&apos;lerinden aldığı bilgileri kullanması ve başka uygulamalara
            aktarması, Sınırlı Kullanım (Limited Use) şartları dâhil{' '}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--color-gold)' }}
            >
              Google API Hizmetleri Kullanıcı Verileri Politikası
            </a>
            &apos;na uygundur.
          </li>
        </Liste>
      </Bolum>

      <Bolum baslik="Haklarınız ve başvuru">
        <p>KVKK m.11 uyarınca kişisel verilerinizle ilgili olarak:</p>
        <Liste>
          <li>işlenip işlenmediğini öğrenme ve işlenmişse bilgi isteme,</li>
          <li>işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
          <li>aktarıldığı üçüncü kişileri bilme,</li>
          <li>eksik veya yanlış işlenmişse düzeltilmesini, şartları oluşmuşsa silinmesini isteme,</li>
          <li>otomatik sistemlerle analiz sonucu aleyhinize bir sonuca itiraz etme,</li>
          <li>kanuna aykırı işleme nedeniyle zarara uğrarsanız zararın giderilmesini talep etme</li>
        </Liste>
        <p>
          haklarına sahipsiniz. Başvurunuzu <a href={`mailto:${EPOSTA}`} style={{ color: 'var(--color-gold)' }}>{EPOSTA}</a>{' '}
          adresine e-posta ile veya yukarıdaki adrese yazılı olarak iletebilirsiniz. Başvurunuzu en geç 30 gün
          içinde ücretsiz olarak yanıtlarız.
        </p>
      </Bolum>
    </>
  )
}
