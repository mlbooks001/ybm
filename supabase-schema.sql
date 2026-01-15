-- YBM FC Supabase 데이터베이스 스키마

-- 1. 회원 테이블
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  registered_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 선수 테이블
CREATE TABLE IF NOT EXISTS players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  number INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 경기 일정 테이블
CREATE TABLE IF NOT EXISTS matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  time TIME NOT NULL,
  home_team VARCHAR(100) NOT NULL,
  away_team VARCHAR(100) NOT NULL,
  venue VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 경기 기록 테이블
CREATE TABLE IF NOT EXISTS match_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  home_team VARCHAR(100) NOT NULL,
  away_team VARCHAR(100) NOT NULL,
  home_score INTEGER NOT NULL DEFAULT 0,
  away_score INTEGER NOT NULL DEFAULT 0,
  result VARCHAR(20) NOT NULL,
  scorers TEXT,
  attendance INTEGER,
  venue VARCHAR(255) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 뉴스 테이블
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 회비 설정 테이블
CREATE TABLE IF NOT EXISTS dues_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  monthly_dues INTEGER NOT NULL DEFAULT 10000,
  year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. 회비 납부 테이블
CREATE TABLE IF NOT EXISTS dues_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  member_username VARCHAR(50) NOT NULL,
  amount INTEGER NOT NULL,
  month VARCHAR(7) NOT NULL,
  payment_date DATE NOT NULL,
  method VARCHAR(50) NOT NULL DEFAULT '현금',
  status VARCHAR(20) NOT NULL DEFAULT '완료',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_players_number ON players(number);
CREATE INDEX IF NOT EXISTS idx_matches_date ON matches(date);
CREATE INDEX IF NOT EXISTS idx_match_records_date ON match_records(date);
CREATE INDEX IF NOT EXISTS idx_news_date ON news(date);
CREATE INDEX IF NOT EXISTS idx_dues_payments_month ON dues_payments(month);
CREATE INDEX IF NOT EXISTS idx_dues_payments_username ON dues_payments(member_username);

-- Row Level Security (RLS) 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE dues_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE dues_payments ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 모든 사용자가 읽기 가능
CREATE POLICY "공개 읽기 - users" ON users FOR SELECT USING (true);
CREATE POLICY "공개 읽기 - players" ON players FOR SELECT USING (true);
CREATE POLICY "공개 읽기 - matches" ON matches FOR SELECT USING (true);
CREATE POLICY "공개 읽기 - match_records" ON match_records FOR SELECT USING (true);
CREATE POLICY "공개 읽기 - news" ON news FOR SELECT USING (true);
CREATE POLICY "공개 읽기 - dues_settings" ON dues_settings FOR SELECT USING (true);
CREATE POLICY "공개 읽기 - dues_payments" ON dues_payments FOR SELECT USING (true);

-- RLS 정책: 회원가입은 누구나 가능
CREATE POLICY "회원가입 허용" ON users FOR INSERT WITH CHECK (true);

-- 관리자 계정 생성 (초기 데이터)
INSERT INTO users (username, name, email, password, registered_date)
VALUES ('admin', '관리자', 'admin@ybmfc.com', 'admin123', NOW())
ON CONFLICT (username) DO NOTHING;

-- 샘플 선수 데이터
INSERT INTO players (number, name, position, description) VALUES
(10, '김민수', '미드필더', '팀의 핵심 플레이메이커'),
(9, '이준호', '포워드', '시즌 최다 득점왕'),
(1, '박지성', '골키퍼', '든든한 마지막 수비수'),
(5, '최동원', '수비수', '강력한 센터백')
ON CONFLICT DO NOTHING;

-- 샘플 경기 일정
INSERT INTO matches (date, time, home_team, away_team, venue) VALUES
('2026-01-15', '19:00', 'YBM FC', '서울 유나이티드', '홈 경기장'),
('2026-01-22', '16:00', '부산 블루스', 'YBM FC', '원정 경기장'),
('2026-02-05', '15:00', 'YBM FC', '대전 드래곤즈', '홈 경기장')
ON CONFLICT DO NOTHING;

-- 샘플 뉴스
INSERT INTO news (date, title, content, images) VALUES
('2026-01-02', '신규 선수 영입 완료', '유망주 정대만 선수가 YBM FC에 합류했습니다. 앞으로의 활약이 기대됩니다.', '[]'::jsonb),
('2025-12-28', '시즌 결산 및 시상식', '2025 시즌을 마무리하며 MVP 및 각종 시상이 진행되었습니다.', '[]'::jsonb),
('2025-12-20', '팬 미팅 이벤트 개최', '선수들과 팬들이 함께하는 특별한 만남의 시간이 마련되었습니다.', '[]'::jsonb)
ON CONFLICT DO NOTHING;
