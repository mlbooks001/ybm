// Supabase 설정 파일
// 프로젝트 생성 후 실제 값으로 변경하세요!

const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_URL', // 예: https://xxxxx.supabase.co
    anonKey: 'YOUR_SUPABASE_ANON_KEY' // 예: eyJhbGc...
};

// Supabase 클라이언트 초기화
let supabase;

// 페이지 로드 시 Supabase 클라이언트 초기화
document.addEventListener('DOMContentLoaded', function() {
    if (typeof supabase === 'undefined' && window.supabase) {
        supabase = window.supabase.createClient(
            SUPABASE_CONFIG.url,
            SUPABASE_CONFIG.anonKey
        );
        console.log('Supabase 클라이언트 초기화 완료');
    }
});

// Storage Bucket 이름
const STORAGE_BUCKET = 'news-images';
