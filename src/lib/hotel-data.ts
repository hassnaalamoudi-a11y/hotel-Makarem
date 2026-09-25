/* ═══════════════════════════════════════════════════════════════
   MAKAREM AJYAD MAKKAH HOTEL — CENTRAL DATA FILE
   Official Data from: https://makaremhotels.com/en/hotels/makarem-ajyad-makkah
   ═══════════════════════════════════════════════════════════════ */

export type Locale = "ar" | "en";

export type L = { ar: string; en: string };

/* ── Hotel identity & contact ─────────────────────────────────── */

export const hotel = {
  name: { ar: "فندق مكارم أجياد مكة", en: "Makarem Ajyad Makkah Hotel" } as L,
  brand: { ar: "مكارم أجياد", en: "Makarem Ajyad" } as L,
  group: { ar: "فنادق مكارم · طيبة للاستثمار", en: "Makarem Hotels · Taiba Investment" } as L,
  stars: 5,
  /** Hero headline */
  heroTitle: {
    ar: "خطوات يسيرة من الحرم المكي الشريف",
    en: "Mere Steps from the Revered Haram",
  } as L,
  heroSubtitle: {
    ar: "إقامة روحانية فاخرة في قلب جادة أجياد، على بُعد ٣٠٠ متر فقط من برج الساعة وبوابة الملك عبدالعزيز — حيث تلتقي الضيافة السعودية الأصيلة بالراحة العصرية.",
    en: "A spiritual luxury stay in the heart of Ajyad Street, just 300 meters from the Clock Tower and King Abdulaziz Gate — where authentic Saudi hospitality meets modern comfort.",
  } as L,
  tagline: {
    ar: "ضيافة سعودية أصيلة في أقدس بقاع الأرض",
    en: "Authentic Saudi Hospitality at the Heart of Makkah",
  } as L,
  intro: {
    ar: "يتمتع فندق مكارم أجياد مكة بموقع استراتيجي فريد في شارع حمزة بن عبدالمطلب بحي أجياد، على بُعد ٣٠٠ متر فقط من برج الساعة وبوابة الملك عبدالعزيز. يتيح الفندق وصولاً سهلاً ومباشراً إلى صحن الحرم المكي الشريف، محطة قطار الحرمين السريع، والطرق الرئيسية. يضم الفندق ٤١١ غرفة وجناحاً فاخراً، ومكتب إرشاد ديني متخصص، ومكتبة إسلامية، ومطاعم تقدم أشهى المأكولات الحجازية والعالمية.",
    en: "Makarem Ajyad Makkah Hotel boasts an enviable location on Ajyad Street, conveniently close to King Abdul Aziz Gate and just 300 meters from the iconic Clock Tower. This prime position ensures effortless access to the Holy Mosque, major highways, and Haramain High-Speed Railway. Featuring 411 luxury rooms and suites, a dedicated spiritual concierge desk, an Islamic library, and premier dining.",
  } as L,
  address: {
    ar: "شارع حمزة بن عبد المطلب، حي أجياد، مكة المكرمة، المملكة العربية السعودية",
    en: "Hamza Bin Abdulmuttaleb Street, Ajyad District, Makkah, Saudi Arabia",
  } as L,
  phone: "+966 12 5720500",
  phoneHref: "+966125720500",
  whatsapp: "+966125720500",
  email: "reservation.ajyad@makarem.sa",
  bookingUrl:
    "https://stay.makaremhotels.com/?chain=32704&child=0&currency=SAR&hotel=46881&level=hotel&locale=ar&productcurrency=SAR&rooms=1&theme=Makarem",
  officialUrl: "https://makaremhotels.com/en/hotels/makarem-ajyad-makkah",
  virtualMapUrl: "https://makaremhotels.com/en/hotels/makarem-ajyad-makkah/virtual-map",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Makarem+Ajyad+Makkah+Hotel",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Makarem+Ajyad+Makkah+Hotel",
  hours: {
    ar: "الاستقبال والخدمة ومكتب الإرشاد الديني على مدار الساعة، ٧ أيام في الأسبوع",
    en: "Reception, service & spiritual concierge around the clock, 7 days a week",
  } as L,
  socials: [
    { icon: "facebook", href: "https://www.facebook.com/MakaremHotels/", label: "Facebook" },
    { icon: "instagram", href: "https://www.instagram.com/makaremhotels/", label: "Instagram" },
    { icon: "twitter", href: "https://x.com/makaremHotels", label: "X (Twitter)" },
    { icon: "youtube", href: "https://www.youtube.com/c/makaremhotels", label: "YouTube" },
  ] as { icon: string; href: string; label: string }[],
};

/* ── Hero slider (home) ────────────────────────────────────────── */

export const heroSlides: { src: string; alt: L }[] = [
  {
    src: "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2Fbb055cf86d30485a9670d214cf17c073-xmc-hero-desktop%3Fv%3D3575d7f7&w=1920&q=75",
    alt: { ar: "واجهة فندق مكارم أجياد مكة", en: "Makarem Ajyad Makkah Hotel Facade" },
  },
  {
    src: "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2F0b9d5595c9314954aaba0c4f2908e7dcxmc-gallery-desktop%3Fv%3D9197bbd2&w=1920&q=75",
    alt: { ar: "بهو الفندق الفاخر", en: "Makarem Ajyad Grand Lobby" },
  },
  {
    src: "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2F8ca9ffd61581420c80a829a6f4254461%3Fv%3D9ea28d2b&w=1920&q=75",
    alt: { ar: "الأجنحة الملكية والإطلالة", en: "Royal Suites & Ambience" },
  },
];

/* ── Gallery images from official hotel ───────────────────────── */

export const galleryImages = [
  {
    src: "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2F0b9d5595c9314954aaba0c4f2908e7dcxmc-gallery-desktop%3Fv%3D9197bbd2&w=1920&q=75",
    title: { ar: "بهو الفندق والاستقبال", en: "Hotel Lobby & Reception" },
  },
  {
    src: "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2F8ca9ffd61581420c80a829a6f4254461%3Fv%3D9ea28d2b&w=1920&q=75",
    title: { ar: "الأجنحة الفاخرة", en: "Luxury Suites" },
  },
  {
    src: "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2Fc9f0272d9ca74781ad42686711f09733-xmc-gallery-desktop%3Fv%3D44fdad57&w=1920&q=75",
    title: { ar: "الغرف الديلوكس الملكية", en: "Deluxe Executive Rooms" },
  },
  {
    src: "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2F6d6ff1f4119248968044049a6997eab4%3Fv%3D331fa026&w=1920&q=75",
    title: { ar: "مطعم أجياد وبوفيه الإفطار", en: "Ajyad Restaurant Buffet" },
  },
  {
    src: "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2Fed7ab28675f14796a53f61275e53ebe7%3Fv%3Ddddc7352&w=1920&q=75",
    title: { ar: "صالة القهوة والضيافة الحجازية", en: "Hijazi Coffee Lounge" },
  },
];

/* ── About features ───────────────────────────────────────────── */

export const features: { icon: string; title: L; text: L }[] = [
  {
    icon: "concierge-bell",
    title: { ar: "مكتب الإرشاد الديني", en: "Spiritual Concierge" },
    text: { ar: "مرشد ديني متخصص لمرافقة وتوجيه المعتمرين والحجاج.", en: "Dedicated spiritual concierge to guide your religious journey." },
  },
  {
    icon: "book-open",
    title: { ar: "المكتبة الإسلامية", en: "Islamic Library" },
    text: { ar: "مساحة هادئة غنية بالكتب والتفاسير للسكينة والتأمل.", en: "A serene library filled with Islamic literature for quiet reflection." },
  },
  {
    icon: "footprints",
    title: { ar: "خطوات يسيرة للحرم", en: "Steps to Al-Haram" },
    text: { ar: "٣٠٠ متر فقط من بوابة الملك عبدالعزيز وبرج الساعة.", en: "Just 300 meters from King Abdulaziz Gate and the Clock Tower." },
  },
  {
    icon: "users",
    title: { ar: "أجنحة عائلية رحبة", en: "Spacious Family Suites" },
    text: { ar: "خيارات استيعابية متعددة تلائم العائلات وحملات العمرة.", en: "Multiple layouts tailored for families and Umrah groups." },
  },
];

/* ── Direct Booking Perks ─────────────────────────────────────── */

export const directPerks: { icon: string; title: L; desc: L }[] = [
  {
    icon: "shield-check",
    title: { ar: "أفضل سعر مضمون", en: "Best Rate Guarantee" },
    desc: {
      ar: "خصم فوري ١٠٪ عند الحجز المباشر عبر الموقع الرسمي وبدون أي رسوم خفية.",
      en: "Instant 10% discount when booking directly with zero hidden fees.",
    },
  },
  {
    icon: "calendar-check",
    title: { ar: "مرونة كاملة في الإلغاء", en: "Flexible Cancellation" },
    desc: {
      ar: "إلغاء وتعديل مجاني حتى ٤٨ ساعة قبل موعد الوصول المحدد.",
      en: "Free cancellation and modification up to 48 hours prior to arrival.",
    },
  },
  {
    icon: "sparkles",
    title: { ar: "أولوية الترقية والإطلالة", en: "Priority Upgrade & View" },
    desc: {
      ar: "أولوية اختيار الطوابق المرتفعة والإطلالات الروحانية على الحرم وبرج الساعة.",
      en: "Priority allocation for high floors and spiritual Haram views.",
    },
  },
  {
    icon: "coffee",
    title: { ar: "ضيافة سعودية ترحيبية", en: "Welcome Saudi Treats" },
    desc: {
      ar: "قهوة سعودية أصيلة، تمور فاخرة، ومياه زمزم المباركة عند الوصول.",
      en: "Complimentary authentic Saudi coffee, premium dates & Zamzam water upon arrival.",
    },
  },
];

/* ── Landmarks & Walking Times ────────────────────────────────── */

export const landmarks: {
  name: L;
  distance: L;
  time: L;
  desc: L;
}[] = [
  {
    name: { ar: "بوابة الملك عبدالعزيز (المسجد الحرام)", en: "King Abdulaziz Gate (Holy Mosque)" },
    distance: { ar: "٣٠٠ متر", en: "300 meters" },
    time: { ar: "٤ دقائق سيراً", en: "4 mins walk" },
    desc: { ar: "أقرب بوابة رئيسية ومباشرة لصحن الطواف والمطاف.", en: "Direct major entrance to the Holy Kaaba and Mataf piazza." },
  },
  {
    name: { ar: "مجمع أبراج البيت (برج الساعة)", en: "Clock Tower Complex (Abraj Al-Bait)" },
    distance: { ar: "٢٥٠ متر", en: "250 meters" },
    time: { ar: "٣ دقائق سيراً", en: "3 mins walk" },
    desc: { ar: "مراكز تسوق، مطاعم عالمية، صرافات وخدمات تجارية متكاملة.", en: "Shopping malls, global food courts, and financial services." },
  },
  {
    name: { ar: "الساحة الجنوبية للحرم المكي", en: "Holy Mosque South Piazza" },
    distance: { ar: "٢٨٠ متر", en: "280 meters" },
    time: { ar: "٣.٥ دقائق سيراً", en: "3.5 mins walk" },
    desc: { ar: "ساحات صلاة مكيفة ومجهزة بمكبرات الصوت المباشرة من الحرم.", en: "Expansive shaded prayer grounds with live Haram audio." },
  },
  {
    name: { ar: "محطة قطار الحرمين السريع (مكة)", en: "Haramain High-Speed Railway" },
    distance: { ar: "٨.٥ كم", en: "8.5 km" },
    time: { ar: "١٠ دقائق بالسيارة", en: "10 mins by car" },
    desc: { ar: "ربط فائق السرعة بمطار الملك عبدالعزيز الدولي والمدينة المنورة.", en: "High-speed rail link to Jeddah Airport & Madinah." },
  },
];

/* ── Location highlights ──────────────────────────────────────── */

export const locationPoints: { icon: string; text: L }[] = [
  { icon: "footprints", text: { ar: "٤ دقائق سيراً إلى المسجد الحرام", en: "4 minutes' walk to the Holy Mosque" } },
  { icon: "clock-3", text: { ar: "٣٠٠ متر من برج الساعة الشهير", en: "300 meters from the iconic Clock Tower" } },
  { icon: "landmark", text: { ar: "ملاصق لبوابة الملك عبدالعزيز", en: "Adjacent to King Abdul Aziz Gate" } },
  { icon: "train-front", text: { ar: "وصول سريع لمحطة قطار الحرمين", en: "Fast link to Haramain High-Speed Railway" } },
  { icon: "car-front", text: { ar: "مواقف سيارات خاصة وخدمة صف السيارات", en: "Private on-site parking & valet services" } },
];

/* ── Hotel Amenities ──────────────────────────────────────────── */

export const amenities: { icon: string; title: L; desc?: L }[] = [
  {
    icon: "concierge-bell",
    title: { ar: "مكتب استقبال ٢٤/٧", en: "24/7 Reception Desk" },
    desc: { ar: "خدمة تسجيل سريعة وضيافة ترحيبية على مدار الساعة", en: "Express check-in and 24/7 warm guest hospitality" },
  },
  {
    icon: "wifi",
    title: { ar: "واي فاي فائق السرعة مجاني", en: "High-Speed Free Wi-Fi" },
    desc: { ar: "تغطية إنترنت سريعة وقوية في جميع الغرف والمرافق", en: "High-speed coverage across all rooms & public areas" },
  },
  {
    icon: "utensils",
    title: { ar: "مطعم أجياد الفاخر", en: "Ajyad Fine Restaurant" },
    desc: { ar: "بوفيهات يومية غنية بأطباق شرقية، حجازية وعالمية", en: "Lavish daily buffets with Oriental, Hijazi & global cuisines" },
  },
  {
    icon: "coffee",
    title: { ar: "مقهى غراب آند غو (Grab & Go)", en: "Grab & Go 24/7 Café" },
    desc: { ar: "وجبات خفيفة ومشروبات ساخنة على مدار الساعة", en: "Round-the-clock hot beverages and light bites" },
  },
  {
    icon: "book-open",
    title: { ar: "المكتبة الإسلامية", en: "Islamic Library" },
    desc: { ar: "مجموعة منتقاة من أمهات الكتب والتفاسير للسكينة", en: "Curated Islamic literature and spiritual readings" },
  },
  {
    icon: "moon-star",
    title: { ar: "مكتب الإرشاد الديني", en: "Spiritual Concierge" },
    desc: { ar: "مرشد ديني للإجابة على استفسارات المناسك والعبادة", en: "Religious guidance desk for Umrah and worship queries" },
  },
  {
    icon: "shirt",
    title: { ar: "خدمة الغسيل والتنظيف الجاف", en: "Laundry & Dry Cleaning" },
    desc: { ar: "غسيل وكي سريع للملابس وإحرامات الحجاج والمعتمرين", en: "Rapid laundry service including Ihram garments" },
  },
  {
    icon: "door-open",
    title: { ar: "قاعات المناسبات والاجتماعات", en: "Banquet & Meeting Rooms" },
    desc: { ar: "قاعات مجهزة بالكامل للمؤتمرات والمناسبات الخاصة", en: "Fully-equipped halls for conferences & special events" },
  },
  {
    icon: "bell-ring",
    title: { ar: "خدمة الغرف على مدار الساعة", en: "24/7 Room Service" },
    desc: { ar: "قائمة طعام متكاملة تصل إلى باب غرفتكم في أي وقت", en: "Complete in-room dining menu served around the clock" },
  },
  {
    icon: "car-front",
    title: { ar: "مواقف وخدمة صف السيارات", en: "Valet & Private Parking" },
    desc: { ar: "مواقف آمنة مخصصة لضيوف الفندق مع خدمة الفاليه", en: "Secure on-site parking for guests with valet support" },
  },
];

/* ── Tour Video ───────────────────────────────────────────────── */

export const tour = {
  poster:
    "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2F0b9d5595c9314954aaba0c4f2908e7dcxmc-gallery-desktop%3Fv%3D9197bbd2&w=1920&q=75",
  video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  caption: {
    ar: "جولة مرئية داخل فندق مكارم أجياد مكة — الضيافة والسكينة بالقرب من الحرم المكي الشريف.",
    en: "A visual tour inside Makarem Ajyad Makkah Hotel — hospitality and serenity steps from the Holy Mosque.",
  } as L,
};

/* ── Stats ────────────────────────────────────────────────────── */

export const stats: { value: number; suffix?: L; decimals?: number; label: L }[] = [
  { value: 411, label: { ar: "غرفة وجناحاً فاخراً", en: "Luxury Rooms & Suites" } },
  { value: 300, suffix: { ar: " م", en: " m" }, label: { ar: "البُعد عن الحرم المكي", en: "Distance to Holy Haram" } },
  {
    value: 250,
    suffix: { ar: " ألف+", en: "K+" },
    label: { ar: "ضيف ومعتمر سعيد", en: "Happy Pilgrims & Guests" },
  },
  { value: 4.9, decimals: 1, label: { ar: "تقييم رضا الضيوف", en: "Guest Satisfaction" } },
];

/* ── Rooms & Suites ───────────────────────────────────────────── */

export type RoomType = "single" | "double" | "suite" | "family";

export const roomTypes: Record<RoomType, L> = {
  single: { ar: "مفردة", en: "Single" },
  double: { ar: "مزدوجة", en: "Double" },
  suite: { ar: "أجنحة ملكية", en: "Luxury Suites" },
  family: { ar: "عائلية", en: "Family" },
};

export type Room = {
  slug: string;
  type: RoomType;
  featured?: boolean;
  name: L;
  short: L;
  description: L;
  size: string;
  capacity: L;
  beds: L;
  view: L;
  priceFrom: number;
  oldPrice?: number;
  features: { ar: string[]; en: string[] };
  images: string[];
  badge?: L;
};

export const rooms: Room[] = [
  {
    slug: "junior-suite",
    type: "suite",
    featured: true,
    name: { ar: "جونيور سويت (Junior Suite)", en: "Junior Suite" },
    short: {
      ar: "جناح أنيق بصالة جلوس مستقلة وإطلالة ساحرة على الحرم وبرج الساعة.",
      en: "An elegant suite with a separate living lounge and Haram & Clock Tower views.",
    },
    description: {
      ar: "يمثل الجونيور سويت في مكارم أجياد التوازن المثالي بين الفخامة والرحابة؛ يضم غرفة نوم بسرير كينغ فاخر، صالة جلوس مستقلة بأثاث راقٍ، إطلالة ملهمة على مكة المكرمة، مع باقة متكاملة من مستلزمات العناية الشخصية الراقية.",
      en: "The Junior Suite at Makarem Ajyad offers the perfect blend of luxury and spaciousness, featuring a plush king-size bed, a separate elegant living lounge, inspirational views of Makkah, and premium amenities.",
    },
    size: "45 m²",
    capacity: { ar: "٣ ضيوف", en: "3 Guests" },
    beds: { ar: "سرير كينغ + أريكة فاخرة", en: "1 King Bed + Luxury Sofa" },
    view: { ar: "إطلالة على الحرم وبرج الساعة", en: "Haram & Clock Tower View" },
    priceFrom: 750,
    oldPrice: 890,
    features: {
      ar: [
        "إطلالة على الحرم المكي الشريف",
        "صالة معيشة وجلوس منفصلة",
        "مياه زمزم ترحيبية مجانية",
        "شاشة ذكية ٥٥ بوصة بقنوات الحرم المباشرة",
        "آلة قهوة إسبريسو وأدوات شاي فاخرة",
        "حمام رخامي واسع مع حوض استحمام",
        "خدمة الغرف على مدار ٢٤ ساعة",
        "واي فاي فائق السرعة",
      ],
      en: [
        "View of the Holy Mosque & Clock Tower",
        "Separate living & seating lounge",
        "Complimentary Zamzam water",
        "55\" Smart TV with live Haram broadcast",
        "Espresso coffee machine & tea set",
        "Spacious marble bathroom with bathtub",
        "24/7 In-room dining service",
        "High-speed complimentary Wi-Fi",
      ],
    },
    images: [
      "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2F8ca9ffd61581420c80a829a6f4254461%3Fv%3D9ea28d2b&w=1920&q=75",
      "/images/junior-suite.jpg",
      "/images/lobby-warm.jpg",
    ],
    badge: { ar: "الأكثر طلباً", en: "Most Popular" },
  },
  {
    slug: "family-suite",
    type: "family",
    featured: true,
    name: { ar: "جناح عائلي (Family Suite)", en: "Family Suite" },
    short: {
      ar: "جناح متكامل بغرفتي نوم وصالة معيشة رحبة — راحة وخصوصية تامة للعائلة.",
      en: "A comprehensive suite with 2 bedrooms and a large living room for total family comfort.",
    },
    description: {
      ar: "صُمم الجناح العائلي في مكارم أجياد لتلبية احتياجات الأسر الكريمة خلال رحلات العمرة والحج؛ يحتوي على غرفتي نوم منفصلتين، صالة جلوس عائلية فسيحة، حمامين مجهزين، ومرافق ترفيهية تضمن أقصى درجات الراحة لجميع أفراد الأسرة.",
      en: "Crafted specifically for families performing Umrah and Hajj, the Family Suite provides two private bedrooms, a generous shared living room, two well-appointed bathrooms, and thoughtful amenities.",
    },
    size: "60 m²",
    capacity: { ar: "٥ - ٦ ضيوف", en: "5 - 6 Guests" },
    beds: { ar: "سرير كينغ + ٣ أسرّة مفردة", en: "1 King Bed + 3 Single Beds" },
    view: { ar: "إطلالة على جادة أجياد", en: "Ajyad Boulevard View" },
    priceFrom: 980,
    oldPrice: 1190,
    features: {
      ar: [
        "غرفتا نوم مستقلتان تماماً",
        "صالة جلوس عائلية واسعة",
        "حمامان رخاميان متكاملان",
        "شاشتان ذكيتان ٥٠ بوصة",
        "ميني بار وأدوات إعداد القهوة",
        "مياه زمزم ترحيبية للعائلة",
        "أسرّة أطفال عند الطلب",
        "خدمة تنظيف وغسيل الملابس",
      ],
      en: [
        "Two fully separate bedrooms",
        "Spacious family living lounge",
        "Two full marble bathrooms",
        "Two 50\" Smart TVs",
        "Minibar and tea/coffee facilities",
        "Welcome Zamzam water for the family",
        "Baby cribs available upon request",
        "Daily housekeeping & laundry service",
      ],
    },
    images: [
      "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2Fc9f0272d9ca74781ad42686711f09733-xmc-gallery-desktop%3Fv%3D44fdad57&w=1920&q=75",
      "/images/family-suite.jpg",
      "/images/bedroom-cozy.jpg",
    ],
    badge: { ar: "مثالي للعائلات", en: "Family Choice" },
  },
  {
    slug: "executive-suite",
    type: "suite",
    featured: true,
    name: { ar: "الجناح التنفيذي الملكي (Executive Suite)", en: "Executive Royal Suite" },
    short: {
      ar: "قمة الفخامة والخصوصية بمساحات رحبة، غرفة طعام خاصة، وإطلالات بانورامية.",
      en: "Peak luxury with vast living space, private dining area, and panoramic Haram vistas.",
    },
    description: {
      ar: "الجناح التنفيذي الملكي هو درة الإقامة في فندق مكارم أجياد؛ يضم صالون استقبال فخم، ركن طعام خاص، غرفة نوم رئيسية فاخرة، حمام رخامي مزود بجاكوزي، مع خدمات كونسيرج شخصية وأولوية تسجيل الوصول وضيافة استثنائية.",
      en: "The Executive Royal Suite is the crown jewel of Makarem Ajyad, offering a lavish reception lounge, private dining corner, master king bedroom, marble bathroom with jacuzzi, and personalized VIP concierge.",
    },
    size: "75 m²",
    capacity: { ar: "٤ ضيوف", en: "4 Guests" },
    beds: { ar: "سرير كينغ فاخر + أريكة سرير", en: "Luxury King Bed + Sofa Bed" },
    view: { ar: "إطلالة بانورامية على الحرم المكي", en: "Panoramic Holy Mosque View" },
    priceFrom: 1450,
    oldPrice: 1750,
    features: {
      ar: [
        "إطلالة بانورامية مباشرة على الحرم المكي الشريف",
        "صالون استقبال ملكي فاخر وركن طعام",
        "خدمة الإرشاد الديني والكونسيرج الشخصي VIP",
        "تسجيل وصول ومغادرة مبكر / متأخر ذو أولوية",
        "ضيافة ترحيبية خاصة بالتمور الفاخرة والقهوة السعودية",
        "آلة قهوة إسبريسو بريميوم",
        "حمام رخامي ملكي مزود بجاكوزي",
        "مياه زمزم نقية يومياً",
      ],
      en: [
        "Direct panoramic view of the Holy Mosque",
        "Royal reception salon and dining area",
        "Dedicated VIP spiritual concierge",
        "Priority early check-in & late checkout",
        "Special VIP welcome with Saudi coffee & premium dates",
        "Premium espresso coffee machine",
        "Royal marble bathroom with jacuzzi",
        "Fresh Zamzam water provided daily",
      ],
    },
    images: [
      "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2F6f50a810d6a3439aa7d794fd78533d64%3Fv%3D3a8faa18&w=1920&q=75",
      "/images/executive-suite.jpg",
      "/images/haram-view.jpg",
    ],
    badge: { ar: "فخامة استثنائية", en: "VIP Luxury" },
  },
  {
    slug: "deluxe-twin",
    type: "double",
    featured: true,
    name: { ar: "غرفة ديلوكس توين (Deluxe Twin)", en: "Deluxe Twin Room" },
    short: {
      ar: "سريران مفردان مريحان بتصميم حجازي عصري وإضاءة هادئة تبعث على السكينة.",
      en: "Two plush twin beds with modern Hijazi decor and serene ambient lighting.",
    },
    description: {
      ar: "غرفة ديلوكس توين مصممة خصيصاً لتمنح المعتمرين والضيوف راحة تامة بعد أداء المناسك؛ تحتوي على سريرين مفردين بمراتب فندقية عالية الجودة، مكتب عمل، حمام رخامي أنيق، ونوافذ واسعة تطل على أجياد.",
      en: "Crafted to grant pilgrims and guests deep relaxation after their devotions — two twin beds with premium orthopedic mattresses, work desk, elegant marble bath, and panoramic windows.",
    },
    size: "28 m²",
    capacity: { ar: "شخصان", en: "2 Guests" },
    beds: { ar: "سريران مفردان مريحان", en: "2 Comfortable Twin Beds" },
    view: { ar: "إطلالة على المدينة وأجياد", en: "City & Ajyad View" },
    priceFrom: 420,
    oldPrice: 520,
    features: {
      ar: [
        "واي فاي فائق السرعة مجاني",
        "تكييف هواء مركزي بتحكم فردي",
        "شاشة ذكية ٥٠ بوصة",
        "خزنة إلكترونية لحفظ المقتنيات",
        "أدوات إعداد القهوة والشاي ومياه زمزم",
        "حمام رخامي مجهز بمجفف شعر ومستلزمات فاخرة",
        "خدمة الغرف على مدار ٢٤ ساعة",
        "ستائر معتمة مانعة للضوء للنوم المريح",
      ],
      en: [
        "High-speed free Wi-Fi",
        "Individually controlled central AC",
        "50\" Smart TV",
        "Electronic in-room safe",
        "Coffee/tea set & Zamzam water",
        "Marble bathroom with luxury toiletries",
        "24/7 Room service",
        "Blackout curtains for restful sleep",
      ],
    },
    images: [
      "/images/deluxe-twin.jpg",
      "/images/twin-beds.jpg",
      "/images/bathroom.jpg",
    ],
  },
  {
    slug: "deluxe-queen",
    type: "double",
    name: { ar: "غرفة ديلوكس كينغ / كوين (Deluxe King/Queen)", en: "Deluxe King / Queen Room" },
    short: {
      ar: "سرير كينغ وثير وأجواء دافئة مفعمة بالراحة بالقرب من الحرم المكي.",
      en: "Plush King bed with a serene, comforting atmosphere steps from the Haram.",
    },
    description: {
      ar: "غرفة ديلوكس كينغ توفر للضيوف والزوجين تجربة إقامة راقية وهادئة؛ بياضات قطنية فاخرة، تصميم حجازي أصيل، إضاءة محيطية مريحة، وحمام رخامي عصري.",
      en: "Provides couples and guests with a tranquil, upscale stay — crisp Egyptian cotton linens, authentic Hijazi accents, calming ambient lighting, and a modern marble bathroom.",
    },
    size: "28 m²",
    capacity: { ar: "شخصان", en: "2 Guests" },
    beds: { ar: "سرير كينغ وثير", en: "1 Plush King Bed" },
    view: { ar: "إطلالة على المدينة", en: "City View" },
    priceFrom: 450,
    oldPrice: 550,
    features: {
      ar: [
        "سرير كينغ وثير بمفارش فاخرة",
        "واي فاي فائق السرعة",
        "تكييف هواء مركزي",
        "شاشة ذكية ٥٠ بوصة",
        "خزنة إلكترونية",
        "ميني بار وأدوات شاي وقهوة",
        "حمام رخامي راقٍ",
        "خدمة غرف ٢٤/٧",
      ],
      en: [
        "Plush king bed with premium linens",
        "High-speed Wi-Fi",
        "Central air conditioning",
        "50\" Smart TV",
        "In-room electronic safe",
        "Minibar and coffee/tea maker",
        "Refined marble bathroom",
        "24/7 Room service",
      ],
    },
    images: [
      "/images/deluxe-queen.jpg",
      "/images/bedroom-cozy.jpg",
      "/images/bathroom.jpg",
    ],
  },
  {
    slug: "deluxe-triple",
    type: "family",
    name: { ar: "غرفة ديلوكس ثلاثية (Deluxe Triple)", en: "Deluxe Triple Room" },
    short: {
      ar: "ثلاثة أسرّة مفردة ومساحة مريحة — الخيار المثالي للعائلات والمجموعات الصغيرة.",
      en: "Three single beds with ample room — ideal for small pilgrim families.",
    },
    description: {
      ar: "غرفة ثلاثية بتوزيع ذكي يستوعب ثلاثة ضيوف بكل أريحية؛ أسرّة فاخرة، مساحات تخزين كافية للحقائب، ولمسات دافئة تجعل إقامتكم في مكة ممتعة ومريحة.",
      en: "Smartly arranged to accommodate three guests in comfort — premium beds, generous luggage storage, and warm tones making your Makkah trip seamless.",
    },
    size: "33 m²",
    capacity: { ar: "٣ ضيوف", en: "3 Guests" },
    beds: { ar: "٣ أسرّة مفردة", en: "3 Single Beds" },
    view: { ar: "إطلالة على المدينة", en: "City View" },
    priceFrom: 520,
    oldPrice: 640,
    features: {
      ar: [
        "٣ أسرّة مفردة فاخرة",
        "مساحة تخزين رحبة للأمتعة",
        "واي فاي فائق السرعة",
        "شاشة ذكية ٥٠ بوصة",
        "حمام رخامي متكامل",
        "تكييف مركزي مريح",
        "مياه زمزم ترحيبية",
        "خدمة تنظيف الغرف اليومية",
      ],
      en: [
        "3 Premium single beds",
        "Generous luggage storage space",
        "High-speed Wi-Fi",
        "50\" Smart TV",
        "Full marble bathroom",
        "Comfortable central AC",
        "Welcome Zamzam water",
        "Daily housekeeping",
      ],
    },
    images: [
      "/images/deluxe-triple.jpg",
      "/images/room-detail.jpg",
      "/images/bathroom.jpg",
    ],
  },
  {
    slug: "deluxe-quadruple",
    type: "family",
    name: { ar: "غرفة ديلوكس رباعية (Deluxe Quadruple)", en: "Deluxe Quadruple Room" },
    short: {
      ar: "أربعة أسرّة مفردة بمساحة متسعة تناسب العائلات الكبيرة ووفود المعتمرين.",
      en: "Four single beds in a spacious layout suitable for families and pilgrim groups.",
    },
    description: {
      ar: "صُممت الغرفة الرباعية في مكارم أجياد لتمنح العائلات الكبيرة وحملات العمرة إقامة مريحة واقتصادية في قلب أجياد، على بُعد دقائق من الحرم المكي مع كامل وسائل الراحة.",
      en: "Designed to provide larger families and Umrah groups with a convenient, comfortable stay right on Ajyad Street, minutes away from the Holy Mosque.",
    },
    size: "38 m²",
    capacity: { ar: "٤ ضيوف", en: "4 Guests" },
    beds: { ar: "٤ أسرّة مفردة", en: "4 Single Beds" },
    view: { ar: "إطلالة على المدينة", en: "City View" },
    priceFrom: 620,
    oldPrice: 780,
    features: {
      ar: [
        "٤ أسرّة مفردة بمراتب طبية مريحة",
        "مساحات تخزين واسعة للحقائب",
        "واي فاي سريع ومجاني",
        "شاشة ذكية ٥٠ بوصة",
        "حمام رخامي واسع",
        "تكييف مركزي متطور",
        "خدمة الغرف ٢٤ ساعة",
        "مياه زمزم ترحيبية مجانية",
      ],
      en: [
        "4 Single beds with orthopedic mattresses",
        "Spacious luggage storage",
        "Fast & free Wi-Fi",
        "50\" Smart TV",
        "Spacious marble bathroom",
        "Advanced central AC",
        "24/7 Room service",
        "Complimentary Zamzam water",
      ],
    },
    images: [
      "/images/bedroom-cozy.jpg",
      "/images/deluxe-triple.jpg",
      "/images/bathroom.jpg",
    ],
  },
];

/* ── Dining ───────────────────────────────────────────────────── */

export const dining: { name: L; desc: L; image: string }[] = [
  {
    name: { ar: "مطعم أجياد الرئيسي (Ajyad Restaurant)", en: "Ajyad Main Restaurant" },
    desc: {
      ar: "يقدم بوفيهات فاخرة تمزج بين المذاق الحجازي الأصيل، المطبخ الشرقي والأطباق العالمية، مع مواعيد إفطار وسحور مخصصة لأيام العمرة ورمضان المبارك.",
      en: "Offers lavish buffets blending authentic Hijazi cuisine, Oriental specialties, and global dishes, with special iftar & suhoor timings during Umrah seasons.",
    },
    image:
      "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2F6d6ff1f4119248968044049a6997eab4%3Fv%3D331fa026&w=1920&q=75",
  },
  {
    name: { ar: "مقهى غراب آند غو (Grab & Go Café)", en: "Grab & Go 24/7 Café" },
    desc: {
      ar: "يقدم وجبات خفيفة، معجنات طازجة، عصائر طبيعية ومشروبات ساخنة على مدار الساعة لخدمة ضيوف الرحمن القادمين من الصلوات والطواف.",
      en: "Serving light meals, fresh pastries, natural juices, and gourmet coffee 24/7 to welcome pilgrims returning from their prayers and Tawaf.",
    },
    image:
      "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2Fed7ab28675f14796a53f61275e53ebe7%3Fv%3Ddddc7352&w=1920&q=75",
  },
  {
    name: { ar: "صالة القهوة والضيافة السعودية", en: "Saudi Hospitality & Coffee Lounge" },
    desc: {
      ar: "أجواء حجازية مفعمة بالهدوء والسكينة؛ استمتع بالقهوة السعودية الأصيلة وأفخر أنواع التمور في جلسات مريحة بالبهو الرئيسي.",
      en: "A serene Hijazi atmosphere; savor authentic Saudi coffee and premium dates in relaxed, comfortable lounge seating in the main lobby.",
    },
    image: "/images/cafe.jpg",
  },
];

/* ── Offers ───────────────────────────────────────────────────── */

export type OfferTag = "seasonal" | "direct" | "weekend" | "longstay";

export const offerTags: Record<OfferTag, L> = {
  seasonal: { ar: "عروض موسمية", en: "Seasonal Offers" },
  direct: { ar: "الحجز المباشر", en: "Book Direct" },
  weekend: { ar: "عطلة نهاية الأسبوع", en: "Weekend Getaway" },
  longstay: { ar: "إقامة طويلة", en: "Long Stay" },
};

export type Offer = {
  slug: string;
  tag: OfferTag;
  title: L;
  subtitle: L;
  description: L;
  image: string;
  validUntil: L;
  deadline?: string;
  promoCode?: string;
  discountPercentage?: number;
  oldPrice?: number;
  newPrice?: number;
  perks: { ar: string[]; en: string[] };
  featured?: boolean;
};

export const offers: Offer[] = [
  {
    slug: "saudi-national-day",
    tag: "seasonal",
    title: { ar: "عرض اليوم الوطني السعودي", en: "Saudi National Day Offer" },
    subtitle: { ar: "احجز أي جناح واحصل على خصم ٥٠٪ على الليلة الثانية بكود SND96", en: "Book any suite & get 50% off your 2nd night with code SND96" },
    description: {
      ar: "احتفل باليوم الوطني في فندق مكارم أجياد مكة المكرمة؛ احجز أي جناح من أجنحتنا الفاخرة واستمتع بخصم ٥٠٪ على الليلة الثانية باستخدام الرمز الترويجي SND96، مع إفطار مجاني وضيافة سعودية أصيلة.",
      en: "Celebrate Saudi National Day at Makarem Ajyad Makkah. Book any luxury suite and get 50% off your second night with code SND96. Includes complimentary breakfast and warm Saudi hospitality.",
    },
    image:
      "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2Fb4e4a35c880e4ea1a0d63579ac5e58cd%3Fv%3Ded74adfa&w=1920&q=75",
    validUntil: { ar: "ساري حتى ٣٠ سبتمبر", en: "Valid until Sep 30" },
    deadline: "2026-09-30T23:59:00",
    promoCode: "SND96",
    discountPercentage: 50,
    oldPrice: 890,
    newPrice: 445,
    perks: {
      ar: [
        "خصم ٥٠٪ على الليلة الثانية للجناحات",
        "كود الخصم الحصري: SND96",
        "إفطار بوفيه فاخر مشمول",
        "تسجيل وصول مبكر ومغادرة متأخرة مجاناً",
        "مياه زمزم وضيافة بالتمور والقهوة السعودية",
      ],
      en: [
        "50% off on 2nd night on all suites",
        "Exclusive Promo Code: SND96",
        "Complimentary lavish buffet breakfast",
        "Free early check-in & late checkout",
        "Welcome Zamzam water, dates & Saudi coffee",
      ],
    },
    featured: true,
  },
  {
    slug: "book-direct",
    tag: "direct",
    title: { ar: "عرض الحجز المباشر (Book Direct)", en: "Book Direct Offer" },
    subtitle: { ar: "خصم فوري ١٠٪ وضمان أفضل سعر عند الحجز عبر الموقع", en: "Instant 10% discount & Best Rate Guarantee on direct booking" },
    description: {
      ar: "استفد من خصم مجزٍ بنسبة ١٠٪ وضمان أفضل سعر متاح عند الحجز المباشر عبر موقع فندق مكارم أجياد، مع أولوية اختيار الطوابق المرتفعة والإلغاء المرن.",
      en: "Benefit from a rewarding 10% discount and guaranteed best rate when booking directly through the Makarem Ajyad website, with priority room allocation and flexible cancellation.",
    },
    image:
      "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2F38cc580f91844b1fb9d4652688c5f21f%3Fv%3D52609383&w=1920&q=75",
    validUntil: { ar: "ساري طوال العام", en: "Available all year" },
    promoCode: "DIRECT10",
    discountPercentage: 10,
    oldPrice: 520,
    newPrice: 468,
    perks: {
      ar: [
        "خصم فوري ١٠٪ على جميع فئات الغرف",
        "ضمان أفضل سعر بدون أي رسوم خفية",
        "أولوية ترقية الغرفة عند التوفر",
        "إلغاء مرن ومجاني حتى ٤٨ ساعة",
        "مياه زمزم وضيافة ترحيبية مجانية",
      ],
      en: [
        "Instant 10% off on all room categories",
        "Guaranteed best rate with zero hidden fees",
        "Priority room upgrade upon availability",
        "Flexible cancellation up to 48 hours prior",
        "Free welcome Zamzam water & hospitality",
      ],
    },
  },
  {
    slug: "book-early-save",
    tag: "seasonal",
    title: { ar: "احجز مبكراً ووفّر (Book Early & Save)", en: "Book Early and Save" },
    subtitle: { ar: "وفّر حتى ٢٥٪ عند التخطيط المسبق لرحلة العمرة", en: "Save up to 25% by planning your Umrah stay in advance" },
    description: {
      ar: "خطط لرحلتك الروحانية مسبقاً واستمتع بخصومات حصرية تصل إلى ٢٥٪ على إقامتكم في مكارم أجياد مكة، بالقرب من الحرم المكي الشريف.",
      en: "Plan ahead and enjoy exclusive savings of up to 25% on your stay at Makarem Ajyad Makkah, right by the Holy Mosque.",
    },
    image:
      "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2Fb9a4d1da40684f13962f7322bcaf576e%3Fv%3D8dbd8113&w=1920&q=75",
    validUntil: { ar: "للحجوزات المسبقة بـ ١٤ يوماً+", en: "For bookings made 14+ days ahead" },
    deadline: "2026-11-30T23:59:00",
    promoCode: "EARLY25",
    discountPercentage: 25,
    oldPrice: 560,
    newPrice: 420,
    perks: {
      ar: [
        "خصم حتى ٢٥٪ على إقامات الغرف والأجنحة",
        "إفطار بوفيه مجاني لشخصين",
        "تعديل مجاني لموعد الوصول",
        "واي فاي فائق السرعة طوال الإقامة",
      ],
      en: [
        "Up to 25% off room & suite stays",
        "Complimentary buffet breakfast for two",
        "Free arrival date modification",
        "High-speed Wi-Fi throughout your stay",
      ],
    },
  },
  {
    slug: "spiritual-umrah-package",
    tag: "seasonal",
    title: { ar: "باقة العمرة والسكينة", en: "Spiritual Umrah Package" },
    subtitle: { ar: "إقامة شاملة الإفطار + مياه زمزم + إرشاد ديني + مواقف سيارات", en: "Full-board stay + Zamzam + spiritual guidance + free parking" },
    description: {
      ar: "باقة مخصصة لراحة المعتمر الكاملة؛ تشمل إفطاراً وسحوراً بوفيه يومياً، مياه زمزم نقية، مرافقة وإرشاداً من مكتب الإرشاد الديني بالفندق، ومواقف سيارات خاصة.",
      en: "Tailored for the ultimate pilgrim convenience — daily buffet breakfast, fresh Zamzam water, dedicated religious guidance from our spiritual concierge, and on-site parking.",
    },
    image: "/images/umrah-family.jpg",
    validUntil: { ar: "موسم العمرة الحالي", en: "Current Umrah Season" },
    oldPrice: 650,
    newPrice: 520,
    perks: {
      ar: [
        "إفطار بوفيه يومي شامل",
        "جلسة إرشادية خاصة مع المرشد الديني",
        "مياه زمزم ترحيبية وعبوة تذكارية",
        "مواقف سيارات مجانية طوال الإقامة",
        "خصم ١٥٪ على خدمات الغسيل والمطاعم",
      ],
      en: [
        "Daily comprehensive buffet breakfast",
        "Private consultation with the spiritual concierge",
        "Complimentary Zamzam water gift",
        "Free on-site parking throughout stay",
        "15% off laundry and dining outlets",
      ],
    },
  },
  {
    slug: "long-stay-retreat",
    tag: "longstay",
    title: { ar: "عرض الإقامة الطويلة (Long Stay)", en: "Long Stay Retreat" },
    subtitle: { ar: "خصم ٣٠٪ للإقامات من ٧ ليالٍ فأكثر مع خدمات غسيل مجانية", en: "30% off stays of 7+ nights with complimentary laundry" },
    description: {
      ar: "للضيوف الراغبين في ملازمة المسجد الحرام لأطول فترة ممكنة؛ خصم تصاعدي يصل إلى ٣٠٪ على الإقامات الطويلة مع خدمة غسيل الملابس مجاناً وأولوية في جميع الخدمات.",
      en: "For guests wishing to stay near the Holy Mosque for extended devotions — cumulative savings up to 30% on long stays with complimentary laundry service and priority concierge.",
    },
    image:
      "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2F8ca9ffd61581420c80a829a6f4254461%3Fv%3D9ea28d2b&w=1920&q=75",
    validUntil: { ar: "ساري طوال العام", en: "Available all year" },
    discountPercentage: 30,
    oldPrice: 700,
    newPrice: 490,
    perks: {
      ar: [
        "خصم ٣٠٪ للإقامات من ٧ ليالٍ فأكثر",
        "غسيل وكي ملابس مجاني أسبوعياً",
        "إنترنت واي فاي فائق السرعة مخصص",
        "خدمة تنظيف يومية بأعلى المعايير",
      ],
      en: [
        "30% off for stays of 7+ nights",
        "Complimentary weekly laundry & pressing",
        "Dedicated high-speed Wi-Fi",
        "Premium daily housekeeping service",
      ],
    },
  },
  {
    slug: "weekend-escape",
    tag: "weekend",
    title: { ar: "عطلة نهاية الأسبوع في مكة", en: "Makkah Weekend Escape" },
    subtitle: { ar: "ليلتان مع بوفيه إفطار فاخر وتسجيل وصول مبكر", en: "Two nights with lavish breakfast buffet & early check-in" },
    description: {
      ar: "جدد روحانيتك بقضاء عطلة نهاية أسبوع مباركة بجوار الكعبة المشرفة؛ ليلتان في غرفة ديلوكس مع إفطار يومي فاخر، وصول مبكر الساعة ١٢ ظهراً ومغادرة متأخرة الساعة ٤ عصراً.",
      en: "Recharge your soul with a blessed weekend near the Kaaba — two nights in a deluxe room with daily breakfast, early check-in at 12 PM, and late checkout at 4 PM.",
    },
    image: "/images/dining.jpg",
    validUntil: { ar: "كل خميس — سبت", en: "Every Thursday — Saturday" },
    oldPrice: 540,
    newPrice: 450,
    perks: {
      ar: [
        "إفطار بوفيه يومي مشمول",
        "تسجيل وصول مبكر ١٢ ظهراً",
        "تسجيل مغادرة متأخرة ٤ عصراً",
        "قهوة سعودية وتمور ترحيبية",
      ],
      en: [
        "Daily buffet breakfast included",
        "Early check-in at 12:00 PM",
        "Late checkout at 4:00 PM",
        "Welcome Saudi coffee & dates",
      ],
    },
  },
];

/* ── Testimonials ─────────────────────────────────────────────── */

export type Testimonial = { name: L; country: L; rating: number; text: L; avatar?: string };

export const testimonials: Testimonial[] = [
  {
    name: { ar: "الشيخ عبدالرحمن السالم", en: "Sheikh Abdulrahman Al-Salem" },
    country: { ar: "الرياض، المملكة العربية السعودية", en: "Riyadh, Saudi Arabia" },
    rating: 5,
    text: {
      ar: "موقع فندق مكارم أجياد استثنائي بحق؛ خرجنا من الفندق وكنا في صحن الطواف أمام الكعبة المشرفة خلال أقل من ٥ دقائق. الغرف نظيفة جداً، الأسرة مريحة للغاية، وتواجد مكتب الإرشاد الديني أضاف سكينة وطمأنينة لرحلتنا.",
      en: "The location of Makarem Ajyad is truly exceptional — we stepped out and reached the Mataf piazza in less than 5 minutes. Spotless rooms, very comfortable beds, and the spiritual concierge added immense peace to our journey.",
    },
  },
  {
    name: { ar: "د. فاطمة الزهراء الإدريسي", en: "Dr. Fatima Al-Zahraa" },
    country: { ar: "الدار البيضاء، المغرب", en: "Casablanca, Morocco" },
    rating: 5,
    text: {
      ar: "إقامة عائلية راقية لا تُنسى؛ الجناح العائلي واسع جداً ومناسب للأطفال وكبار السن. بوفيه الإفطار في مطعم أجياد متنوع وشهي، وحسن الاستقبال والضيافة السعودية يشعرك بأنك بين أهلك.",
      en: "An unforgettable family stay — the family suite is exceedingly spacious and ideal for families. The breakfast buffet at Ajyad Restaurant was rich and delicious, and the Saudi hospitality made us feel truly at home.",
    },
  },
  {
    name: { ar: "المهندس محمد إقبال", en: "Eng. Muhammad Iqbal" },
    country: { ar: "لاهور، باكستان", en: "Lahore, Pakistan" },
    rating: 5,
    text: {
      ar: "أفضل قيمة مقابل الفخامة والموقع القريب من الحرم. مكتبة الفندق الإسلامية مكان رائع للتدبر والقراءة، وخدمة الغرف سريعة جداً. اعتمدت مكارم أجياد فندقي الدائم لكل زيارة لمكة المكرمة.",
      en: "Best value for 5-star luxury and proximity to the Haram. The hotel's Islamic library is a wonderful sanctuary for contemplation, and room service is exceptionally fast. Makarem Ajyad is now my permanent hotel in Makkah.",
    },
  },
  {
    name: { ar: "نور الهدى سوبارتو", en: "Noor Al-Huda Soebarto" },
    country: { ar: "جاكرتا، إندونيسيا", en: "Jakarta, Indonesia" },
    rating: 5,
    text: {
      ar: "الإطلالة من الجناح على مآذن الحرم وبرج الساعة أذهلت والدتي وكانت أجمل هدية لها. النظافة ممتازة، وموظفو الاستقبال خدومون وبشوشون طوال الوقت. جزاكم الله خيراً.",
      en: "The view from the suite towards the Haram minarets and the Clock Tower was breathtaking. Outstanding cleanliness and courteous reception staff around the clock. May Allah reward you.",
    },
  },
];

/* ── Latest news ──────────────────────────────────────────────── */

export const news: { image: string; tag: L; title: L; date: L; href?: string }[] = [
  {
    image:
      "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2Fbf852c642e1440baaed9bd347765f175%3Fv%3De95c2bc7&w=1920&q=75",
    tag: { ar: "خدمة رقمية جديدة", en: "New Digital Feature" },
    title: {
      ar: "الخريطة الافتراضية للغرف: اختر غرفتك وإطلالتك المفضلة قبل الوصول",
      en: "Virtual Room Map: Select your preferred room & view before arrival",
    },
    date: { ar: "٢٠ سبتمبر ٢٠٢٦", en: "September 20, 2026" },
  },
  {
    image:
      "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2F6d6ff1f4119248968044049a6997eab4%3Fv%3D331fa026&w=1920&q=75",
    tag: { ar: "مأكولات وضيافة", en: "Dining & Hospitality" },
    title: {
      ar: "أطباق حجازية أصيلة بنكهات متوارثة في مطعم أجياد",
      en: "Authentic Hijazi delicacies and heritage flavors at Ajyad Restaurant",
    },
    date: { ar: "١٠ سبتمبر ٢٠٢٦", en: "September 10, 2026" },
  },
  {
    image:
      "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2F8ca9ffd61581420c80a829a6f4254461%3Fv%3D9ea28d2b&w=1920&q=75",
    tag: { ar: "عروض مكارم", en: "Makarem Deals" },
    title: {
      ar: "عرض اليوم الوطني السعودي: خصم ٥٠٪ على الليلة الثانية بكود SND96",
      en: "Saudi National Day Deal: 50% off second night with code SND96",
    },
    date: { ar: "١ سبتمبر ٢٠٢٦", en: "September 1, 2026" },
  },
];

/* ── FAQ (Official Makarem Ajyad FAQ) ─────────────────────────── */

export const faqs: { q: L; a: L }[] = [
  {
    q: { ar: "أين يقع فندق مكارم أجياد مكة؟", en: "Where is Makarem Ajyad located?" },
    a: {
      ar: "يقع فندق مكارم أجياد في شارع حمزة بن عبد المطلب بحي أجياد، مكة المكرمة، على بُعد ٣٠٠ متر فقط من برج الساعة وبوابة الملك عبدالعزيز المؤدية مباشرة للمسجد الحرام.",
      en: "Makarem Ajyad is located on Hamza Bin Abdulmuttaleb Street, Ajyad District, Makkah, just 300 meters from the Clock Tower and King Abdul Aziz Gate.",
    },
  },
  {
    q: { ar: "كم يبعد الفندق عن الحرم المكي الشريف؟", en: "How close is Makarem Ajyad to the Holy Mosque?" },
    a: {
      ar: "يبعد الفندق بضع دقائق سيراً على الأقدام (حوالي ٤ دقائق فقط) من ساحات وبوابات الحرم المكي الشريف، مما يجعله من أقرب وأفضل فنادق الـ ٥ نجوم لضيوف الرحمن.",
      en: "The hotel is just a few minutes' walk (approx. 4 mins) from Al-Haram, making it one of the closest and most convenient 5-star hotels to the Grand Mosque.",
    },
  },
  {
    q: { ar: "ما أنواع الغرف والأجنحة المتوفرة في مكارم أجياد؟", en: "What room types are available at Makarem Ajyad?" },
    a: {
      ar: "نوفر تشكيلة متنوعة تلائم جميع الضيوف: الجناح التنفيذي الملكي، الجناح العائلي بغرفتي نوم، الجونيور سويت، والغرف الديلوكس المزدوجة والثلاثية والرباعية.",
      en: "We offer a diverse selection: Executive Royal Suites, Family Suites with two bedrooms, Junior Suites, and Deluxe Double, Triple, and Quadruple rooms.",
    },
  },
  {
    q: { ar: "ما هي خدمة مكتب الإرشاد الديني (Spiritual Concierge)؟", en: "What is the Spiritual Concierge service?" },
    a: {
      ar: "هي خدمة فريدة تقدمها فنادق مكارم؛ يتواجد مرشد ديني متخصص لمساعدة وتوجيه ضيوف الرحمن في مناسك العمرة والحج والإجابة على الاستفسارات الفقهية بأسلوب ميسر.",
      en: "A signature Makarem service featuring a dedicated religious concierge to guide pilgrims through their Umrah and Hajj rituals and answer worship queries.",
    },
  },
  {
    q: { ar: "هل تتوفر مواقف سيارات في الفندق؟", en: "Is parking available at the hotel?" },
    a: {
      ar: "نعم، تتوفر مواقف خاصة لسيارات الضيوف في موقع الفندق مع خدمة صف السيارات (الفاليه)، ويُفضل الحجز المسبق خلال المواسم لضمان توفر المساحة.",
      en: "Yes, on-site secure parking is available for guests with valet parking assistance. Early booking is advised during peak seasons.",
    },
  },
  {
    q: { ar: "هل أحتاج إلى خدمة حافلات نقل للحرم؟", en: "Does the hotel provide shuttle service to Al-Haram?" },
    a: {
      ar: "نظراً للقرب الشديد للفندق وموقعه المباشر في أجياد (٣٠٠ متر فقط)، يمكن للضيوف المشي بسهولة تامة إلى الحرم دون الحاجة إلى وسائل نقل.",
      en: "Due to the hotel's very close proximity to the Holy Mosque (just 300 meters), shuttle service is not required as guests can effortlessly walk directly to the Haram.",
    },
  },
  {
    q: { ar: "ما هي الخريطة الافتراضية للغرف (Virtual Map)؟", en: "What is the Virtual Room Map feature?" },
    a: {
      ar: "تتيح لك الخريطة الافتراضية استعراض وتفقد موقع الغرف والأجنحة في طوابق الفندق والإطلالات المتاحة قبل وصولك واختيار الغرفة المفضلة لديك بكل سهولة.",
      en: "The Virtual Map allows you to explore room layouts across hotel floors and surrounding areas before arrival, enabling you to pick your preferred room and view.",
    },
  },
];

/* ── Navigation labels ────────────────────────────────────────── */

export const nav: { href: string; label: L }[] = [
  { href: "/", label: { ar: "الرئيسية", en: "Home" } },
  { href: "/rooms", label: { ar: "الغرف والأجنحة", en: "Rooms & Suites" } },
  { href: "/offers", label: { ar: "العروض والباقات", en: "Offers & Deals" } },
  { href: "/contact", label: { ar: "اتصل بنا", en: "Contact Us" } },
];
