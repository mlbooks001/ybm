// 관리자 인증 확인
document.addEventListener('DOMContentLoaded', function() {
    checkAdminAccess();
    initializeAdmin();
});

// 관리자 접근 권한 확인
function checkAdminAccess() {
    const user = getCurrentUser();
    
    // 관리자 계정 확인 (admin 아이디만 접근 가능)
    if (!user || user.username !== 'admin') {
        alert('관리자만 접근할 수 있는 페이지입니다.');
        window.location.href = 'index.html';
        return;
    }
    
    // 관리자 이름 표시
    const adminName = document.getElementById('adminName');
    if (adminName) {
        adminName.textContent = user.name + ' 관리자님';
    }
}

// 관리자 로그아웃
const adminLogoutBtn = document.getElementById('adminLogoutBtn');
if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', function() {
        localStorage.removeItem('ybmfc_user');
        sessionStorage.removeItem('ybmfc_user');
        alert('로그아웃되었습니다.');
        window.location.href = 'index.html';
    });
}

// 관리자 페이지 초기화
function initializeAdmin() {
    initializeMenu();
    initializeData();
    loadDashboard();
    loadMembers();
    loadDues();
    loadPlayers();
    loadMatches();
    loadRecords();
    loadNews();
}

// 메뉴 초기화
function initializeMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 모든 메뉴 아이템에서 active 제거
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // 모든 섹션 숨기기
            const sections = document.querySelectorAll('.admin-section');
            sections.forEach(section => section.classList.remove('active'));
            
            // 선택된 섹션 표시
            const sectionId = this.dataset.section + '-section';
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');
            }
        });
    });
}

// 데이터 초기화 (샘플 데이터 생성)
function initializeData() {
    // 관리자 계정이 없으면 생성
    const users = JSON.parse(localStorage.getItem('ybmfc_users') || '[]');
    if (!users.some(u => u.username === 'admin')) {
        users.push({
            name: '관리자',
            username: 'admin',
            email: 'admin@ybmfc.com',
            password: 'admin123',
            registeredDate: new Date().toISOString()
        });
        localStorage.setItem('ybmfc_users', JSON.stringify(users));
    }
    
    // 선수 데이터가 없으면 샘플 생성
    if (!localStorage.getItem('ybmfc_players')) {
        const samplePlayers = [
            { number: 10, name: '김민수', position: '미드필더', desc: '팀의 핵심 플레이메이커' },
            { number: 9, name: '이준호', position: '포워드', desc: '시즌 최다 득점왕' },
            { number: 1, name: '박지성', position: '골키퍼', desc: '든든한 마지막 수비수' },
            { number: 5, name: '최동원', position: '수비수', desc: '강력한 센터백' }
        ];
        localStorage.setItem('ybmfc_players', JSON.stringify(samplePlayers));
    }
    
    // 경기 일정이 없으면 샘플 생성
    if (!localStorage.getItem('ybmfc_matches')) {
        const sampleMatches = [
            { date: '2026-01-15', time: '19:00', homeTeam: 'YBM FC', awayTeam: '서울 유나이티드', venue: '홈 경기장' },
            { date: '2026-01-22', time: '16:00', homeTeam: '부산 블루스', awayTeam: 'YBM FC', venue: '원정 경기장' },
            { date: '2026-02-05', time: '15:00', homeTeam: 'YBM FC', awayTeam: '대전 드래곤즈', venue: '홈 경기장' }
        ];
        localStorage.setItem('ybmfc_matches', JSON.stringify(sampleMatches));
    }
    
    // 뉴스가 없으면 샘플 생성
    if (!localStorage.getItem('ybmfc_news')) {
        const sampleNews = [
            { date: '2026-01-02', title: '신규 선수 영입 완료', content: '유망주 정대만 선수가 YBM FC에 합류했습니다. 앞으로의 활약이 기대됩니다.', images: [] },
            { date: '2025-12-28', title: '시즌 결산 및 시상식', content: '2025 시즌을 마무리하며 MVP 및 각종 시상이 진행되었습니다.', images: [] },
            { date: '2025-12-20', title: '팬 미팅 이벤트 개최', content: '선수들과 팬들이 함께하는 특별한 만남의 시간이 마련되었습니다.', images: [] }
        ];
        localStorage.setItem('ybmfc_news', JSON.stringify(sampleNews));
    }
    
    // 경기 기록이 없으면 샘플 생성
    if (!localStorage.getItem('ybmfc_records')) {
        const sampleRecords = [
            { date: '2025-12-15', homeTeam: 'YBM FC', awayTeam: '서울 유나이티드', homeScore: 3, awayScore: 1, result: '승리', scorers: '김민수(2), 이준호(1)', attendance: 12000, venue: '홈 경기장', notes: '시즌 마지막 홈 경기 대승' },
            { date: '2025-12-08', homeTeam: '부산 블루스', awayTeam: 'YBM FC', homeScore: 2, awayScore: 2, result: '무승부', scorers: '김민수(1), 최동원(1)', attendance: 8500, venue: '원정 경기장', notes: '극적인 동점골로 무승부' },
            { date: '2025-12-01', homeTeam: 'YBM FC', awayTeam: '대전 드래곤즈', homeScore: 2, awayScore: 0, result: '승리', scorers: '이준호(2)', attendance: 15000, venue: '홈 경기장', notes: '이준호 선수의 멀티골' }
        ];
        localStorage.setItem('ybmfc_records', JSON.stringify(sampleRecords));
    }
}

// 대시보드 로드
function loadDashboard() {
    const users = JSON.parse(localStorage.getItem('ybmfc_users') || '[]');
    const players = JSON.parse(localStorage.getItem('ybmfc_players') || '[]');
    const matches = JSON.parse(localStorage.getItem('ybmfc_matches') || '[]');
    const news = JSON.parse(localStorage.getItem('ybmfc_news') || '[]');
    const records = JSON.parse(localStorage.getItem('ybmfc_records') || '[]');
    
    document.getElementById('totalMembers').textContent = users.length;
    document.getElementById('totalPlayers').textContent = players.length;
    document.getElementById('totalMatches').textContent = matches.length;
    document.getElementById('totalRecords').textContent = records.length;
    document.getElementById('totalNews').textContent = news.length;
    
    // 승률 계산
    if (records.length > 0) {
        const wins = records.filter(r => r.result === '승리').length;
        const winRate = ((wins / records.length) * 100).toFixed(1);
        document.getElementById('winRate').textContent = winRate + '%';
    } else {
        document.getElementById('winRate').textContent = '0%';
    }
}

// 회원 관리 로드
async function loadMembers() {
    const tbody = document.getElementById('membersTableBody');
    
    // Supabase에서 회원 데이터 가져오기 시도
    let users = [];
    try {
        if (typeof supabase !== 'undefined' && supabase) {
            const { data, error } = await supabase.from('users').select('*').order('registered_date', { ascending: false });
            if (!error && data) {
                users = data.map(user => ({
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    registeredDate: user.registered_date
                }));
            }
        }
    } catch (e) {
        console.log('Supabase 로드 실패, LocalStorage 사용');
    }
    
    // Supabase에서 가져오지 못한 경우 LocalStorage 사용
    if (users.length === 0) {
        users = JSON.parse(localStorage.getItem('ybmfc_users') || '[]');
    }
    
    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">회원이 없습니다.</td></tr>';
        return;
    }
    
    tbody.innerHTML = users.map((user, index) => {
        const date = new Date(user.registeredDate).toLocaleDateString('ko-KR');
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${date}</td>
                <td>
                    ${user.username !== 'admin' ? 
                        `<button class="btn-delete" onclick="deleteMember('${user.username}')">삭제</button>` : 
                        '<span style="color: #3b82f6;">관리자</span>'}
                </td>
            </tr>
        `;
    }).join('');
}

// 회원 추가 폼 표시
function showAddMemberForm() {
    document.getElementById('memberFormContainer').style.display = 'block';
    document.getElementById('memberFormTitle').textContent = '회원 추가';
    document.getElementById('memberForm').reset();
    document.getElementById('memberForm').setAttribute('data-mode', 'add');
}

// 회원 폼 숨기기
function hideMemberForm() {
    document.getElementById('memberFormContainer').style.display = 'none';
    document.getElementById('memberForm').reset();
}

// 회원 추가/수정 폼 제출
document.addEventListener('DOMContentLoaded', function() {
    const memberForm = document.getElementById('memberForm');
    if (memberForm) {
        memberForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('memberName').value.trim();
            const username = document.getElementById('memberUsername').value.trim();
            const email = document.getElementById('memberEmail').value.trim();
            const password = document.getElementById('memberPassword').value;
            
            // 입력 검증
            if (!name || !username || !email || !password) {
                alert('모든 필드를 입력해주세요.');
                return;
            }
            
            // 아이디 길이 검증
            if (username.length < 4) {
                alert('아이디는 4자 이상이어야 합니다.');
                return;
            }
            
            // 비밀번호 길이 검증
            if (password.length < 6) {
                alert('비밀번호는 6자 이상이어야 합니다.');
                return;
            }
            
            // 이메일 형식 검증
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('올바른 이메일 형식을 입력해주세요.');
                return;
            }
            
            // Supabase에서 중복 확인 시도
            let duplicateCheck = false;
            try {
                if (typeof supabase !== 'undefined' && supabase) {
                    // 아이디 중복 확인
                    const { data: existingUsername } = await supabase
                        .from('users')
                        .select('username')
                        .eq('username', username)
                        .single();
                    
                    if (existingUsername) {
                        alert('이미 사용 중인 아이디입니다.');
                        return;
                    }
                    
                    // 이메일 중복 확인
                    const { data: existingEmail } = await supabase
                        .from('users')
                        .select('email')
                        .eq('email', email)
                        .single();
                    
                    if (existingEmail) {
                        alert('이미 사용 중인 이메일입니다.');
                        return;
                    }
                    
                    duplicateCheck = true;
                }
            } catch (e) {
                console.log('Supabase 중복 확인 실패, LocalStorage에서 확인:', e);
            }
            
            // LocalStorage에서 중복 확인
            const existingUsers = JSON.parse(localStorage.getItem('ybmfc_users') || '[]');
            if (existingUsers.some(u => u.username === username)) {
                alert('이미 사용 중인 아이디입니다.');
                return;
            }
            if (existingUsers.some(u => u.email === email)) {
                alert('이미 사용 중인 이메일입니다.');
                return;
            }
            
            // Supabase에 추가 시도
            try {
                if (typeof supabase !== 'undefined' && supabase && duplicateCheck) {
                    const { data, error } = await supabase.from('users').insert([{
                        name: name,
                        username: username,
                        email: email,
                        password: password,
                        registered_date: new Date().toISOString()
                    }]).select();
                    
                    if (!error && data && data.length > 0) {
                        alert('회원이 추가되었습니다.');
                        hideMemberForm();
                        loadMembers();
                        loadDashboard();
                        return;
                    } else {
                        console.log('Supabase 추가 실패:', error);
                        // 에러가 있어도 LocalStorage에 추가
                    }
                }
            } catch (e) {
                console.log('Supabase 추가 오류, LocalStorage 사용:', e);
            }
            
            // LocalStorage에 추가
            const newUser = {
                name: name,
                username: username,
                email: email,
                password: password,
                registeredDate: new Date().toISOString()
            };
            
            existingUsers.push(newUser);
            localStorage.setItem('ybmfc_users', JSON.stringify(existingUsers));
            
            alert('회원이 추가되었습니다.');
            hideMemberForm();
            loadMembers();
            loadDashboard();
        });
    }
});

// 회원 삭제
async function deleteMember(username) {
    if (!confirm('정말 이 회원을 삭제하시겠습니까?')) return;
    
    // Supabase에서 삭제 시도
    try {
        if (typeof supabase !== 'undefined' && supabase) {
            const { error } = await supabase.from('users').delete().eq('username', username);
            if (!error) {
                alert('회원이 삭제되었습니다.');
                loadMembers();
                loadDashboard();
                return;
            } else {
                console.log('Supabase 삭제 실패:', error);
            }
        }
    } catch (e) {
        console.log('Supabase 오류, LocalStorage 사용:', e);
    }
    
    // LocalStorage에서 삭제
    const users = JSON.parse(localStorage.getItem('ybmfc_users') || '[]');
    const filteredUsers = users.filter(u => u.username !== username);
    localStorage.setItem('ybmfc_users', JSON.stringify(filteredUsers));
    
    loadMembers();
    loadDashboard();
    alert('회원이 삭제되었습니다.');
}

// 선수 관리 로드
function loadPlayers() {
    const players = JSON.parse(localStorage.getItem('ybmfc_players') || '[]');
    const tbody = document.getElementById('playersTableBody');
    
    if (players.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="no-data">선수가 없습니다.</td></tr>';
        return;
    }
    
    tbody.innerHTML = players.map((player, index) => `
        <tr>
            <td>${player.number}</td>
            <td>${player.name}</td>
            <td>${player.position}</td>
            <td>${player.desc || '-'}</td>
            <td>
                <button class="btn-edit" onclick="editPlayer(${index})">수정</button>
                <button class="btn-delete" onclick="deletePlayer(${index})">삭제</button>
            </td>
        </tr>
    `).join('');
}

// 선수 추가 폼 표시
function showAddPlayerForm() {
    document.getElementById('playerFormContainer').style.display = 'block';
    document.getElementById('playerFormTitle').textContent = '선수 추가';
    document.getElementById('playerForm').reset();
    document.getElementById('playerEditIndex').value = '';
}

// 선수 폼 숨기기
function hidePlayerForm() {
    document.getElementById('playerFormContainer').style.display = 'none';
    document.getElementById('playerForm').reset();
}

// 선수 폼 제출
document.getElementById('playerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const players = JSON.parse(localStorage.getItem('ybmfc_players') || '[]');
    const editIndex = document.getElementById('playerEditIndex').value;
    
    const playerData = {
        number: parseInt(document.getElementById('playerNumber').value),
        name: document.getElementById('playerName').value,
        position: document.getElementById('playerPosition').value,
        desc: document.getElementById('playerDesc').value
    };
    
    if (editIndex !== '') {
        // 수정
        players[editIndex] = playerData;
        alert('선수 정보가 수정되었습니다.');
    } else {
        // 추가
        players.push(playerData);
        alert('선수가 추가되었습니다.');
    }
    
    localStorage.setItem('ybmfc_players', JSON.stringify(players));
    loadPlayers();
    loadDashboard();
    hidePlayerForm();
});

// 선수 수정
function editPlayer(index) {
    const players = JSON.parse(localStorage.getItem('ybmfc_players') || '[]');
    const player = players[index];
    
    document.getElementById('playerFormContainer').style.display = 'block';
    document.getElementById('playerFormTitle').textContent = '선수 수정';
    document.getElementById('playerEditIndex').value = index;
    document.getElementById('playerNumber').value = player.number;
    document.getElementById('playerName').value = player.name;
    document.getElementById('playerPosition').value = player.position;
    document.getElementById('playerDesc').value = player.desc || '';
}

// 선수 삭제
function deletePlayer(index) {
    if (!confirm('정말 이 선수를 삭제하시겠습니까?')) return;
    
    const players = JSON.parse(localStorage.getItem('ybmfc_players') || '[]');
    players.splice(index, 1);
    localStorage.setItem('ybmfc_players', JSON.stringify(players));
    
    loadPlayers();
    loadDashboard();
    alert('선수가 삭제되었습니다.');
}

// 경기 일정 로드
function loadMatches() {
    const matches = JSON.parse(localStorage.getItem('ybmfc_matches') || '[]');
    const tbody = document.getElementById('matchesTableBody');
    
    if (matches.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">경기 일정이 없습니다.</td></tr>';
        return;
    }
    
    tbody.innerHTML = matches.map((match, index) => `
        <tr>
            <td>${match.date}</td>
            <td>${match.time}</td>
            <td>${match.homeTeam}</td>
            <td>${match.awayTeam}</td>
            <td>${match.venue}</td>
            <td>
                <button class="btn-edit" onclick="editMatch(${index})">수정</button>
                <button class="btn-delete" onclick="deleteMatch(${index})">삭제</button>
            </td>
        </tr>
    `).join('');
}

// 경기 추가 폼 표시
function showAddMatchForm() {
    document.getElementById('matchFormContainer').style.display = 'block';
    document.getElementById('matchFormTitle').textContent = '경기 추가';
    document.getElementById('matchForm').reset();
    document.getElementById('matchEditIndex').value = '';
}

// 경기 폼 숨기기
function hideMatchForm() {
    document.getElementById('matchFormContainer').style.display = 'none';
    document.getElementById('matchForm').reset();
}

// 경기 폼 제출
document.getElementById('matchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const matches = JSON.parse(localStorage.getItem('ybmfc_matches') || '[]');
    const editIndex = document.getElementById('matchEditIndex').value;
    
    const matchData = {
        date: document.getElementById('matchDate').value,
        time: document.getElementById('matchTime').value,
        homeTeam: document.getElementById('homeTeam').value,
        awayTeam: document.getElementById('awayTeam').value,
        venue: document.getElementById('matchVenue').value
    };
    
    if (editIndex !== '') {
        // 수정
        matches[editIndex] = matchData;
        alert('경기 정보가 수정되었습니다.');
    } else {
        // 추가
        matches.push(matchData);
        alert('경기가 추가되었습니다.');
    }
    
    localStorage.setItem('ybmfc_matches', JSON.stringify(matches));
    loadMatches();
    loadDashboard();
    hideMatchForm();
});

// 경기 수정
function editMatch(index) {
    const matches = JSON.parse(localStorage.getItem('ybmfc_matches') || '[]');
    const match = matches[index];
    
    document.getElementById('matchFormContainer').style.display = 'block';
    document.getElementById('matchFormTitle').textContent = '경기 수정';
    document.getElementById('matchEditIndex').value = index;
    document.getElementById('matchDate').value = match.date;
    document.getElementById('matchTime').value = match.time;
    document.getElementById('homeTeam').value = match.homeTeam;
    document.getElementById('awayTeam').value = match.awayTeam;
    document.getElementById('matchVenue').value = match.venue;
}

// 경기 삭제
function deleteMatch(index) {
    if (!confirm('정말 이 경기를 삭제하시겠습니까?')) return;
    
    const matches = JSON.parse(localStorage.getItem('ybmfc_matches') || '[]');
    matches.splice(index, 1);
    localStorage.setItem('ybmfc_matches', JSON.stringify(matches));
    
    loadMatches();
    loadDashboard();
    alert('경기가 삭제되었습니다.');
}

// 뉴스 로드
function loadNews() {
    const news = JSON.parse(localStorage.getItem('ybmfc_news') || '[]');
    const tbody = document.getElementById('newsTableBody');
    
    if (news.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="no-data">뉴스가 없습니다.</td></tr>';
        return;
    }
    
    tbody.innerHTML = news.map((item, index) => {
        let imageThumb = '-';
        if (item.images && item.images.length > 0) {
            imageThumb = `<div class="news-thumb-container">
                <img src="${item.images[0]}" alt="뉴스 이미지" class="news-thumb" onclick="viewNewsImages(${index})">
                ${item.images.length > 1 ? `<span class="image-count">+${item.images.length - 1}</span>` : ''}
            </div>`;
        }
        
        return `
            <tr>
                <td>${item.date}</td>
                <td>${imageThumb}</td>
                <td>${item.title}</td>
                <td>${item.content.substring(0, 50)}${item.content.length > 50 ? '...' : ''}</td>
                <td>
                    <button class="btn-edit" onclick="editNews(${index})">수정</button>
                    <button class="btn-delete" onclick="deleteNews(${index})">삭제</button>
                </td>
            </tr>
        `;
    }).join('');
}

// 뉴스 이미지 임시 저장
let tempNewsImages = [];

// 뉴스 추가 폼 표시
function showAddNewsForm() {
    document.getElementById('newsFormContainer').style.display = 'block';
    document.getElementById('newsFormTitle').textContent = '뉴스 추가';
    document.getElementById('newsForm').reset();
    document.getElementById('newsEditIndex').value = '';
    tempNewsImages = [];
    document.getElementById('newsImagePreview').innerHTML = '';
}

// 뉴스 폼 숨기기
function hideNewsForm() {
    document.getElementById('newsFormContainer').style.display = 'none';
    document.getElementById('newsForm').reset();
    tempNewsImages = [];
    document.getElementById('newsImagePreview').innerHTML = '';
}

// 이미지 압축 함수
function compressImage(file, maxWidth = 1200, quality = 0.8) {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            reject('이미지 파일이 아닙니다.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                // 최대 너비 제한
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // JPEG로 압축 (quality: 0.8 = 80% 품질)
                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                
                // 압축 결과 로그
                const originalSize = (e.target.result.length * 3 / 4 / 1024).toFixed(2);
                const compressedSize = (compressedDataUrl.length * 3 / 4 / 1024).toFixed(2);
                console.log(`이미지 압축: ${originalSize}KB → ${compressedSize}KB (${((1 - compressedSize/originalSize) * 100).toFixed(1)}% 감소)`);
                
                resolve(compressedDataUrl);
            };
            img.onerror = function() {
                reject('이미지 로드 실패');
            };
            img.src = e.target.result;
        };
        reader.onerror = function() {
            reject('파일 읽기 실패');
        };
        reader.readAsDataURL(file);
    });
}

// 뉴스 이미지 업로드 처리
async function handleNewsImageUpload(event) {
    const files = event.target.files;
    const maxFiles = 3; // LocalStorage 용량 절약을 위해 3장으로 제한
    const maxSize = 10 * 1024 * 1024; // 10MB (원본 파일 크기 제한)
    
    if (tempNewsImages.length + files.length > maxFiles) {
        alert(`최대 ${maxFiles}장까지만 업로드 가능합니다.`);
        return;
    }
    
    for (const file of Array.from(files)) {
        if (file.size > maxSize) {
            alert(`${file.name}은(는) 10MB를 초과합니다.`);
            continue;
        }
        
        if (!file.type.startsWith('image/')) {
            alert(`${file.name}은(는) 이미지 파일이 아닙니다.`);
            continue;
        }
        
        try {
            // 이미지 압축 (최대 너비 1200px, 품질 80%)
            const compressedImage = await compressImage(file, 1200, 0.8);
            tempNewsImages.push(compressedImage);
            displayNewsImagePreviews();
        } catch (error) {
            console.error('이미지 압축 실패:', error);
            alert(`${file.name} 처리 중 오류가 발생했습니다.`);
        }
    }
    
    // 파일 input 초기화
    event.target.value = '';
}

// 뉴스 이미지 미리보기 표시
function displayNewsImagePreviews() {
    const container = document.getElementById('newsImagePreview');
    container.innerHTML = tempNewsImages.map((img, index) => `
        <div class="image-preview-item">
            <img src="${img}" alt="미리보기 ${index + 1}">
            <button type="button" class="btn-remove-image" onclick="removeNewsImage(${index})">&times;</button>
        </div>
    `).join('');
}

// 뉴스 이미지 제거
function removeNewsImage(index) {
    tempNewsImages.splice(index, 1);
    displayNewsImagePreviews();
}

// 뉴스 이미지 전체보기
function viewNewsImages(index) {
    const news = JSON.parse(localStorage.getItem('ybmfc_news') || '[]');
    const item = news[index];
    
    if (!item.images || item.images.length === 0) return;
    
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="image-modal-content">
            <span class="image-modal-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h3>${item.title}</h3>
            <div class="image-modal-gallery">
                ${item.images.map((img, i) => `
                    <img src="${img}" alt="이미지 ${i + 1}" class="modal-gallery-image">
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // 모달 외부 클릭시 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// 뉴스 폼 제출
document.getElementById('newsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const news = JSON.parse(localStorage.getItem('ybmfc_news') || '[]');
    const editIndex = document.getElementById('newsEditIndex').value;
    
    const newsData = {
        date: document.getElementById('newsDate').value,
        title: document.getElementById('newsTitle').value,
        content: document.getElementById('newsContent').value,
        images: tempNewsImages.length > 0 ? [...tempNewsImages] : []
    };
    
    if (editIndex !== '') {
        // 수정 - 기존 이미지 유지하면서 새 이미지 추가
        const existingImages = news[editIndex].images || [];
        newsData.images = tempNewsImages.length > 0 ? [...tempNewsImages] : existingImages;
        news[editIndex] = newsData;
        alert('뉴스가 수정되었습니다.');
    } else {
        // 추가
        news.push(newsData);
        alert('뉴스가 추가되었습니다.');
    }
    
    localStorage.setItem('ybmfc_news', JSON.stringify(news));
    loadNews();
    loadDashboard();
    hideNewsForm();
});

// 뉴스 수정
function editNews(index) {
    const news = JSON.parse(localStorage.getItem('ybmfc_news') || '[]');
    const item = news[index];
    
    document.getElementById('newsFormContainer').style.display = 'block';
    document.getElementById('newsFormTitle').textContent = '뉴스 수정';
    document.getElementById('newsEditIndex').value = index;
    document.getElementById('newsDate').value = item.date;
    document.getElementById('newsTitle').value = item.title;
    document.getElementById('newsContent').value = item.content;
    
    // 기존 이미지 로드
    tempNewsImages = item.images ? [...item.images] : [];
    displayNewsImagePreviews();
}

// 뉴스 삭제
function deleteNews(index) {
    if (!confirm('정말 이 뉴스를 삭제하시겠습니까?')) return;
    
    const news = JSON.parse(localStorage.getItem('ybmfc_news') || '[]');
    news.splice(index, 1);
    localStorage.setItem('ybmfc_news', JSON.stringify(news));
    
    loadNews();
    loadDashboard();
    alert('뉴스가 삭제되었습니다.');
}

// ========== 경기 기록 관리 ==========

// 경기 기록 로드
function loadRecords() {
    const records = JSON.parse(localStorage.getItem('ybmfc_records') || '[]');
    const tbody = document.getElementById('recordsTableBody');
    
    if (records.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="no-data">경기 기록이 없습니다.</td></tr>';
        return;
    }
    
    // 날짜순 정렬 (최신순)
    records.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    tbody.innerHTML = records.map((record, index) => {
        const resultClass = record.result === '승리' ? 'result-win' : 
                           record.result === '무승부' ? 'result-draw' : 'result-lose';
        
        return `
            <tr>
                <td>${record.date}</td>
                <td>${record.homeTeam} vs ${record.awayTeam}</td>
                <td><strong>${record.homeScore} : ${record.awayScore}</strong></td>
                <td><span class="result-badge ${resultClass}">${record.result}</span></td>
                <td>${record.scorers || '-'}</td>
                <td>${record.attendance ? record.attendance.toLocaleString() + '명' : '-'}</td>
                <td>${record.venue}</td>
                <td>
                    <button class="btn-edit" onclick="editRecord(${index})">수정</button>
                    <button class="btn-delete" onclick="deleteRecord(${index})">삭제</button>
                </td>
            </tr>
        `;
    }).join('');
}

// 경기 기록 추가 폼 표시
function showAddRecordForm() {
    document.getElementById('recordFormContainer').style.display = 'block';
    document.getElementById('recordFormTitle').textContent = '경기 기록 추가';
    document.getElementById('recordForm').reset();
    document.getElementById('recordEditIndex').value = '';
}

// 경기 기록 폼 숨기기
function hideRecordForm() {
    document.getElementById('recordFormContainer').style.display = 'none';
    document.getElementById('recordForm').reset();
}

// 경기 결과 자동 계산
function calculateResult(homeTeam, awayTeam, homeScore, awayScore) {
    // YBM FC가 홈팀인 경우
    if (homeTeam === 'YBM FC') {
        if (homeScore > awayScore) return '승리';
        if (homeScore < awayScore) return '패배';
        return '무승부';
    }
    // YBM FC가 원정팀인 경우
    if (awayTeam === 'YBM FC') {
        if (awayScore > homeScore) return '승리';
        if (awayScore < homeScore) return '패배';
        return '무승부';
    }
    return '무승부';
}

// 경기 기록 폼 제출
document.getElementById('recordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const records = JSON.parse(localStorage.getItem('ybmfc_records') || '[]');
    const editIndex = document.getElementById('recordEditIndex').value;
    
    const homeTeam = document.getElementById('recordHomeTeam').value;
    const awayTeam = document.getElementById('recordAwayTeam').value;
    const homeScore = parseInt(document.getElementById('recordHomeScore').value);
    const awayScore = parseInt(document.getElementById('recordAwayScore').value);
    const resultSelect = document.getElementById('recordResult').value;
    
    // 결과 자동 계산 또는 선택한 값 사용
    const result = resultSelect || calculateResult(homeTeam, awayTeam, homeScore, awayScore);
    
    const recordData = {
        date: document.getElementById('recordDate').value,
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        homeScore: homeScore,
        awayScore: awayScore,
        result: result,
        scorers: document.getElementById('recordScorers').value,
        attendance: document.getElementById('recordAttendance').value ? 
                   parseInt(document.getElementById('recordAttendance').value) : null,
        venue: document.getElementById('recordVenue').value,
        notes: document.getElementById('recordNotes').value
    };
    
    if (editIndex !== '') {
        // 수정
        records[editIndex] = recordData;
        alert('경기 기록이 수정되었습니다.');
    } else {
        // 추가
        records.push(recordData);
        alert('경기 기록이 추가되었습니다.');
    }
    
    localStorage.setItem('ybmfc_records', JSON.stringify(records));
    loadRecords();
    loadDashboard();
    hideRecordForm();
});

// 경기 기록 수정
function editRecord(index) {
    const records = JSON.parse(localStorage.getItem('ybmfc_records') || '[]');
    const record = records[index];
    
    document.getElementById('recordFormContainer').style.display = 'block';
    document.getElementById('recordFormTitle').textContent = '경기 기록 수정';
    document.getElementById('recordEditIndex').value = index;
    document.getElementById('recordDate').value = record.date;
    document.getElementById('recordHomeTeam').value = record.homeTeam;
    document.getElementById('recordAwayTeam').value = record.awayTeam;
    document.getElementById('recordHomeScore').value = record.homeScore;
    document.getElementById('recordAwayScore').value = record.awayScore;
    document.getElementById('recordResult').value = record.result;
    document.getElementById('recordScorers').value = record.scorers || '';
    document.getElementById('recordAttendance').value = record.attendance || '';
    document.getElementById('recordVenue').value = record.venue;
    document.getElementById('recordNotes').value = record.notes || '';
}

// 경기 기록 삭제
function deleteRecord(index) {
    if (!confirm('정말 이 경기 기록을 삭제하시겠습니까?')) return;
    
    const records = JSON.parse(localStorage.getItem('ybmfc_records') || '[]');
    records.splice(index, 1);
    localStorage.setItem('ybmfc_records', JSON.stringify(records));
    
    loadRecords();
    loadDashboard();
    alert('경기 기록이 삭제되었습니다.');
}

// ========== 회비 관리 ==========

// 회비 설정 초기화
function initializeDuesSetting() {
    if (!localStorage.getItem('ybmfc_dues_setting')) {
        const defaultSetting = {
            monthlyDues: 10000,
            year: 2026
        };
        localStorage.setItem('ybmfc_dues_setting', JSON.stringify(defaultSetting));
    }
}

// 회비 관리 로드
function loadDues() {
    initializeDuesSetting();
    loadDuesTable();
    loadDuesStats();
    loadMemberSelectOptions();
    
    // 현재 월로 필터 초기화
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    const monthFilter = document.getElementById('duesMonthFilter');
    if (monthFilter) {
        monthFilter.value = currentMonth;
    }
}

// 회원 선택 옵션 로드
function loadMemberSelectOptions() {
    const users = JSON.parse(localStorage.getItem('ybmfc_users') || '[]');
    const select = document.getElementById('duesMember');
    
    if (!select) return;
    
    select.innerHTML = '<option value="">회원을 선택하세요</option>';
    users.forEach(user => {
        if (user.username !== 'admin') {
            select.innerHTML += `<option value="${user.username}">${user.name} (${user.username})</option>`;
        }
    });
}

// 회비 통계 로드
function loadDuesStats() {
    const dues = JSON.parse(localStorage.getItem('ybmfc_dues') || '[]');
    const users = JSON.parse(localStorage.getItem('ybmfc_users') || '[]');
    const setting = JSON.parse(localStorage.getItem('ybmfc_dues_setting') || '{"monthlyDues": 10000}');
    
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    
    // 이번 달 납부한 회원
    const paidThisMonth = dues.filter(d => d.month === currentMonth);
    const totalMembers = users.filter(u => u.username !== 'admin').length;
    const paidCount = new Set(paidThisMonth.map(d => d.memberUsername)).size;
    const unpaidCount = totalMembers - paidCount;
    
    // 납부율 계산
    const rate = totalMembers > 0 ? ((paidCount / totalMembers) * 100).toFixed(1) : 0;
    
    // 총 납부 금액 (전체)
    const totalAmount = dues.reduce((sum, d) => sum + d.amount, 0);
    
    // UI 업데이트
    document.getElementById('currentMonthRate').textContent = rate + '%';
    document.getElementById('totalDuesAmount').textContent = totalAmount.toLocaleString() + '원';
    document.getElementById('unpaidMembers').textContent = unpaidCount + '명';
    document.getElementById('currentDuesAmount').textContent = setting.monthlyDues.toLocaleString() + '원';
}

// 회비 테이블 로드
function loadDuesTable(filter = 'all', monthFilter = null) {
    const dues = JSON.parse(localStorage.getItem('ybmfc_dues') || '[]');
    const users = JSON.parse(localStorage.getItem('ybmfc_users') || '[]');
    const tbody = document.getElementById('duesTableBody');
    
    if (!monthFilter) {
        const monthFilterInput = document.getElementById('duesMonthFilter');
        monthFilter = monthFilterInput ? monthFilterInput.value : null;
    }
    
    let filteredDues = dues;
    
    // 월 필터
    if (monthFilter) {
        filteredDues = filteredDues.filter(d => d.month === monthFilter);
    }
    
    // 상태 필터
    if (filter === 'paid') {
        filteredDues = filteredDues.filter(d => d.status === '완료');
    } else if (filter === 'unpaid') {
        // 미납 회원 표시를 위해 별도 처리
        const now = new Date();
        const currentMonth = monthFilter || now.toISOString().slice(0, 7);
        const paidMembers = dues.filter(d => d.month === currentMonth).map(d => d.memberUsername);
        const unpaidUsers = users.filter(u => u.username !== 'admin' && !paidMembers.includes(u.username));
        
        tbody.innerHTML = unpaidUsers.map(user => `
            <tr class="unpaid-row">
                <td>${user.name}</td>
                <td>${currentMonth}</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td><span class="status-badge status-unpaid">미납</span></td>
                <td>납부 필요</td>
                <td>
                    <button class="btn-edit" onclick="quickAddDues('${user.username}', '${user.name}')">납부 등록</button>
                </td>
            </tr>
        `).join('');
        
        if (unpaidUsers.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="no-data">미납 회원이 없습니다.</td></tr>';
        }
        return;
    }
    
    if (filteredDues.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="no-data">회비 납부 기록이 없습니다.</td></tr>';
        return;
    }
    
    // 날짜순 정렬 (최신순)
    filteredDues.sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate));
    
    tbody.innerHTML = filteredDues.map((due, index) => {
        const user = users.find(u => u.username === due.memberUsername);
        const memberName = user ? user.name : due.memberUsername;
        
        return `
            <tr>
                <td>${memberName}</td>
                <td>${due.month}</td>
                <td><strong>${due.amount.toLocaleString()}원</strong></td>
                <td>${due.paymentDate}</td>
                <td>${due.method}</td>
                <td><span class="status-badge status-paid">완료</span></td>
                <td>${due.notes || '-'}</td>
                <td>
                    <button class="btn-edit" onclick="editDues(${index})">수정</button>
                    <button class="btn-delete" onclick="deleteDues(${index})">삭제</button>
                </td>
            </tr>
        `;
    }).join('');
}

// 회비 필터
function filterDues() {
    const filter = document.getElementById('duesFilter').value;
    const monthFilter = document.getElementById('duesMonthFilter').value;
    loadDuesTable(filter, monthFilter);
}

// 회비 설정 폼 표시
function showDuesSettingForm() {
    const setting = JSON.parse(localStorage.getItem('ybmfc_dues_setting') || '{"monthlyDues": 10000, "year": 2026}');
    document.getElementById('duesSettingContainer').style.display = 'block';
    document.getElementById('monthlyDues').value = setting.monthlyDues;
    document.getElementById('duesYear').value = setting.year;
}

// 회비 설정 폼 숨기기
function hideDuesSettingForm() {
    document.getElementById('duesSettingContainer').style.display = 'none';
}

// 회비 설정 저장
document.getElementById('duesSettingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const setting = {
        monthlyDues: parseInt(document.getElementById('monthlyDues').value),
        year: parseInt(document.getElementById('duesYear').value)
    };
    
    localStorage.setItem('ybmfc_dues_setting', JSON.stringify(setting));
    alert('회비 설정이 저장되었습니다.');
    hideDuesSettingForm();
    loadDuesStats();
});

// 회비 납부 폼 표시
function showAddDuesForm() {
    const setting = JSON.parse(localStorage.getItem('ybmfc_dues_setting') || '{"monthlyDues": 10000}');
    const now = new Date();
    
    document.getElementById('duesFormContainer').style.display = 'block';
    document.getElementById('duesFormTitle').textContent = '회비 납부 기록';
    document.getElementById('duesForm').reset();
    document.getElementById('duesEditIndex').value = '';
    document.getElementById('duesAmount').value = setting.monthlyDues;
    document.getElementById('duesMonth').value = now.toISOString().slice(0, 7);
    document.getElementById('duesPaymentDate').value = now.toISOString().slice(0, 10);
}

// 빠른 회비 납부 등록
function quickAddDues(username, name) {
    showAddDuesForm();
    document.getElementById('duesMember').value = username;
}

// 회비 납부 폼 숨기기
function hideDuesForm() {
    document.getElementById('duesFormContainer').style.display = 'none';
    document.getElementById('duesForm').reset();
}

// 회비 납부 폼 제출
document.getElementById('duesForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const dues = JSON.parse(localStorage.getItem('ybmfc_dues') || '[]');
    const editIndex = document.getElementById('duesEditIndex').value;
    
    const duesData = {
        memberUsername: document.getElementById('duesMember').value,
        amount: parseInt(document.getElementById('duesAmount').value),
        month: document.getElementById('duesMonth').value,
        paymentDate: document.getElementById('duesPaymentDate').value,
        method: document.getElementById('duesMethod').value,
        notes: document.getElementById('duesNotes').value,
        status: '완료',
        createdAt: new Date().toISOString()
    };
    
    if (editIndex !== '') {
        // 수정
        dues[editIndex] = duesData;
        alert('회비 기록이 수정되었습니다.');
    } else {
        // 추가
        dues.push(duesData);
        alert('회비 납부 기록이 추가되었습니다.');
    }
    
    localStorage.setItem('ybmfc_dues', JSON.stringify(dues));
    loadDues();
    hideDuesForm();
});

// 회비 수정
function editDues(index) {
    const dues = JSON.parse(localStorage.getItem('ybmfc_dues') || '[]');
    const due = dues[index];
    
    document.getElementById('duesFormContainer').style.display = 'block';
    document.getElementById('duesFormTitle').textContent = '회비 기록 수정';
    document.getElementById('duesEditIndex').value = index;
    document.getElementById('duesMember').value = due.memberUsername;
    document.getElementById('duesAmount').value = due.amount;
    document.getElementById('duesMonth').value = due.month;
    document.getElementById('duesPaymentDate').value = due.paymentDate;
    document.getElementById('duesMethod').value = due.method;
    document.getElementById('duesNotes').value = due.notes || '';
}

// 회비 삭제
function deleteDues(index) {
    if (!confirm('정말 이 회비 기록을 삭제하시겠습니까?')) return;
    
    const dues = JSON.parse(localStorage.getItem('ybmfc_dues') || '[]');
    dues.splice(index, 1);
    localStorage.setItem('ybmfc_dues', JSON.stringify(dues));
    
    loadDues();
    alert('회비 기록이 삭제되었습니다.');
}

