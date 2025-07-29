import { MenuItem, Category } from '@/types';

export const sampleCategories: Omit<Category, 'id'>[] = [
  {
    name: {
      en: 'Appetizers',
      fr: 'Entrées',
      vi: 'Khai Vị',
    },
    description: {
      en: 'Start your meal with our delicious appetizers',
      fr: 'Commencez votre repas avec nos délicieuses entrées',
      vi: 'Bắt đầu bữa ăn với những món khai vị ngon miệng',
    },
    icon: '🥢',
    order: 1,
    active: true,
  },
  {
    name: {
      en: 'Main Dishes',
      fr: 'Plats Principaux',
      vi: 'Món Chính',
    },
    description: {
      en: 'Hearty and satisfying main courses',
      fr: 'Plats principaux copieux et satisfaisants',
      vi: 'Những món chính thịnh soạn và thỏa mãn',
    },
    icon: '🍜',
    order: 2,
    active: true,
  },
  {
    name: {
      en: 'Sides',
      fr: 'Accompagnements',
      vi: 'Món Phụ',
    },
    description: {
      en: 'Perfect accompaniments to your meal',
      fr: 'Accompagnements parfaits pour votre repas',
      vi: 'Những món ăn kèm hoàn hảo cho bữa ăn',
    },
    icon: '🍚',
    order: 3,
    active: true,
  },
  {
    name: {
      en: 'Beverages',
      fr: 'Boissons',
      vi: 'Đồ Uống',
    },
    description: {
      en: 'Refreshing drinks to complement your meal',
      fr: 'Boissons rafraîchissantes pour accompagner votre repas',
      vi: 'Những thức uống tươi mát bổ sung cho bữa ăn',
    },
    icon: '🥤',
    order: 4,
    active: true,
  },
];

export const sampleMenuItems: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // Appetizers
  {
    name: {
      en: 'Nem Rán (Spring Rolls)',
      fr: 'Rouleaux de Printemps Frits',
      vi: 'Nem Rán',
    },
    description: {
      en: 'Crispy golden spring rolls filled with pork, shrimp, and vegetables. Served with sweet and sour dipping sauce.',
      fr: 'Rouleaux de printemps dorés et croustillants farcis de porc, crevettes et légumes. Servis avec sauce aigre-douce.',
      vi: 'Nem rán giòn vàng nhân thịt heo, tôm và rau củ. Ăn kèm nước chấm chua ngọt.',
    },
    price: 8.99,
    category: 'appetizers',
    image: '/images/nem-ran.jpg',
    ingredients: ['pork', 'shrimp', 'vegetables', 'rice paper'],
    spiceLevel: 1,
    popular: true,
    available: true,
    allergens: ['shellfish'],
    nutritionalInfo: {
      calories: 180,
      protein: 12,
      carbs: 15,
      fat: 8,
    },
  },
  {
    name: {
      en: 'Gỏi Cuốn (Fresh Spring Rolls)',
      fr: 'Rouleaux de Printemps Frais',
      vi: 'Gỏi Cuốn',
    },
    description: {
      en: 'Fresh rice paper rolls with shrimp, herbs, lettuce, and vermicelli noodles. Served with peanut dipping sauce.',
      fr: 'Rouleaux de papier de riz frais avec crevettes, herbes, laitue et vermicelles. Servis avec sauce aux arachides.',
      vi: 'Bánh tráng cuốn tôm thịt với rau thơm, xà lách và bún. Ăn kèm nước chấm đậu phộng.',
    },
    price: 7.99,
    category: 'appetizers',
    image: '/images/goi-cuon.jpg',
    ingredients: ['shrimp', 'herbs', 'lettuce', 'rice noodles'],
    spiceLevel: 1,
    popular: true,
    available: true,
    allergens: ['shellfish', 'peanuts'],
    nutritionalInfo: {
      calories: 120,
      protein: 8,
      carbs: 18,
      fat: 3,
    },
  },
  {
    name: {
      en: 'Bánh Mì Chả Cá',
      fr: 'Sandwich au Poisson Grillé',
      vi: 'Bánh Mì Chả Cá',
    },
    description: {
      en: 'Vietnamese fish cake sandwich with fresh herbs, pickled vegetables, and spicy mayo.',
      fr: 'Sandwich vietnamien au gâteau de poisson avec herbes fraîches, légumes marinés et mayo épicée.',
      vi: 'Bánh mì chả cá với rau thơm, đồ chua và mayonnaise cay.',
    },
    price: 6.99,
    category: 'appetizers',
    image: '/images/banh-mi-cha-ca.jpg',
    ingredients: ['fish cake', 'herbs', 'pickled vegetables', 'bread'],
    spiceLevel: 2,
    popular: false,
    available: true,
    allergens: ['gluten', 'fish'],
    nutritionalInfo: {
      calories: 280,
      protein: 15,
      carbs: 35,
      fat: 10,
    },
  },

  // Main Dishes
  {
    name: {
      en: 'Phở Bò (Beef Pho)',
      fr: 'Soupe de Bœuf Phở',
      vi: 'Phở Bò',
    },
    description: {
      en: 'Traditional Vietnamese beef noodle soup with aromatic broth, rice noodles, and fresh herbs.',
      fr: 'Soupe traditionnelle vietnamienne au bœuf avec bouillon aromatique, nouilles de riz et herbes fraîches.',
      vi: 'Phở bò truyền thống với nước dùng thơm ngon, bánh phở và rau thơm.',
    },
    price: 12.99,
    category: 'main-dishes',
    image: '/images/pho-bo.jpg',
    ingredients: ['beef', 'rice noodles', 'herbs', 'onions'],
    spiceLevel: 2,
    popular: true,
    available: true,
    allergens: [],
    nutritionalInfo: {
      calories: 450,
      protein: 25,
      carbs: 55,
      fat: 12,
    },
  },
  {
    name: {
      en: 'Phở Gà (Chicken Pho)',
      fr: 'Soupe de Poulet Phở',
      vi: 'Phở Gà',
    },
    description: {
      en: 'Light and flavorful chicken noodle soup with tender chicken, rice noodles, and aromatic herbs.',
      fr: 'Soupe de nouilles au poulet légère et savoureuse avec poulet tendre, nouilles de riz et herbes aromatiques.',
      vi: 'Phở gà thanh đạm với thịt gà mềm, bánh phở và rau thơm.',
    },
    price: 11.99,
    category: 'main-dishes',
    image: '/images/pho-ga.jpg',
    ingredients: ['chicken', 'rice noodles', 'herbs', 'onions'],
    spiceLevel: 1,
    popular: true,
    available: true,
    allergens: [],
    nutritionalInfo: {
      calories: 380,
      protein: 22,
      carbs: 50,
      fat: 8,
    },
  },
  {
    name: {
      en: 'Bún Bò Huế',
      fr: 'Soupe de Bœuf Épicée de Huế',
      vi: 'Bún Bò Huế',
    },
    description: {
      en: 'Spicy beef noodle soup from Hue with lemongrass, chili oil, and thick rice noodles.',
      fr: 'Soupe de nouilles au bœuf épicée de Huế avec citronnelle, huile de piment et nouilles de riz épaisses.',
      vi: 'Bún bò Huế cay nồng với sả, dầu ớt và bún to.',
    },
    price: 13.99,
    category: 'main-dishes',
    image: '/images/bun-bo-hue.jpg',
    ingredients: ['beef', 'thick rice noodles', 'lemongrass', 'chili oil'],
    spiceLevel: 4,
    popular: true,
    available: true,
    allergens: [],
    nutritionalInfo: {
      calories: 520,
      protein: 28,
      carbs: 58,
      fat: 18,
    },
  },

  // Sides
  {
    name: {
      en: 'Xôi Vò (Sticky Rice)',
      fr: 'Riz Gluant aux Haricots Mungo',
      vi: 'Xôi Vò',
    },
    description: {
      en: 'Sticky rice with mung beans, coconut, and peanuts. A traditional Vietnamese comfort food.',
      fr: 'Riz gluant aux haricots mungo, noix de coco et arachides. Un plat réconfortant vietnamien traditionnel.',
      vi: 'Xôi vò với đậu xanh, dừa và đậu phộng. Món ăn dân dã truyền thống.',
    },
    price: 4.99,
    category: 'sides',
    image: '/images/xoi-vo.jpg',
    ingredients: ['sticky rice', 'mung beans', 'coconut', 'peanuts'],
    spiceLevel: 0,
    popular: false,
    available: true,
    allergens: ['peanuts'],
    nutritionalInfo: {
      calories: 220,
      protein: 6,
      carbs: 42,
      fat: 5,
    },
  },

  // Beverages
  {
    name: {
      en: 'Cà Phê Sữa Đá (Iced Coffee)',
      fr: 'Café Glacé au Lait Concentré',
      vi: 'Cà Phê Sữa Đá',
    },
    description: {
      en: 'Strong Vietnamese coffee with sweetened condensed milk served over ice.',
      fr: 'Café vietnamien fort avec lait concentré sucré servi sur glace.',
      vi: 'Cà phê phin đậm đà với sữa đặc ngọt và đá.',
    },
    price: 3.99,
    category: 'beverages',
    image: '/images/ca-phe-sua-da.jpg',
    ingredients: ['Vietnamese coffee', 'condensed milk', 'ice'],
    spiceLevel: 0,
    popular: true,
    available: true,
    allergens: ['dairy'],
    nutritionalInfo: {
      calories: 120,
      protein: 3,
      carbs: 18,
      fat: 4,
    },
  },
  {
    name: {
      en: 'Trà Đá (Iced Tea)',
      fr: 'Thé Glacé',
      vi: 'Trà Đá',
    },
    description: {
      en: 'Refreshing jasmine tea served over ice with a touch of sweetness.',
      fr: 'Thé au jasmin rafraîchissant servi sur glace avec une pointe de douceur.',
      vi: 'Trà hoa nhài mát lạnh với chút đường.',
    },
    price: 2.99,
    category: 'beverages',
    image: '/images/tra-da.jpg',
    ingredients: ['jasmine tea', 'sugar', 'ice'],
    spiceLevel: 0,
    popular: false,
    available: true,
    allergens: [],
    nutritionalInfo: {
      calories: 25,
      protein: 0,
      carbs: 6,
      fat: 0,
    },
  },
];
