// 페이지 로드 시 로그인 상태 확인
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});

// 로그인 상태 확인
function checkLoginStatus() {
    // localStorage 또는 sessionStorage에서 사용자 정보 확인
    let user = localStorage.getItem('ybmfc_user');
    if (!user) {
        user = sessionStorage.getItem('ybmfc_user');
    }
    
    if (user) {
        user = JSON.parse(user);
        updateUIForLoggedInUser(user);
    } else {
        updateUIForLoggedOutUser();
    }
}

// 로그인된 사용자를 위한 UI 업데이트
function updateUIForLoggedInUser(user) {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const adminBtn = document.getElementById('adminBtn');
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (registerBtn) registerBtn.style.display = 'none';
    
    if (userInfo) {
        userInfo.style.display = 'flex';
        if (userName) {
            userName.textContent = user.name + '님 환영합니다!';
        }
    }
    
    // 관리자 계정일 경우 관리자 페이지 버튼 표시
    if (adminBtn && user.username === 'admin') {
        adminBtn.style.display = 'inline-block';
    }
}

// 로그아웃된 사용자를 위한 UI 업데이트
function updateUIForLoggedOutUser() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userInfo = document.getElementById('userInfo');
    const adminBtn = document.getElementById('adminBtn');
    
    if (loginBtn) loginBtn.style.display = 'inline-block';
    if (registerBtn) registerBtn.style.display = 'inline-block';
    if (userInfo) userInfo.style.display = 'none';
    if (adminBtn) adminBtn.style.display = 'none';
}

// 로그아웃 버튼 이벤트 리스너
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        // localStorage와 sessionStorage 모두에서 제거
        localStorage.removeItem('ybmfc_user');
        sessionStorage.removeItem('ybmfc_user');
        
        alert('로그아웃되었습니다.');
        window.location.href = 'index.html';
    });
}

// 로그인 폼 제출 (login.html에서 사용)
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // localStorage에서 사용자 정보 가져오기
    const users = JSON.parse(localStorage.getItem('ybmfc_users') || '[]');
    
    // 사용자 인증
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // 로그인 성공
        const loginData = {
            username: user.username,
            name: user.name,
            email: user.email,
            loginTime: new Date().toISOString()
        };
        
        if (rememberMe) {
            localStorage.setItem('ybmfc_user', JSON.stringify(loginData));
        } else {
            sessionStorage.setItem('ybmfc_user', JSON.stringify(loginData));
        }
        
        alert('로그인 성공! 환영합니다, ' + user.name + '님!');
        window.location.href = 'index.html';
        return false;
    } else {
        // 로그인 실패
        alert('아이디 또는 비밀번호가 올바르지 않습니다.');
        return false;
    }
}

// 회원가입 폼 제출 (register.html에서 사용)
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // 비밀번호 확인
    if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return false;
    }
    
    // 약관 동의 확인
    if (!agreeTerms) {
        alert('이용약관에 동의해주세요.');
        return false;
    }
    
    // localStorage에서 기존 사용자 목록 가져오기
    const users = JSON.parse(localStorage.getItem('ybmfc_users') || '[]');
    
    // 중복 아이디 확인
    if (users.some(u => u.username === username)) {
        alert('이미 사용 중인 아이디입니다.');
        return false;
    }
    
    // 중복 이메일 확인
    if (users.some(u => u.email === email)) {
        alert('이미 사용 중인 이메일입니다.');
        return false;
    }
    
    // 새 사용자 추가
    const newUser = {
        name: name,
        username: username,
        email: email,
        password: password,
        registeredDate: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('ybmfc_users', JSON.stringify(users));
    
    alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
    window.location.href = 'login.html';
    return false;
}

// 사용자 정보 가져오기 (다른 페이지에서 사용 가능)
function getCurrentUser() {
    let user = localStorage.getItem('ybmfc_user');
    if (!user) {
        user = sessionStorage.getItem('ybmfc_user');
    }
    return user ? JSON.parse(user) : null;
}

// 로그인 필요 페이지 보호 (필요한 페이지에서 호출)
function requireLogin() {
    const user = getCurrentUser();
    if (!user) {
        alert('로그인이 필요한 페이지입니다.');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// ========== 메인 페이지 뉴스 로드 ==========

// 메인 페이지 뉴스 로드
async function loadMainPageNews() {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) {
        console.log('뉴스 그리드를 찾을 수 없습니다.');
        return; // 뉴스 그리드가 없으면 종료
    }
    
    // Supabase에서 뉴스 가져오기 시도
    let news = [];
    if (typeof getNews !== 'undefined') {
        try {
            news = await getNews();
            console.log('✅ Supabase에서 뉴스 로드:', news.length + '개의 뉴스 발견');
        } catch (error) {
            console.error('Supabase 뉴스 로드 실패, LocalStorage 사용:', error);
            // 폴백: LocalStorage 사용
            news = JSON.parse(localStorage.getItem('ybmfc_news') || '[]');
            console.log('뉴스 로드 (LocalStorage):', news.length + '개의 뉴스 발견');
        }
    } else {
        // 헬퍼 함수가 없으면 LocalStorage 사용
        news = JSON.parse(localStorage.getItem('ybmfc_news') || '[]');
        console.log('뉴스 로드 (LocalStorage):', news.length + '개의 뉴스 발견');
    }
    
    if (news.length === 0) {
        newsGrid.innerHTML = `
            <div class="news-card">
                <div class="news-date">공지</div>
                <h3>등록된 뉴스가 없습니다</h3>
                <p>관리자 페이지에서 뉴스를 등록해주세요.</p>
            </div>
        `;
        return;
    }
    
    // 날짜순 정렬 (최신순)
    news.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // 최대 6개까지만 표시
    const displayNews = news.slice(0, 6);
    
    newsGrid.innerHTML = displayNews.map((item, index) => {
        const date = new Date(item.date);
        const formattedDate = date.toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, '');
        
        // 이미지가 있으면 첫 번째 이미지를 표시
        let imageHtml = '';
        if (item.images && item.images.length > 0) {
            imageHtml = `
                <div class="news-image">
                    <img src="${item.images[0]}" alt="${item.title}">
                </div>
            `;
        }
        
        // 내용 미리보기 (100자까지)
        const preview = item.content.length > 100 ? 
            item.content.substring(0, 100) + '...' : 
            item.content;
        
        // Supabase ID 또는 index 사용
        const itemId = item.id || index;
        
        return `
            <div class="news-card" onclick="viewNewsDetailById('${itemId}')">
                ${imageHtml}
                <div class="news-date">${formattedDate}</div>
                <h3>${item.title}</h3>
                <p>${preview}</p>
                <a href="#" class="read-more" onclick="event.stopPropagation(); viewNewsDetailById('${itemId}')">자세히 보기 →</a>
            </div>
        `;
    }).join('');
}

// 뉴스 상세보기 (ID로)
async function viewNewsDetailById(itemId) {
    let item = null;
    
    // Supabase에서 뉴스 가져오기 시도
    if (typeof getNews !== 'undefined') {
        try {
            const news = await getNews();
            item = news.find(n => n.id === itemId || n.id.toString() === itemId.toString());
            if (!item) {
                // ID가 숫자인 경우 (기존 index 방식)
                const index = parseInt(itemId);
                if (!isNaN(index)) {
                    news.sort((a, b) => new Date(b.date) - new Date(a.date));
                    item = news[index];
                }
            }
        } catch (error) {
            console.error('Supabase 뉴스 상세보기 실패:', error);
        }
    }
    
    // 폴백: LocalStorage 사용
    if (!item) {
        const news = JSON.parse(localStorage.getItem('ybmfc_news') || '[]');
        news.sort((a, b) => new Date(b.date) - new Date(a.date));
        const index = parseInt(itemId);
        if (!isNaN(index)) {
            item = news[index];
        } else {
            item = news.find(n => n.id === itemId || n.id?.toString() === itemId.toString());
        }
    }
    
    if (!item) {
        console.error('뉴스를 찾을 수 없습니다:', itemId);
        return;
    }
    
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString('ko-KR');
    
    // 이미지 갤러리 HTML
    let imagesHtml = '';
    if (item.images && item.images.length > 0) {
        imagesHtml = `
            <div class="news-detail-images">
                ${item.images.map(img => `
                    <img src="${img}" alt="${item.title}" class="news-detail-image">
                `).join('')}
            </div>
        `;
    }
    
    // 모달 생성
    const modal = document.createElement('div');
    modal.className = 'news-detail-modal';
    modal.innerHTML = `
        <div class="news-detail-content">
            <span class="news-detail-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <div class="news-detail-header">
                <div class="news-detail-date">${formattedDate}</div>
                <h2 class="news-detail-title">${item.title}</h2>
            </div>
            ${imagesHtml}
            <div class="news-detail-body">
                <p>${item.content.replace(/\n/g, '<br>')}</p>
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
    
    // ESC 키로 닫기
    const closeOnEsc = function(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEsc);
        }
    };
    document.addEventListener('keydown', closeOnEsc);
}

// 페이지 로드 시 뉴스 로드
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('newsGrid')) {
        loadMainPageNews();
    }
});

