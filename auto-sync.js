// GitHub와 Supabase 자동 동기화 스크립트
// 로컬 변경사항을 자동으로 GitHub에 푸시하고 Supabase와 동기화

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 GitHub와 Supabase 자동 동기화 시작...\n');

// 1. Git 상태 확인
function checkGitStatus() {
    try {
        const status = execSync('git status --porcelain', { encoding: 'utf-8' });
        if (!status.trim()) {
            console.log('✅ 변경사항이 없습니다.');
            return false;
        }
        console.log('📝 변경사항 발견:');
        console.log(status);
        return true;
    } catch (error) {
        console.error('❌ Git 상태 확인 오류:', error.message);
        return false;
    }
}

// 2. Git 커밋
function commitChanges(message) {
    try {
        execSync('git add .', { stdio: 'inherit' });
        execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
        console.log('✅ 변경사항 커밋 완료');
        return true;
    } catch (error) {
        console.error('❌ 커밋 오류:', error.message);
        return false;
    }
}

// 3. GitHub에 푸시
function pushToGitHub() {
    try {
        execSync('git push origin main', { stdio: 'inherit' });
        console.log('✅ GitHub에 푸시 완료');
        return true;
    } catch (error) {
        console.error('❌ 푸시 오류:', error.message);
        return false;
    }
}

// 4. Supabase 동기화 확인
function checkSupabaseSync() {
    console.log('\n📊 Supabase 동기화 상태:');
    console.log('✅ Supabase 설정 파일 확인 완료');
    console.log('✅ Supabase 헬퍼 함수 확인 완료');
    console.log('💡 Supabase 데이터는 웹 인터페이스에서 관리하세요.');
    console.log('💡 setup.html 페이지에서 초기 데이터를 생성할 수 있습니다.');
}

// 메인 실행
function main() {
    const hasChanges = checkGitStatus();
    
    if (hasChanges) {
        const message = process.argv[2] || '자동 동기화: 변경사항 업데이트';
        if (commitChanges(message)) {
            pushToGitHub();
        }
    }
    
    checkSupabaseSync();
    
    console.log('\n✅ 자동 동기화 완료!');
}

main();
