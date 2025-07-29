import { Language, Translation } from '@/types';

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
];

export const translations: Translation = {
  // Navigation
  home: {
    en: 'Home',
    fr: 'Accueil',
    vi: 'Trang Chủ',
  },
  menu: {
    en: 'Menu',
    fr: 'Menu',
    vi: 'Thực Đơn',
  },
  about: {
    en: 'About',
    fr: 'À Propos',
    vi: 'Giới Thiệu',
  },
  contact: {
    en: 'Contact',
    fr: 'Contact',
    vi: 'Liên Hệ',
  },
  admin: {
    en: 'Admin',
    fr: 'Admin',
    vi: 'Quản Trị',
  },
  login: {
    en: 'Login',
    fr: 'Connexion',
    vi: 'Đăng Nhập',
  },
  logout: {
    en: 'Logout',
    fr: 'Déconnexion',
    vi: 'Đăng Xuất',
  },

  // Restaurant Info
  restaurantName: {
    en: 'Saigon Kitchen',
    fr: 'Cuisine de Saigon',
    vi: 'Bếp Sài Gòn',
  },
  restaurantTagline: {
    en: 'Authentic Vietnamese Cuisine',
    fr: 'Cuisine Vietnamienne Authentique',
    vi: 'Ẩm Thực Việt Nam Chính Gốc',
  },

  // Menu Categories
  all: {
    en: 'All',
    fr: 'Tout',
    vi: 'Tất Cả',
  },
  appetizers: {
    en: 'Appetizers',
    fr: 'Entrées',
    vi: 'Khai Vị',
  },
  mainDishes: {
    en: 'Main Dishes',
    fr: 'Plats Principaux',
    vi: 'Món Chính',
  },
  sides: {
    en: 'Sides',
    fr: 'Accompagnements',
    vi: 'Món Phụ',
  },
  beverages: {
    en: 'Beverages',
    fr: 'Boissons',
    vi: 'Đồ Uống',
  },
  desserts: {
    en: 'Desserts',
    fr: 'Desserts',
    vi: 'Tráng Miệng',
  },

  // Menu Actions
  allMenu: {
    en: 'All Menu',
    fr: 'Tout Menu',
    vi: 'Tất Cả Thực Đơn',
  },
  addToCart: {
    en: 'Add to Cart',
    fr: 'Ajouter au Panier',
    vi: 'Thêm Vào Giỏ',
  },
  viewDetails: {
    en: 'View Details',
    fr: 'Voir Détails',
    vi: 'Xem Chi Tiết',
  },
  popular: {
    en: 'Popular',
    fr: 'Populaire',
    vi: 'Phổ Biến',
  },
  spiceLevel: {
    en: 'Spice Level',
    fr: 'Niveau de Piment',
    vi: 'Độ Cay',
  },
  ingredients: {
    en: 'Ingredients',
    fr: 'Ingrédients',
    vi: 'Nguyên Liệu',
  },

  // Cart & Checkout
  cart: {
    en: 'Cart',
    fr: 'Panier',
    vi: 'Giỏ Hàng',
  },
  checkout: {
    en: 'Checkout',
    fr: 'Commander',
    vi: 'Thanh Toán',
  },
  subtotal: {
    en: 'Subtotal',
    fr: 'Sous-total',
    vi: 'Tạm Tính',
  },
  tax: {
    en: 'Tax',
    fr: 'Taxe',
    vi: 'Thuế',
  },
  total: {
    en: 'Total',
    fr: 'Total',
    vi: 'Tổng Cộng',
  },
  quantity: {
    en: 'Quantity',
    fr: 'Quantité',
    vi: 'Số Lượng',
  },
  remove: {
    en: 'Remove',
    fr: 'Supprimer',
    vi: 'Xóa',
  },

  // Order Status
  orderHistory: {
    en: 'Order History',
    fr: 'Historique des Commandes',
    vi: 'Lịch Sử Đơn Hàng',
  },
  orderStatus: {
    en: 'Order Status',
    fr: 'Statut de la Commande',
    vi: 'Trạng Thái Đơn Hàng',
  },
  pending: {
    en: 'Pending',
    fr: 'En Attente',
    vi: 'Chờ Xử Lý',
  },
  confirmed: {
    en: 'Confirmed',
    fr: 'Confirmé',
    vi: 'Đã Xác Nhận',
  },
  preparing: {
    en: 'Preparing',
    fr: 'En Préparation',
    vi: 'Đang Chuẩn Bị',
  },
  ready: {
    en: 'Ready',
    fr: 'Prêt',
    vi: 'Sẵn Sàng',
  },
  delivered: {
    en: 'Delivered',
    fr: 'Livré',
    vi: 'Đã Giao',
  },

  // Authentication
  signInWithGoogle: {
    en: 'Sign in with Google',
    fr: 'Se connecter avec Google',
    vi: 'Đăng nhập bằng Google',
  },
  welcome: {
    en: 'Welcome',
    fr: 'Bienvenue',
    vi: 'Chào Mừng',
  },
  profile: {
    en: 'Profile',
    fr: 'Profil',
    vi: 'Hồ Sơ',
  },

  // Recommendations
  recommendedForYou: {
    en: 'Recommended for You',
    fr: 'Recommandé pour Vous',
    vi: 'Gợi Ý Cho Bạn',
  },
  basedOnYourPreferences: {
    en: 'Based on your preferences',
    fr: 'Basé sur vos préférences',
    vi: 'Dựa trên sở thích của bạn',
  },

  // Common Actions
  save: {
    en: 'Save',
    fr: 'Enregistrer',
    vi: 'Lưu',
  },
  cancel: {
    en: 'Cancel',
    fr: 'Annuler',
    vi: 'Hủy',
  },
  edit: {
    en: 'Edit',
    fr: 'Modifier',
    vi: 'Chỉnh Sửa',
  },
  delete: {
    en: 'Delete',
    fr: 'Supprimer',
    vi: 'Xóa',
  },
  loading: {
    en: 'Loading...',
    fr: 'Chargement...',
    vi: 'Đang tải...',
  },
  error: {
    en: 'Error',
    fr: 'Erreur',
    vi: 'Lỗi',
  },
  success: {
    en: 'Success',
    fr: 'Succès',
    vi: 'Thành Công',
  },

  // Footer
  followUs: {
    en: 'Follow Us',
    fr: 'Suivez-nous',
    vi: 'Theo Dõi Chúng Tôi',
  },
  openingHours: {
    en: 'Opening Hours',
    fr: 'Heures d\'Ouverture',
    vi: 'Giờ Mở Cửa',
  },
  address: {
    en: 'Address',
    fr: 'Adresse',
    vi: 'Địa Chỉ',
  },
  phone: {
    en: 'Phone',
    fr: 'Téléphone',
    vi: 'Điện Thoại',
  },
  email: {
    en: 'Email',
    fr: 'Email',
    vi: 'Email',
  },
};

export const getTranslation = (key: string, language: 'en' | 'fr' | 'vi' = 'en'): string => {
  const translation = translations[key];
  if (!translation) {
    console.warn(`Translation key "${key}" not found`);
    return key;
  }
  return translation[language] || translation.en || key;
};

export const getLocalizedContent = <T extends Record<string, any>>(
  content: T,
  language: 'en' | 'fr' | 'vi' = 'en'
): any => {
  if (typeof content === 'object' && content !== null) {
    if (content.en && content.fr && content.vi) {
      return content[language] || content.en;
    }
    // If it's a regular object, recursively process its properties
    const result: any = {};
    for (const [key, value] of Object.entries(content)) {
      result[key] = getLocalizedContent(value, language);
    }
    return result;
  }
  return content;
};
