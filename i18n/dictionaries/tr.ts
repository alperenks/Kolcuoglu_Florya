// Türkçe metinler — sitenin asıl dili. Diğer dillerin sözlükleri bu dosyanın şeklini (Dictionary tipi) izler.
// Bir metni değiştirirken diğer dillerdeki karşılığını da güncelleyin (i18n/dictionaries/*.ts).

const tr = {
  phoneDisplay: '0533 131 54 01',
  whatsappText: 'Merhaba, rezervasyon yaptırmak istiyorum.',

  meta: {
    siteTitle: 'Kolcuoğlu Florya | Metrelik Kebap ve Ocakbaşı Restoranı – İstanbul',
    siteDescription:
      "1910'dan bu yana kor ateşinde pişen metrelik kebap, Adana kebap ve geleneksel mezeler. İstanbul Florya'da deniz manzaralı kebap restoranı. Rezervasyon: 0533 131 54 01",
    keywords: ['kolcuoğlu', 'kolcuoğlu florya', 'kebap', 'metrelik kebap', 'adana kebap', 'florya restoran', 'istanbul kebapçı', 'ocakbaşı', 'meze', 'türk mutfağı'],
    ogTitle: 'Kolcuoğlu Florya | Metrelik Kebap ve Ocakbaşı Restoranı',
    ogDescription: "1910'dan bu yana İstanbul'un en köklü kebap geleneği, Florya'da.",
    ogImageAlt: 'Kolcuoğlu Florya metrelik kebap',
    twitterDescription: "İstanbul Florya'da deniz manzaralı kebap restoranı.",
    restaurantDescription: "İstanbul Florya'da premium kebap ve gastronomi restoranı.",
    menu: {
      title: 'Menü – Metrelik Kebap, Adana Kebap ve Meze Fiyatları',
      description:
        "Kolcuoğlu Florya menüsü: metrelik kebap, Adana kebap, kuzu şiş, sarma beyti, mezeler, lahmacun, künefe ve katmer. Güncel fiyatlarla İstanbul Florya'da.",
    },
    gallery: {
      title: 'Galeri',
      description:
        "Kolcuoğlu Florya'dan kareler: metrelik kebap, Adana kebap, ocakbaşı, deniz manzaralı teras ve salonlarımız. İstanbul Florya'da kebap restoranı.",
    },
    contact: {
      title: 'İletişim',
      description:
        'Kolcuoğlu Florya iletişim: Basınköy, Çekmece İstanbul Cd. No:39, Bakırköy/İstanbul. Her gün 11:00 – 00:00. Tel: 0533 131 54 01. Konum ve yol tarifi.',
    },
    corporate: {
      title: 'Şirket Yemekleri & Gruplar',
      description:
        "İstanbul Florya'da şirket yemekleri, kurumsal davetler ve grup organizasyonları. Deniz manzaralı salonlarda metrelik kebap eşliğinde toplu yemek.",
    },
    reservation: {
      title: 'Rezervasyon – Online Masa Ayırtın',
      description:
        "Kolcuoğlu Florya'da online rezervasyon yapın. Deniz manzaralı salon, ocakbaşı ve VIP salon için masanızı ayırtın. İstanbul Florya. Tel: 0533 131 54 01",
    },
    privacy: {
      title: 'Gizlilik ve KVKK',
      description:
        'Kolcuoğlu Florya kişisel verilerin korunması aydınlatma metni: hangi verileri neden işliyoruz, çerezler, haklarınız ve başvuru yolları.',
    },
  },

  nav: {
    home: 'Ana Sayfa',
    menu: 'Menü',
    gallery: 'Galeri',
    corporate: 'Şirket Yemekleri',
    contact: 'İletişim',
    book: 'Rezervasyon Yap',
    themeToggle: 'Temayı Değiştir',
    openMenu: 'Menüyü aç',
    language: 'Dil',
  },

  footer: {
    blurb:
      "116 yıllık ustalık geleneğini, modern gastronomi anlayışıyla buluşturan sofra teki İstanbul'un eşsiz kebap deneyimi.",
    quickLinks: 'Hızlı Erişim',
    contact: 'İletişim',
    hours: 'Her Gün: 11:00 – 00:00',
    rights: '© Kolcuoğlu Kebap & Gastronomi. Tüm hakları saklıdır.',
    privacy: 'Gizlilik ve KVKK',
    tagline: 'Kolcuoğlu, Herkes için.',
  },

  stickyBar: {
    label: 'Hızlı iletişim',
    call: 'Rezervasyon İçin Ara',
  },

  consent: {
    title: 'Çerez Tercihi',
    text:
      'Site kullanımını, rezervasyon aramalarını ve reklam performansını ölçmek için çerez kullanıyoruz. Kabul etmezseniz site aynı şekilde çalışır; yalnızca ölçüm çerezleri yazılmaz.',
    privacy: 'Gizlilik ve KVKK',
    decline: 'Reddet',
    accept: 'Kabul et',
  },

  stories: {
    titles: {
      'yedi-nesil': 'Yedi Nesil',
      'metrelik-kebap': 'Metrelik Kebap',
      teras: 'Mekan & Teras',
    },
    /** {title} yerine hikaye adı gelir */
    watch: '{title} hikayesini izle',
    unmute: 'Sesi aç',
    mute: 'Sesi kapat',
    close: 'Kapat',
    swipeToClose: 'Kapatmak için kaydırın',
    imageAlt: 'Story image content',
  },

  // Galeri ve ana sayfadaki görsellerin alt metinleri (dosya yoluna göre)
  imageAlts: {
    '/images/kolcuoglu-florya-ozel-menu-metrelik-kebap.jpg': 'Kolcuoğlu Florya özel menü – metrelik kebap sunumu',
    '/images/hasan-kolcuoglu-metrelik-kebap-mucidi.jpeg': 'Metrelik kebabın mucidi Hasan Kolcuoğlu',
    '/images/kolcuoglu-florya-deniz-manzarali-teras.jpeg': 'Kolcuoğlu Florya deniz manzaralı teras',
    '/images/kolcuoglu-florya-restoran-salonu.jpeg': 'Kolcuoğlu Florya restoran salonu',
    '/images/kolcuoglu-florya-deniz-manzarali-salonu.jpeg': 'Kolcuoğlu Florya deniz manzaralı yemek salonu',
    '/images/kolcuoglu-florya-ic-mekan-tasarimi.jpeg': 'Kolcuoğlu Florya iç mekan tasarımı',
    '/images/kolcuoglu-florya-adana-kebap.jpg': 'Kolcuoğlu Florya Adana kebap',
    '/images/kolcuoglu-florya-kebap-sofrasi.jpg': 'Kolcuoğlu Florya kebap sofrası ve mezeler',
    '/images/kolcuoglu-florya-ocakbasi-keyfi.jpg': 'Kolcuoğlu Florya ocakbaşı keyfi',
    '/images/florya-en-iyi-kebapci.jpg': "Florya'nın en iyi kebapçısı Kolcuoğlu'nda kebap sofrası",
    '/images/istanbul-metrelik-kebap-kolcuoglu.jpg': "İstanbul'da metrelik kebap – Kolcuoğlu Florya",
    '/images/kolcuoglu-kebap-florya-istanbul.jpg': 'Kolcuoğlu kebap – Florya, İstanbul',
    '/images/kolcuoglu-florya-geleneksel-lezzetler.jpg': 'Kolcuoğlu Florya geleneksel Türk lezzetleri',
    '/images/kolcuoglu-florya-sicak-mezeler.jpg': 'Kolcuoğlu Florya sıcak mezeler',
    '/images/kolcuoglu-florya-kuzu-sis.jpg': 'Kolcuoğlu Florya kuzu şiş',
    '/images/kolcuoglu-florya-kunefe-tatlisi.jpg': 'Kolcuoğlu Florya künefe tatlısı',
    '/images/kolcuoglu-florya-katmer-tatlisi.jpg': 'Kolcuoğlu Florya katmer tatlısı',
    '/images/kolcuoglu-florya-ayran-salgam.jpg': 'Kolcuoğlu Florya ayran ve şalgam',
    '/images/kolcuoglu-florya-lahmacun-pide.jpg': 'Kolcuoğlu Florya lahmacun ve pide',
    '/images/kolcuoglu-florya-vip-salon.jpg': 'Kolcuoğlu Florya VIP salon',
    '/images/kolcuoglu-florya-ocakbasi-ustasi.jpg': 'Kolcuoğlu Florya ocakbaşı ustası kebap pişirirken',
    '/images/kolcuoglu-florya-lezzet-duragi.jpg': 'Kolcuoğlu Florya lezzet durağı',
    '/images/kolcuoglu-florya-ozel-davetler.jpg': 'Kolcuoğlu Florya özel davet ve organizasyonlar',
    '/images/kolcuoglu-florya-denize-sifir-kebap.jpg': 'Denize sıfır kebap keyfi – Kolcuoğlu Florya',
    '/images/kolcuoglu-florya-kuzu-pirzola.jpg': 'Kolcuoğlu Florya kuzu pirzola',
    '/images/kolcuoglu-florya-soguk-mezeler.jpg': 'Kolcuoğlu Florya soğuk mezeler',
    '/images/kolcuoglu-florya-sofra-duzeni.jpg': 'Kolcuoğlu Florya sofra düzeni',
    '/images/kolcuoglu-florya-tatli-ikrami.jpg': 'Kolcuoğlu Florya tatlı ikramı',
  },

  home: {
    hero: {
      badge: 'Kuruluş 1910 · Adana',
      titleLine1: '116 Yıllık Gelenek,',
      titleLine2: 'Herkes için.',
      intro:
        'Adana’nın asırlık ateşi, Florya sahilinde yanıyor. Denize sıfır masalarımızda, meşhur metrelik kebabımızla eşsiz bir ziyafete davetlisiniz.',
      exploreMenu: 'Menüyü Keşfet',
      directions: 'Yol Tarifi Al',
      book: 'Rezervasyon Yap',
      stats: [
        { value: '116', label: 'Yıllık Gelenek' },
        { value: '150+', label: 'Lezzet Çeşidi' },
        { value: '1910', label: 'Kuruluş Yılı' },
      ],
      scrollDown: 'Hakkımızda bölümüne in',
    },
    about: {
      label: 'Hikayemiz',
      titleLine1: 'Bir Aile, Bir Ateş,',
      titleLine2: '116 Yıllık Aşk',
      paragraph1:
        "1910'dan Bugüne: 7 Kuşaklık Lezzet Efsanesi Her şey 1910 yılında, Adana eski sebze halinde açılan küçük bir dükkânla başladı. Tam yedi kuşaktır, ateşin ve etin sırrını kuşaktan kuşağa aktararak aynı tutkuyla yaşatıyoruz. Hikayemizin en büyük dönüm noktası 1974 yılıydı. 5. kuşak temsilcimiz Hasan Kolcuoğlu’nun icat ettiği Metrelik Kebap, Türkiye’nin gastronomi tarihine altın harflerle kazındı. Bu benzersiz lezzet, 6. kuşak temsilcimiz Tarkan Kolcuoğlu’nun vizyonuyla markalaşarak Adana sınırlarını aştı ve metrelik kebap efsanesini tüm Türkiye ile buluşturdu.",
      paragraph2:
        'Bugün ise 7. kuşak olarak bu asırlık ateşi Florya Kolcuoğlu’nda harlıyoruz. Dedelerimizden ve babamızdan miras kalan ustalığı modern mutfağın dinamikleriyle harmanlıyor; o eşsiz, bereketli sofraları şimdi sizin için kuruyoruz. Tarihin, ustalığın ve lezzetin metrelerce uzandığı bu serüvene hoş geldiniz!',
      badges: {
        inventor: 'Metrelik Kebabın Mucidi',
        family: '7 Nesillik Aile Geleneği',
        location: 'Florya Sahili, Denize Sıfır',
        locationDetail: ['Yeşilköy 10 dk', 'Ataköy ve Bakırköy 15 dk'],
      },
      portraitCaption: 'Metrelik Kebabın Üstadı',
      founded: 'Kuruluş Yılı',
    },
    featured: {
      label: 'Öne Çıkanlar',
      title: 'İmza Lezzetimiz',
      imageAlt: 'Kolcuoğlu Özel Menü',
      menuName: 'Özel Menü',
      text: '6 Çeşit Meze, Özel Salatalar, Pastırmalı Humus, Fındık Lahmacun ve Metrelik Kebap eşliğinde eşsiz bir gastronomi şöleni.',
      viewAll: 'Tüm Menüyü Gör',
    },
    atmosphere: {
      label: 'Mekan & Atmosfer',
      titleStart: 'Her Köşede',
      titleAccent: 'Ayrı Bir Deneyim',
      cta: 'Galeriyi İncele',
    },
  },

  whyUs: {
    label: 'Neden Kolcuoğlu Florya?',
    titleStart: 'Florya Sahilinde',
    titleAccent: 'Denize Sıfır Restoran',
    intro:
      "Kebap ve ocakbaşı sofrası, deniz manzarası ve rahat bir akşam yemeği için Yeşilköy, Ataköy ve Bakırköy'e kısa mesafedeyiz.",
    items: {
      seaView: {
        title: 'Denize Sıfır, Her Masadan Manzara',
        text: 'Restoranımız denize sıfırdır; boydan boya panoramik cam ve masa düzenimiz sayesinde her masamızdan denize hakimsiniz.',
      },
      valet: {
        title: 'Ücretsiz Vale ve Otopark',
        text: 'Arabanızı bırakın, doğrudan masanıza geçin. Vale hizmetimiz ücretsiz, otoparkımız hizmetinizde.',
      },
      access: {
        title: 'Kolay Ulaşım',
        text: "Yeşilköy'den 10, Ataköy ve Bakırköy'den 15 dakika. Basınköy, Çekmece İstanbul Cd. No:39.",
        link: 'Yol tarifi',
      },
      inventor: {
        title: 'Metrelik Kebabın Mucidi',
        text: "1910'dan beri Adana mutfağı. Metrelik kebabı icat eden ailenin 7. kuşağı, aynı kor ateşte.",
      },
      meat: {
        title: "Adana'dan Gelen Et, Orijinal Zırh Kıyması",
        text: "Etimiz Adana'dan gelir; kebabımız orijinal zırh kıymasıdır. Adana mutfağının asıl lezzeti, kor ateşte pişer.",
      },
      corporate: {
        title: 'Şirket Yemekleri',
        text: 'Kurumsal yemekler için 500 kişiye kadar organizasyon. Fakir, MESİAD, Türk Telekom, İpekyol, Trendyol gibi büyük markalar şirket yemekleri için bizi tercih etmiştir.',
        link: 'Kurumsal teklif',
      },
    },
  },

  faq: {
    label: 'Sık Sorulanlar',
    titleStart: 'Merak',
    titleAccent: 'Edilenler',
    reservationForm: 'Rezervasyon formu',
    callForQuote: 'Teklif için arayın',
    corporateLink: 'Şirket yemekleri →',
    items: [
      {
        q: 'Burası gerçek Kolcuoğlu mu?',
        a: 'Evet, burası Kolcuoğlu markasının kendi restoranıdır ve franchise veya bir başka marka değildir.',
      },
      {
        q: 'Restoran alkollü mü?',
        a: 'Evet, restoranımız alkollüdür.',
      },
      {
        q: 'Kolcuoğlu Özel Menü nasıl işliyor?',
        a: "Menümüz minimum iki kişiliktir ve fiyatımız kişi başı 1.800 TL'dir.",
      },
      {
        q: 'Vale ücretli mi?',
        a: 'Hayır, vale hizmetimiz ücretsizdir. Ayrıca otoparkımız bulunmaktadır.',
      },
      {
        q: 'Deniz manzaralı masa istiyorum, mümkün mü?',
        a: 'Restoranımız denize sıfırdır ve boydan boya panoramik cam ve masa düzenimiz sayesinde her masamızdan denize hakimdir.',
      },
      {
        q: 'Rezervasyon nasıl yapılır?',
        a: '0533 131 54 01 numaralı telefondan arayarak, aynı numaradan WhatsApp ile yazarak ya da rezervasyon formunu doldurarak masa ayırtabilirsiniz.',
        extra: 'reservation',
      },
      {
        q: 'Aile buluşmaları ve özel günler için organizasyon yapıyor musunuz?',
        a: 'Evet. Aile buluşmaları ve özel günler için kişi sayısına ve tarihe göre menü ve teklif hazırlıyoruz.',
        extra: 'call',
      },
      {
        q: 'Şirket yemeği yapıyor musunuz?',
        a: 'Evet. Kurumsal yemekler için 500 kişiye kadar organizasyon yapıyoruz; kişi sayısı ve tarihe göre kurumsal menü ve teklif hazırlıyoruz. Fakir, MESİAD, Türk Telekom, İpekyol, Trendyol gibi büyük markalar şirket yemekleri için bizi tercih etmiştir.',
        extra: 'corporate',
      },
      {
        q: 'Restoran nerede, Yeşilköy ve Ataköy’den ne kadar sürer?',
        a: "Basınköy, Çekmece İstanbul Cd. No:39, Bakırköy/İstanbul adresindeyiz. Yeşilköy'den yaklaşık 10, Ataköy ve Bakırköy'den yaklaşık 15 dakikadır.",
      },
      {
        q: 'Çalışma saatleriniz nedir?',
        a: 'Her gün 11:00 – 00:00 arası hizmet veriyoruz.',
      },
      {
        q: 'Çocuk oyun alanı var mı?',
        a: 'Hayır, çocuk oyun alanımız bulunmamaktadır.',
      },
      {
        q: 'Engelli erişimi var mı?',
        a: 'Restoranımızda iki tane asansör bulunmaktadır. Engelli misafirlerimiz de restoranımızı rahatça deneyimleyebilirler.',
      },
    ] as { q: string; a: string; extra?: 'reservation' | 'call' | 'corporate' }[],
  },

  menu: {
    label: 'Geleneksel Ustaların Eliyle',
    title: 'Lezzet Menümüz',
    intro: '116 yılı aşkın tecrübe ve kömür ateşi ustalığıyla harmanlanan, özenle seçilmiş ürünlerimiz.',
    /** Boşsa gösterilmez */
    priceNote: '',
    emptyCategory: 'Bu kategoriye ait ürün bulunmamaktadır.',
    jsonLdName: 'Kolcuoğlu Florya Menü',
    // Akordiyon başlıkları (kategori slug'ına göre)
    accordions: {
      mezeler: 'MEZELER',
      salatalar: 'SALATALAR',
      'ara-sicaklar': 'ARA SICAKLAR',
      'kebaplar-izgaralar': 'KEBAPLAR VE IZGARALAR',
      'lahmacun-pide': 'LAHMACUN VE PİDE',
      tatlilar: 'TATLILAR',
      mesrubatlar: 'MEŞRUBATLAR',
      'sicak-icecekler': 'SICAK İÇECEKLER',
      'soguk-kahveler': 'SOĞUK KAHVELER',
      'alkollu-icecekler': 'ALKOLLÜ İÇECEKLER',
      saraplar: 'ŞARAPLAR',
      kokteyller: 'KOKTEYLLER',
    },
    special: {
      imageAlt: 'Kolcuoğlu Özel Menü',
      name: 'Özel Menü',
      sections: [
        { title: 'Mezeler', items: '6 Çeşit Meze' },
        { title: 'Salatalar', items: 'Mevsim Salata · Adana Ezme · Çiğ Köfte' },
        { title: 'Ara Sıcaklar', items: 'Pastırmalı Humus · Mantarlı Tavuk Sote · Fındık Lahmacun · Patlıcan Söğürme' },
        { title: 'Ana Yemek', items: 'Metrelik Kebap', note: '(Adana, Sarma Beyti, Kanat, Tavuk Şiş, Kaburga)' },
        { title: 'Meyve ve Tatlılar', items: 'Serpme Meyve (6 çeşit) · Tatlı (3 çeşit)' },
        { title: 'Meşrubatlar', items: 'Şalgam · Ayran · Fanta · Kola · Meyve Suyu', note: '+ Çay & Türk Kahvesi İkramı' },
      ] as { title: string; items: string; note?: string }[],
      pricePerPerson: 'Kişi Başı Fiyat',
      price: '₺1.800',
      rules: ['Kişi sayısı kadar sipariş verilebilir', 'En az 2 kişilik sipariş alınır'],
    },
  },

  gallery: {
    label: 'Görsel Şölen',
    title: 'Galeri',
    intro:
      "Kolcuoğlu Florya'nın eşsiz ambiyansını ve enfes lezzetlerini keşfedin. (Müşteri fotoğrafları buraya eklenecektir)",
    loadMore: 'Daha fazla görsel yükle',
    close: 'Kapat (ESC) ✕',
    fallbackAlt: 'Kolcuoğlu Florya galeri görseli',
  },

  contact: {
    label: 'Bize Ulaşın',
    title: 'İletişim',
    intro: 'Rezervasyon, etkinlik organizasyonu veya herhangi bir konuda bize ulaşabilirsiniz.',
    mapTitle: 'Kolcuoğlu Florya Konumu',
    /** Google Haritalar gömülü haritasının dili */
    mapLanguage: 'tr',
    details: 'İletişim Bilgileri',
    address: 'Adres',
    phone: 'Telefon & WhatsApp',
    email: 'E-posta',
    hoursTitle: 'Çalışma Saatleri',
    everyDay: 'Her Gün',
    ctaTitle: 'Sizi Soframızda Görmek İsteriz',
    ctaText: 'Telefon ile rezervasyon yaptırmak için hemen arayabilirsiniz.',
    ctaButton: 'Telefon ile Rezervasyon →',
  },

  corporate: {
    label: 'Kurumsal Lezzet & Organizasyon',
    title: 'Şirket Yemekleri',
    intro:
      "İş toplantıları, kutlamalar veya özel şirket organizasyonlarınız için Kolcuoğlu Florya'nın eşsiz menüleri ve şık salonları emrinizde.",
    heading: 'Profesyonel ve Şık Toplantılar',
    body:
      'Kolcuoğlu Florya olarak, şirket yemekleriniz ve kurumsal organizasyonlarınızda tüm detayları sizin yerinize biz üstleniyoruz. Masaların özenli tasarımından, nesillerdir aktarılan lezzetlerin zamanlamasına ve misafirlerinizin kusursuz şekilde karşılanmasına kadar her şeyi profesyonel ekibimize bırakın. Siz sadece işinize ve ekibinizle geçireceğiniz keyifli anlara odaklanın; geriye kalan her detayı biz sizin için düşünüp mükemmel şekilde organize edelim.',
    benefits: [
      'Özel Masa Düzeni ve Süsleme Seçenekleri',
      'Tercihinize Göre Alkollü veya Alkolsüz Menü Teklifleri',
      'Vale ve Servis Ücreti Yok',
      'Şirket/Grup Yemeklerinde Yılların Deneyimi',
    ],
    ctaLabel: 'Talepleriniz İçin Bize Ulaşın',
    bookOnline: 'Online Rezervasyon',
    whatsapp: 'WhatsApp Destek',
  },

  privacy: {
    label: 'KVKK Aydınlatma Metni',
    title: 'Gizlilik ve Kişisel Veriler',
    updated: 'Son güncelleme: 7 Ekim 2026',
  },

  reservation: {
    label: 'Kolcuoğlu Restoranı',
    title: 'Şirket Yemekleri & Grup Rezervasyon Talebi',
    intro: 'Şirket yemeği veya grup organizasyonunuz için bilgilerinizi 2 adımda iletin.',
    step1Title: 'Tarih & Saat',
    step2Title: 'Misafir Bilgileri',
    selectDate: 'Tarih Seçiniz',
    selectTime: 'Saat Seçiniz',
    guests: 'Kişi Sayısı',
    guestsUnit: 'kişi',
    guestsUnitOne: 'kişi',
    continue: 'Devam Et',
    firstName: 'Ad',
    lastName: 'Soyad',
    email: 'E-posta',
    phone: 'Telefon',
    notes: 'Özel İstek (İsteğe Bağlı)',
    placeholders: {
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      email: 'ahmet@email.com',
      phone: '+90 555 000 00 00',
      notes: 'Doğum günü sürprizi, özel düzenek vb.',
    },
    back: 'Geri',
    submit: 'Fiyat Bilgisi Al',
    errors: {
      date: 'Lütfen tarih seçiniz',
      time: 'Lütfen saat seçiniz',
      firstName: 'Ad en az 2 karakter olmalıdır',
      lastName: 'Soyad en az 2 karakter olmalıdır',
      email: 'Geçerli bir e-posta giriniz',
      phone: 'Geçerli bir telefon giriniz',
    },
    success: {
      title: 'Bilgileriniz Alındı!',
      text: 'Talebiniz başarıyla kaydedilmiştir. En kısa sürede sizinle iletişime geçilecektir.',
      contact: 'İletişim veya değişiklik için:',
      quote: 'Sizinle iletişime geçmek için sabırsızlanıyoruz.',
    },
  },
}

export default tr
export type Dictionary = typeof tr
