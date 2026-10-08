// English menu: names and short descriptions per item id from data/menu.ts (prices always come from there).
// Turkish dish names are kept where English has no real equivalent, with a description underneath.
// An item missing here shows its Turkish name and no description.

import type { MenuTranslation } from './types'

const WEIGHT_UNITS: [RegExp, string][] = [
  [/^(\d+) gr\.$/, '$1 g'],
  [/^(\d+) Adet$/, '$1 pcs'],
  [/^(\d+) lt$/, '$1 L'],
  [/^1 Kişilik$/, 'Per person'],
  [/^Sek$/, 'Dry'],
]

const menuEn: MenuTranslation = {
  weight: (w) => WEIGHT_UNITS.reduce((s, [re, to]) => s.replace(re, to), w),

  categories: {
    'fiks-menu': { name: 'Kolcuoğlu Special Menu', description: 'A complete feast built around the Metre Kebab' },
    mezeler: { name: 'Mezes', description: 'Fresh, regional flavours' },
    salatalar: { name: 'Salads', description: 'Seasonal greens and fresh ingredients' },
    'ara-sicaklar': { name: 'Hot Starters', description: 'Warm dishes to begin with' },
    'kebaplar-izgaralar': { name: 'Kebabs & Grills', description: 'Cooked over charcoal by our grill masters' },
    'lahmacun-pide': { name: 'Lahmacun & Pide', description: 'Crisp dough and fresh toppings' },
    tatlilar: { name: 'Desserts', description: 'A sweet finish' },
    mesrubatlar: { name: 'Soft Drinks', description: 'Refreshing drinks' },
    'sicak-icecekler': { name: 'Hot Drinks', description: 'Tea, Turkish coffee and espresso drinks' },
    'soguk-kahveler': { name: 'Iced Coffees', description: 'Coffee over ice' },
    'alkollu-icecekler': { name: 'Rakı, Spirits & Beer', description: 'Our selection of rakı, whisky, vodka and beer' },
    saraplar: { name: 'Wines', description: 'Our selection of red, white and rosé wines' },
    kokteyller: { name: 'Cocktails', description: 'Mixed by our bartender' },
  },

  subCategories: {
    'Tekirdağ Rakısı': 'Tekirdağ Rakı',
    Viski: 'Whisky',
    Votka: 'Vodka, Gin & Tequila',
    Bira: 'Beer',
    Kırmızı: 'Red',
    Beyaz: 'White',
    Rose: 'Rosé',
  },

  variants: {
    Tek: 'Single',
    Duble: 'Double',
    '15 Yıllık': '15 Year Old',
    '18 Yıllık': '18 Year Old',
  },

  items: {
    // Special Menu (structured data only; the page shows the special-menu card)
    m1: {
      name: 'Kolcuoğlu Special Menu',
      description:
        '6 mezes, seasonal salad, Adana ezme, çiğ köfte, hummus with pastırma, chicken and mushroom sauté, bite-sized lahmacun, fire-roasted aubergine, Metre Kebab (Adana kebab, sarma beyti, chicken wings, chicken şiş, ribs), fruit platter (6 kinds), desserts (3 kinds), a soft drink, tea and coffee.',
    },

    // Mezes
    m2: { description: 'Fried aubergine and peppers in a garlicky tomato sauce' },
    m3: { description: 'Finely chopped tomatoes, peppers and onion with chilli and pomegranate molasses' },
    m4: { description: 'Cretan-style dip of white cheese, walnuts, fresh herbs and olive oil' },
    m5: { name: 'Bombay Beans (Plaki)', description: 'Large white beans braised in olive oil with tomato and vegetables' },
    m6: { description: 'Smooth purée of dried broad beans with olive oil and dill' },
    m7: { name: 'Carrot Tarator', description: 'Sautéed grated carrot folded into garlic yogurt' },
    m8: { description: 'Thick strained yogurt with garlic, dill and mint' },
    m9: { description: 'Fried aubergine and peppers topped with garlic yogurt and tomato sauce' },
    m10: { description: 'Thick yogurt with cucumber, garlic and dried mint' },
    m11: { name: 'Mixed Pickles', description: 'Assorted Turkish pickles' },
    m12: { name: 'Melon Plate', description: 'Sweet melon, the classic companion to rakı' },
    m13: { name: 'Turkish White Cheese', description: 'Creamy brined white cheese' },
    m14: { name: 'Tangy Beetroot', description: 'Beetroot with a sharp, sour flavour' },
    m15: { description: 'Strained yogurt topped with dried hot chillies sizzled in butter' },
    m16: { name: 'Purslane', description: 'Fresh purslane in garlic yogurt' },
    m17: { name: 'Spicy Muhammara', description: 'Roasted red pepper and walnut dip with pomegranate molasses' },
    m18: { description: 'Spicy, meat-free bulgur köfte kneaded with pepper paste' },
    m19: { name: 'Tulum Cheese Butter', description: 'Butter blended with tulum, a sharp, crumbly Turkish cheese' },
    m20: { description: 'Sun-dried aubergines and peppers stuffed with seasoned rice, Gaziantep style. Meat-free.' },

    // Salads
    m21: { name: 'Gavurdağı Salad', description: 'Finely chopped tomatoes, peppers, onion and walnuts with pomegranate molasses' },
    m22: { name: 'Seasonal Salad', description: 'Fresh seasonal greens and vegetables' },
    m23: { name: 'Shepherd’s Salad', description: 'Diced tomatoes, cucumber, peppers and onion with olive oil and lemon' },
    m24: { name: 'Tablacı Salad', description: 'Finely chopped tomatoes and onion with parsley and sumac, Adana style' },
    m25: { name: 'Rocket Salad' },
    m26: { description: 'Hand-chopped tomatoes, peppers and onion, Adana style' },

    // Hot starters
    m27: { name: 'Soup of the Day' },
    m28: { description: 'Crisp bulgur shells filled with spiced minced meat' },
    m29: { name: 'Paçanga Börek', description: 'Crispy pastry rolls filled with pastırma and melted kaşar cheese' },
    m30: { name: 'Grilled Mushrooms with Kaşar Cheese' },
    m31: { name: 'Hummus with Pastırma', description: 'Hummus topped with sizzling pastırma, Turkish cured beef' },
    m32: { name: 'Bite-Sized Pide' },
    m33: { name: 'Bite-Sized Lahmacun' },

    // Kebabs & grills
    m34: { name: 'Metre Kebab', description: 'Our signature kebab, a full metre long. Serves a minimum of two.' },
    m35: { name: 'Mixed Grill' },
    m36: { name: 'Adana Kebab', description: 'Spicy hand-minced lamb kebab, grilled on a wide skewer over charcoal' },
    m37: { name: 'Urfa Kebab', description: 'Our hand-minced kebab, mild and without chilli' },
    m38: { description: 'Kebab wrapped in thin lavash, sliced and served with tomato sauce and yogurt' },
    m39: { name: 'Alinazik with Şiş', description: 'Smoky aubergine and garlic yogurt, topped with grilled cubes of meat' },
    m40: { name: 'Alinazik with Kebab', description: 'Smoky aubergine and garlic yogurt, topped with hand-minced kebab' },
    m41: { name: 'Aubergine Kebab', description: 'Minced meat and aubergine grilled together on the skewer' },
    m42: { name: 'Chicken Şiş', description: 'Marinated chicken cubes grilled on the skewer' },
    m43: { name: 'Chicken Wings', description: 'Grilled over charcoal' },
    m44: { name: 'Lamb Chops' },
    m45: { name: 'Lamb Tenderloin' },
    m46: { name: 'Lamb Ribs' },
    m47: { description: 'Small cubes of meat grilled on thin skewers' },
    m48: { name: 'Beef Tenderloin' },

    // Lahmacun & pide
    m49: { name: 'Adana-Style Lahmacun', description: 'Thin and crisp, topped with spicy minced meat' },
    m50: { description: 'Thin flatbread topped with spiced minced meat, tomato and peppers' },
    m51: { name: 'Pide with Minced Meat' },
    m52: { name: 'Pide with Kaşar Cheese' },
    m53: { name: 'Pide with Diced Meat' },

    // Desserts
    m54: { description: 'Flaky Gaziantep pastry layered with pistachios and clotted cream' },
    m55: { description: 'Shredded kadayıf pastry with melted cheese, baked and soaked in syrup' },
    m56: { name: 'Candied Pumpkin', description: 'Served with tahini and walnuts' },
    m57: { name: 'Pistachio Kadayıf', description: 'Crisp shredded pastry with pistachios in syrup' },
    m58: { name: 'Semolina Halva with Ice Cream' },
    m59: { name: 'Ice Cream' },

    // Soft drinks
    m60: { description: 'Chilled, lightly salted yogurt drink' },
    m63: { name: 'Fruit Juice' },
    m65: { name: 'Iced Tea' },
    m66: { name: 'Sparkling Mineral Water' },
    m67: { name: 'Red Bull' },
    m68: { name: 'Şalgam (Small)', description: 'Spicy fermented purple carrot juice' },

    // Hot drinks
    m_h1: { name: 'Turkish Tea' },
    m_h2: { name: 'Turkish Coffee' },
    m_h4: { name: 'Flavoured Latte', description: '(Caramel / Vanilla)' },
    m_h10: { name: 'Con Panna' },
    m_h11: { name: 'Hot Salep', description: 'Creamy hot milk drink made with orchid-root flour, dusted with cinnamon' },

    // Iced coffees
    m_ic1: { name: 'Iced Latte' },
    m_ic2: { name: 'Iced Americano' },
    m_ic3: { name: 'Iced Caramel Latte' },

    // Spirits & beer (brand names stay; only obvious spellings are fixed)
    m_a23: { name: 'Ballantine’s' },
    m_a25: { name: 'Johnnie Walker Black Label' },
    m_a26: { name: 'Johnnie Walker Red Label' },
    m_a33: { name: 'Olmeca Tequila Silver' },
    m_a34: { name: 'Olmeca Tequila Gold' },
    m_a35: { name: 'Sierra Tequila Silver' },
    m_a36: { name: 'Sierra Tequila Gold' },
    m_a39: { name: 'Efes Gluten-Free' },
    m_a41: { name: 'Bomonti Unfiltered' },
    m_a45: { name: 'Beck’s' },

    // Wines
    m_w6: { name: 'J.P. Chenet' },

    // Cocktails: ingredients only, the way English menus list them
    m_k1: { description: 'Bacardi, brown sugar, lemon juice, lemon wedges, fresh mint, soda' },
    m_k2: { description: 'Vodka, Bacardi, tequila, gin, lemon juice, peach iced tea' },
    m_k3: { description: 'Gin, lemon juice, sugar syrup, soda' },
    m_k4: { description: 'Tequila, vodka, Archers peach schnapps, grenadine, orange juice' },
    m_k5: { name: 'Margarita', description: 'Tequila, orange liqueur, lemon juice, ice' },
    m_k6: { name: 'Lynchburg Lemonade', description: 'Jack Daniel’s, lemon juice, a wedge of lemon' },
    m_k7: { description: 'Vodka, Kahlúa, cream' },
  },
}

export default menuEn
