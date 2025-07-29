-- Create admin_users table for admin authentication
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);

-- Create dishes table
CREATE TABLE IF NOT EXISTS dishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  name_vi TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  description_vi TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('appetizers', 'main_dishes', 'sides', 'beverages')),
  spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 4),
  is_popular BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_order_at TIMESTAMP WITH TIME ZONE,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0.00
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_dishes_category ON dishes(category);
CREATE INDEX IF NOT EXISTS idx_dishes_popular ON dishes(is_popular);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON admin_users(is_active);

-- Insert sample dishes data
INSERT INTO dishes (name_en, name_fr, name_vi, description_en, description_fr, description_vi, price, category, spice_level, is_popular) VALUES
('Spicy Beef Noodle Soup', 'Soupe de nouilles au bœuf épicée', 'Bún Bò Huế', 'Spicy beef noodle soup with lemongrass, shrimp paste, and pork.', 'Soupe de nouilles au bœuf épicée avec citronnelle, pâte de crevettes et porc.', 'Bún bò Huế cay nồng với sả, đậu ớt và bún to.', 13.99, 'main_dishes', 4, true),
('Vietnamese Iced Coffee', 'Café glacé vietnamien', 'Cà Phê Sữa Đá', 'Traditional Vietnamese iced coffee with sweetened condensed milk and ice.', 'Café glacé vietnamien traditionnel avec lait concentré sucré et glace.', 'Cà phê phin đậm đà với sữa đặc ngọt và đá.', 3.99, 'beverages', 0, true),
('Fresh Spring Rolls', 'Rouleaux de printemps frais', 'Gỏi Cuốn', 'Fresh spring rolls with shrimp, lettuce, and herbs. Served with peanut dipping sauce.', 'Rouleaux de printemps frais avec crevettes, laitue et herbes. Servis avec sauce aux arachides.', 'Bánh tráng cuốn tôm thịt với rau thơm, xà lách và bún. Ăn kèm nước chấm đậu phộng.', 7.99, 'appetizers', 1, true),
('Beef Pho', 'Pho au bœuf', 'Phở Bò', 'Traditional beef pho with rice noodles, beef broth, and herbs.', 'Pho au bœuf traditionnel avec nouilles de riz, bouillon de bœuf et herbes.', 'Phở bò truyền thống với nước dùng thơm ngon, bánh phở và rau thơm.', 12.99, 'main_dishes', 2, false),
('Chicken Pho', 'Pho au poulet', 'Phở Gà', 'Light chicken pho with tender chicken, rice noodles, and herbs.', 'Pho au poulet léger avec poulet tendre, nouilles de riz et herbes.', 'Phở gà thanh đạm với thịt gà mềm, bánh phở và rau thơm.', 11.99, 'main_dishes', 1, false),
('Fried Spring Rolls', 'Rouleaux de printemps frits', 'Nem Rán', 'Golden fried spring rolls filled with pork, shrimp, and vegetables. Served with sweet and sour sauce.', 'Rouleaux de printemps dorés frits remplis de porc, crevettes et légumes. Servis avec sauce aigre-douce.', 'Nem rán giòn vàng nhân thịt heo, tôm và rau củ. Ăn kèm nước chấm chua ngọt.', 8.99, 'appetizers', 1, false),
('Fish Cake Sandwich', 'Sandwich au gâteau de poisson', 'Bánh Mì Chả Cá', 'Vietnamese fish cake sandwich with herbs, mayo, and chili sauce.', 'Sandwich vietnamien au gâteau de poisson avec herbes, mayo et sauce pimentée.', 'Bánh mì chả cá với rau thơm, đồ chua và tương ớt.', 6.99, 'sides', 2, false),
('Sticky Rice with Mung Beans', 'Riz gluant aux haricots mungo', 'Xôi Vò', 'Sticky rice with mung beans, peanuts, and coconut. A traditional dessert.', 'Riz gluant aux haricots mungo, cacahuètes et noix de coco. Un dessert traditionnel.', 'Xôi vò với đậu xanh, đậu phộng và dừa. Món ăn dân dã truyền thống.', 4.99, 'sides', 0, false),
('Iced Tea', 'Thé glacé', 'Trà Đá', 'Refreshing iced tea with lemon and sugar.', 'Thé glacé rafraîchissant avec citron et sucre.', 'Trà hoa nhài mát lạnh với chút đường.', 2.99, 'beverages', 0, false)
ON CONFLICT DO NOTHING;

-- Insert sample customers data
INSERT INTO customers (email, name, phone, total_orders, total_spent, last_order_at) VALUES
('john.doe@email.com', 'John Doe', '+1-555-0123', 3, 45.97, NOW() - INTERVAL '2 days'),
('marie.martin@email.com', 'Marie Martin', '+33-1-23-45-67-89', 7, 89.43, NOW() - INTERVAL '1 day'),
('nguyen.van.a@email.com', 'Nguyễn Văn A', '+84-90-123-4567', 2, 26.98, NOW() - INTERVAL '5 days'),
('sarah.wilson@email.com', 'Sarah Wilson', '+1-555-0456', 1, 13.99, NOW() - INTERVAL '1 week'),
('pierre.dubois@email.com', 'Pierre Dubois', '+33-6-12-34-56-78', 5, 67.95, NOW() - INTERVAL '3 days')
ON CONFLICT DO NOTHING;

-- Insert sample orders data
INSERT INTO orders (customer_id, items, total_amount, status, created_at) VALUES
(
  (SELECT id FROM customers WHERE email = 'john.doe@email.com'),
  '[{"dish_id": "1", "dish_name": "Spicy Beef Noodle Soup", "quantity": 1, "price": 13.99}, {"dish_id": "2", "dish_name": "Vietnamese Iced Coffee", "quantity": 2, "price": 3.99}]',
  21.97,
  'delivered',
  NOW() - INTERVAL '2 days'
),
(
  (SELECT id FROM customers WHERE email = 'marie.martin@email.com'),
  '[{"dish_id": "3", "dish_name": "Fresh Spring Rolls", "quantity": 2, "price": 7.99}, {"dish_id": "4", "dish_name": "Beef Pho", "quantity": 1, "price": 12.99}]',
  28.97,
  'preparing',
  NOW() - INTERVAL '30 minutes'
),
(
  (SELECT id FROM customers WHERE email = 'nguyen.van.a@email.com'),
  '[{"dish_id": "1", "dish_name": "Spicy Beef Noodle Soup", "quantity": 2, "price": 13.99}]',
  27.98,
  'pending',
  NOW() - INTERVAL '15 minutes'
)
ON CONFLICT DO NOTHING;

-- Insert default admin user
INSERT INTO admin_users (email, name, role, created_at, is_active) VALUES
('admin@saigonkitchen.com', 'System Administrator', 'super_admin', NOW(), true)
ON CONFLICT (email) DO NOTHING;

-- Create RLS (Row Level Security) policies
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow public read access to dishes
CREATE POLICY "Allow public read access to dishes" ON dishes FOR SELECT USING (true);

-- Allow authenticated users to read their own customer data
CREATE POLICY "Users can read own customer data" ON customers FOR SELECT USING (auth.uid()::text = id::text);

-- Allow authenticated users to read their own orders
CREATE POLICY "Users can read own orders" ON orders FOR SELECT USING (auth.uid()::text = customer_id::text);

-- Allow service role to do everything (for admin functions)
CREATE POLICY "Service role can do everything on dishes" ON dishes FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything on customers" ON customers FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything on orders" ON orders FOR ALL USING (auth.role() = 'service_role');

-- Create function to update customer stats when order is created/updated
CREATE OR REPLACE FUNCTION update_customer_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE customers 
    SET 
      total_orders = total_orders + 1,
      total_spent = total_spent + NEW.total_amount,
      last_order_at = NEW.created_at
    WHERE id = NEW.customer_id;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    -- If order status changed to delivered, update customer stats
    IF OLD.status != 'delivered' AND NEW.status = 'delivered' THEN
      UPDATE customers 
      SET 
        last_order_at = NEW.updated_at
      WHERE id = NEW.customer_id;
    END IF;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update customer stats
DROP TRIGGER IF EXISTS trigger_update_customer_stats ON orders;
CREATE TRIGGER trigger_update_customer_stats
  AFTER INSERT OR UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_customer_stats();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
DROP TRIGGER IF EXISTS trigger_dishes_updated_at ON dishes;
CREATE TRIGGER trigger_dishes_updated_at
  BEFORE UPDATE ON dishes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_orders_updated_at ON orders;
CREATE TRIGGER trigger_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
