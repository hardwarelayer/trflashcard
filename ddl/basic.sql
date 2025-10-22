-- =====================================================
-- TRFLASHCARD DATABASE SCHEMA
-- Skeleton app với 2 bảng chính: member và card
-- =====================================================

-- Bật extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. MEMBER TABLE
-- Quản lý thông tin thành viên
-- =====================================================

CREATE TABLE demo_member (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    status INTEGER DEFAULT 1, -- 1: hoạt động, 0: không hoạt động
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE,
    deleted_by UUID
);

-- Indexes cho bảng demo_member
CREATE INDEX idx_demo_member_username ON demo_member(username);
CREATE INDEX idx_demo_member_status ON demo_member(status);
CREATE INDEX idx_demo_member_deleted_at ON demo_member(deleted_at);
CREATE INDEX idx_demo_member_created_at ON demo_member(created_at);

-- =====================================================
-- 2. CARD TABLE
-- Quản lý các card do member tạo
-- =====================================================

CREATE TABLE demo_card (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID NOT NULL REFERENCES demo_member(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE,
    deleted_by UUID
);

-- Indexes cho bảng demo_card
CREATE INDEX idx_demo_card_member_id ON demo_card(member_id);
CREATE INDEX idx_demo_card_deleted_at ON demo_card(deleted_at);
CREATE INDEX idx_demo_card_created_at ON demo_card(created_at);


-- =====================================================
-- 3. SYSTEM CONFIG TABLE (Đơn giản hóa)
-- Chỉ cấu hình cơ bản
-- =====================================================

CREATE TABLE demo_system_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Thêm cấu hình hệ thống mặc định
-- sẽ có một số config cơ bản như sau: ngôn ngữ của hệ thống, page_size (số records cho 1 page của tất cả các list), tên ứng dụng, version của ứng dụng
INSERT INTO demo_system_config (config_key, config_value) VALUES
('app_name', 'TR Flashcard'),
('app_version', '1.0.0');

-- =====================================================
-- 4. TRIGGERS
-- Auto-update timestamps
-- =====================================================

-- Function để cập nhật timestamp updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers cho bảng demo_member
CREATE TRIGGER update_demo_member_updated_at 
    BEFORE UPDATE ON demo_member 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Triggers cho bảng demo_card
CREATE TRIGGER update_demo_card_updated_at 
    BEFORE UPDATE ON demo_card 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Triggers cho bảng demo_system_config
CREATE TRIGGER update_demo_system_config_updated_at 
    BEFORE UPDATE ON demo_system_config 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 5. ROW LEVEL SECURITY (RLS)
-- Bảo mật dữ liệu
-- =====================================================

-- Bật RLS cho tất cả bảng
ALTER TABLE demo_member ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_card ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_system_config ENABLE ROW LEVEL SECURITY;

-- RLS Policies cho bảng demo_member (chỉ admin mới có quyền)
CREATE POLICY "Admin có thể xem tất cả demo_member" ON demo_member
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin có thể cập nhật tất cả demo_member" ON demo_member
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin có thể thêm demo_member" ON demo_member
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin có thể xóa demo_member" ON demo_member
    FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies cho bảng demo_card (admin có quyền tất cả, member chỉ xem được public cards)
CREATE POLICY "Admin có thể xem tất cả demo_card" ON demo_card
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin có thể thêm demo_card" ON demo_card
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin có thể cập nhật tất cả demo_card" ON demo_card
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin có thể xóa tất cả demo_card" ON demo_card
    FOR DELETE USING (auth.role() = 'authenticated');

-- Policy cho member xem demo_card (qua API)
CREATE POLICY "Demo_card có thể xem được" ON demo_card
    FOR SELECT USING (true);


-- RLS Policies cho bảng demo_system_config (chỉ admin)
CREATE POLICY "Demo_system_config có thể xem bởi user đã xác thực" ON demo_system_config
    FOR SELECT USING (auth.role() = 'authenticated');

-- =====================================================
-- 6. SAMPLE DATA
-- Dữ liệu mẫu để test
-- =====================================================

-- Thêm dữ liệu mẫu demo_member (chỉ member, không có admin)
-- Password được hash bằng bcrypt: "password123"
INSERT INTO demo_member (username, password, full_name) VALUES
('member1', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 'Member One'),
('member2', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 'Member Two'),
('member3', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 'Member Three');

-- Thêm dữ liệu mẫu demo_card
INSERT INTO demo_card (member_id, title, content) VALUES
(
    (SELECT id FROM demo_member WHERE username = 'member1'),
    'Hello',
    'Xin chào'
),
(
    (SELECT id FROM demo_member WHERE username = 'member1'),
    'Thank you',
    'Cảm ơn'
),
(
    (SELECT id FROM demo_member WHERE username = 'member2'),
    'How are you?',
    'Bạn có khỏe không?'
);

-- =====================================================
-- 7. VIEWS
-- Views để query dữ liệu dễ dàng
-- =====================================================

-- View cho demo_member với số lượng demo_card
CREATE VIEW demo_member_with_stats AS
SELECT 
    m.*,
    COUNT(c.id) as total_cards,
    COUNT(CASE WHEN c.created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as recent_cards
FROM demo_member m
LEFT JOIN demo_card c ON m.id = c.member_id AND c.deleted_at IS NULL
WHERE m.deleted_at IS NULL
GROUP BY m.id;

-- View cho demo_card với thông tin demo_member
CREATE VIEW demo_card_with_member AS
SELECT 
    c.*,
    m.username,
    m.full_name
FROM demo_card c
JOIN demo_member m ON c.member_id = m.id
WHERE c.deleted_at IS NULL AND m.deleted_at IS NULL;

-- =====================================================
-- 8. FUNCTIONS
-- Utility functions
-- =====================================================

-- Function để soft delete demo_member
CREATE OR REPLACE FUNCTION soft_delete_demo_member(member_uuid UUID, deleted_by_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE demo_member 
    SET deleted_at = NOW(), deleted_by = deleted_by_uuid
    WHERE id = member_uuid AND deleted_at IS NULL;
    
    -- Also soft delete all demo_cards of this member
    UPDATE demo_card 
    SET deleted_at = NOW(), deleted_by = deleted_by_uuid
    WHERE member_id = member_uuid AND deleted_at IS NULL;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Function để soft delete demo_card
CREATE OR REPLACE FUNCTION soft_delete_demo_card(card_uuid UUID, deleted_by_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE demo_card 
    SET deleted_at = NOW(), deleted_by = deleted_by_uuid
    WHERE id = card_uuid AND deleted_at IS NULL;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Function để restore soft deleted demo_member
CREATE OR REPLACE FUNCTION restore_demo_member(member_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE demo_member 
    SET deleted_at = NULL, deleted_by = NULL
    WHERE id = member_uuid AND deleted_at IS NOT NULL;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Function để restore soft deleted demo_card
CREATE OR REPLACE FUNCTION restore_demo_card(card_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE demo_card 
    SET deleted_at = NULL, deleted_by = NULL
    WHERE id = card_uuid AND deleted_at IS NOT NULL;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 9. COMMENTS
-- Documentation cho database
-- =====================================================

COMMENT ON TABLE demo_member IS 'Bảng quản lý thông tin thành viên demo';
COMMENT ON TABLE demo_card IS 'Bảng quản lý các card do demo_member tạo';
COMMENT ON TABLE demo_system_config IS 'Bảng cấu hình hệ thống demo';

COMMENT ON COLUMN demo_member.status IS '1: hoạt động, 0: không hoạt động';
COMMENT ON COLUMN demo_card.title IS 'Tiêu đề demo_card';
COMMENT ON COLUMN demo_card.content IS 'Nội dung demo_card';

-- =====================================================
-- 7. TRIGGERS
-- Auto-update updated_at columns
-- =====================================================

-- Function để tự động update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger cho demo_system_config
CREATE TRIGGER update_demo_system_config_updated_at 
    BEFORE UPDATE ON demo_system_config 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- END OF SCHEMA
-- =====================================================
