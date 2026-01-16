// Supabase 자동 초기화 스크립트
// 페이지 로드 시 자동으로 테이블 생성 및 데이터 초기화

document.addEventListener('DOMContentLoaded', async function() {
    // Supabase 클라이언트가 로드될 때까지 대기
    const maxWait = 5000; // 최대 5초 대기
    const startTime = Date.now();
    
    while (typeof supabase === 'undefined' && (Date.now() - startTime) < maxWait) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    if (typeof supabase === 'undefined') {
        console.warn('⚠️ Supabase 클라이언트를 찾을 수 없습니다. 자동 초기화를 건너뜁니다.');
        return;
    }
    
    console.log('🚀 Supabase 자동 초기화 시작...');
    
    try {
        // 테이블 존재 여부 확인 및 생성
        await initializeDatabase();
        
        // 초기 데이터 확인 및 삽입
        await initializeData();
        
        console.log('✅ Supabase 자동 초기화 완료!');
    } catch (error) {
        console.error('❌ Supabase 자동 초기화 오류:', error);
    }
});

// 데이터베이스 초기화
async function initializeDatabase() {
    try {
        // users 테이블이 존재하는지 확인
        const { data, error } = await supabase
            .from('users')
            .select('id')
            .limit(1);
        
        // 에러가 발생하면 테이블이 없는 것으로 간주
        if (error && error.code === 'PGRST116') {
            console.log('📋 데이터베이스 테이블을 생성합니다...');
            await createTables();
        } else if (error) {
            console.error('데이터베이스 확인 오류:', error);
        } else {
            console.log('✅ 데이터베이스 테이블이 이미 존재합니다.');
        }
    } catch (error) {
        console.error('데이터베이스 초기화 오류:', error);
    }
}

// 테이블 생성 (SQL Editor에서 실행해야 함)
async function createTables() {
    // 주의: 브라우저에서는 직접 테이블을 생성할 수 없습니다.
    // Supabase SQL Editor에서 supabase-schema.sql을 실행해야 합니다.
    console.warn('⚠️ 테이블 생성은 Supabase SQL Editor에서 수동으로 해야 합니다.');
    console.warn('📝 supabase-schema.sql 파일의 내용을 Supabase SQL Editor에 복사해서 실행하세요.');
}

// 초기 데이터 확인 및 삽입
async function initializeData() {
    try {
        // 관리자 계정 확인
        const { data: adminUser } = await supabase
            .from('users')
            .select('*')
            .eq('username', 'admin')
            .single();
        
        if (!adminUser) {
            console.log('👤 관리자 계정을 생성합니다...');
            await supabase
                .from('users')
                .insert([{
                    username: 'admin',
                    name: '관리자',
                    email: 'admin@ybmfc.com',
                    password: 'admin123',
                    registered_date: new Date().toISOString()
                }]);
            console.log('✅ 관리자 계정 생성 완료');
        }
        
        // 선수 데이터 확인
        const { data: players } = await supabase
            .from('players')
            .select('id')
            .limit(1);
        
        if (!players || players.length === 0) {
            console.log('⚽ 샘플 선수 데이터를 생성합니다...');
            await supabase
                .from('players')
                .insert([
                    { number: 10, name: '김민수', position: '미드필더', description: '팀의 핵심 플레이메이커' },
                    { number: 9, name: '이준호', position: '포워드', description: '시즌 최다 득점왕' },
                    { number: 1, name: '박지성', position: '골키퍼', description: '든든한 마지막 수비수' },
                    { number: 5, name: '최동원', position: '수비수', description: '강력한 센터백' }
                ]);
            console.log('✅ 샘플 선수 데이터 생성 완료');
        }
        
        // 뉴스 데이터 확인
        const { data: news } = await supabase
            .from('news')
            .select('id')
            .limit(1);
        
        if (!news || news.length === 0) {
            console.log('📰 샘플 뉴스 데이터를 생성합니다...');
            await supabase
                .from('news')
                .insert([
                    { 
                        date: '2026-01-02', 
                        title: '신규 선수 영입 완료', 
                        content: '유망주 정대만 선수가 YBM FC에 합류했습니다. 앞으로의 활약이 기대됩니다.', 
                        images: [] 
                    },
                    { 
                        date: '2025-12-28', 
                        title: '시즌 결산 및 시상식', 
                        content: '2025 시즌을 마무리하며 MVP 및 각종 시상이 진행되었습니다.', 
                        images: [] 
                    },
                    { 
                        date: '2025-12-20', 
                        title: '팬 미팅 이벤트 개최', 
                        content: '선수들과 팬들이 함께하는 특별한 만남의 시간이 마련되었습니다.', 
                        images: [] 
                    }
                ]);
            console.log('✅ 샘플 뉴스 데이터 생성 완료');
        }
        
        // 경기 일정 확인
        const { data: matches } = await supabase
            .from('matches')
            .select('id')
            .limit(1);
        
        if (!matches || matches.length === 0) {
            console.log('📅 샘플 경기 일정을 생성합니다...');
            await supabase
                .from('matches')
                .insert([
                    { date: '2026-01-15', time: '19:00', home_team: 'YBM FC', away_team: '서울 유나이티드', venue: '홈 경기장' },
                    { date: '2026-01-22', time: '16:00', home_team: '부산 블루스', away_team: 'YBM FC', venue: '원정 경기장' },
                    { date: '2026-02-05', time: '15:00', home_team: 'YBM FC', away_team: '대전 드래곤즈', venue: '홈 경기장' }
                ]);
            console.log('✅ 샘플 경기 일정 생성 완료');
        }
        
    } catch (error) {
        console.error('초기 데이터 생성 오류:', error);
    }
}
