// Supabase 설정 파일
const SUPABASE_CONFIG = {
    url: 'https://lhpiiakbbwmuiuoyksmz.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxocGlpYWtiYndtdWl1b3lrc216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NTc2MjIsImV4cCI6MjA4NDAzMzYyMn0.WDYEPlwCnNef1eL5XjWzMi06aS85tRG2Z5jhJqk-xW4'
};

// Supabase 클라이언트 초기화
let supabase;

// 페이지 로드 시 Supabase 클라이언트 초기화
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.supabase !== 'undefined') {
        supabase = window.supabase.createClient(
            SUPABASE_CONFIG.url,
            SUPABASE_CONFIG.anonKey
        );
        console.log('✅ Supabase 클라이언트 초기화 완료');
        console.log('Project URL:', SUPABASE_CONFIG.url);
    } else {
        console.error('❌ Supabase 클라이언트를 로드할 수 없습니다.');
    }
});

// Storage Bucket 이름
const STORAGE_BUCKET = 'news-images';
