// Supabase 헬퍼 함수들

// Supabase 클라이언트가 로드되었는지 확인
function ensureSupabase() {
    if (typeof supabase === 'undefined' || !supabase) {
        console.error('❌ Supabase 클라이언트가 초기화되지 않았습니다.');
        return false;
    }
    return true;
}

// ========== 회원 관리 ==========

// 회원 가져오기
async function getUsers() {
    if (!ensureSupabase()) return [];
    
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .order('registered_date', { ascending: false });
        
        if (error) {
            console.error('회원 조회 오류:', error);
            return [];
        }
        
        return data || [];
    } catch (error) {
        console.error('회원 조회 예외:', error);
        return [];
    }
}

// 회원 추가
async function addUser(userData) {
    if (!ensureSupabase()) return null;
    
    try {
        const { data, error } = await supabase
            .from('users')
            .insert([userData])
            .select()
            .single();
        
        if (error) {
            console.error('회원 추가 오류:', error);
            throw error;
        }
        
        return data;
    } catch (error) {
        console.error('회원 추가 예외:', error);
        throw error;
    }
}

// 회원 삭제
async function deleteUser(userId) {
    if (!ensureSupabase()) return false;
    
    try {
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', userId);
        
        if (error) {
            console.error('회원 삭제 오류:', error);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('회원 삭제 예외:', error);
        return false;
    }
}

// 회원 검색 (username으로)
async function findUserByUsername(username) {
    if (!ensureSupabase()) return null;
    
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .single();
        
        if (error) {
            return null;
        }
        
        return data;
    } catch (error) {
        return null;
    }
}

// ========== 선수 관리 ==========

// 선수 가져오기
async function getPlayers() {
    if (!ensureSupabase()) return [];
    
    try {
        const { data, error } = await supabase
            .from('players')
            .select('*')
            .order('number', { ascending: true });
        
        if (error) {
            console.error('선수 조회 오류:', error);
            return [];
        }
        
        return data || [];
    } catch (error) {
        console.error('선수 조회 예외:', error);
        return [];
    }
}

// 선수 추가
async function addPlayer(playerData) {
    if (!ensureSupabase()) return null;
    
    try {
        const { data, error } = await supabase
            .from('players')
            .insert([playerData])
            .select()
            .single();
        
        if (error) {
            console.error('선수 추가 오류:', error);
            throw error;
        }
        
        return data;
    } catch (error) {
        console.error('선수 추가 예외:', error);
        throw error;
    }
}

// 선수 업데이트
async function updatePlayer(playerId, playerData) {
    if (!ensureSupabase()) return null;
    
    try {
        playerData.updated_at = new Date().toISOString();
        
        const { data, error } = await supabase
            .from('players')
            .update(playerData)
            .eq('id', playerId)
            .select()
            .single();
        
        if (error) {
            console.error('선수 업데이트 오류:', error);
            throw error;
        }
        
        return data;
    } catch (error) {
        console.error('선수 업데이트 예외:', error);
        throw error;
    }
}

// 선수 삭제
async function deletePlayer(playerId) {
    if (!ensureSupabase()) return false;
    
    try {
        const { error } = await supabase
            .from('players')
            .delete()
            .eq('id', playerId);
        
        if (error) {
            console.error('선수 삭제 오류:', error);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('선수 삭제 예외:', error);
        return false;
    }
}

// ========== 경기 일정 관리 ==========

// 경기 일정 가져오기
async function getMatches() {
    if (!ensureSupabase()) return [];
    
    try {
        const { data, error } = await supabase
            .from('matches')
            .select('*')
            .order('date', { ascending: true });
        
        if (error) {
            console.error('경기 일정 조회 오류:', error);
            return [];
        }
        
        return data || [];
    } catch (error) {
        console.error('경기 일정 조회 예외:', error);
        return [];
    }
}

// 경기 일정 추가
async function addMatch(matchData) {
    if (!ensureSupabase()) return null;
    
    try {
        const { data, error } = await supabase
            .from('matches')
            .insert([matchData])
            .select()
            .single();
        
        if (error) {
            console.error('경기 일정 추가 오류:', error);
            throw error;
        }
        
        return data;
    } catch (error) {
        console.error('경기 일정 추가 예외:', error);
        throw error;
    }
}

// 경기 일정 업데이트
async function updateMatch(matchId, matchData) {
    if (!ensureSupabase()) return null;
    
    try {
        matchData.updated_at = new Date().toISOString();
        
        const { data, error } = await supabase
            .from('matches')
            .update(matchData)
            .eq('id', matchId)
            .select()
            .single();
        
        if (error) {
            console.error('경기 일정 업데이트 오류:', error);
            throw error;
        }
        
        return data;
    } catch (error) {
        console.error('경기 일정 업데이트 예외:', error);
        throw error;
    }
}

// 경기 일정 삭제
async function deleteMatch(matchId) {
    if (!ensureSupabase()) return false;
    
    try {
        const { error } = await supabase
            .from('matches')
            .delete()
            .eq('id', matchId);
        
        if (error) {
            console.error('경기 일정 삭제 오류:', error);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('경기 일정 삭제 예외:', error);
        return false;
    }
}

// ========== 경기 기록 관리 ==========

// 경기 기록 가져오기
async function getMatchRecords() {
    if (!ensureSupabase()) return [];
    
    try {
        const { data, error } = await supabase
            .from('match_records')
            .select('*')
            .order('date', { ascending: false });
        
        if (error) {
            console.error('경기 기록 조회 오류:', error);
            return [];
        }
        
        return data || [];
    } catch (error) {
        console.error('경기 기록 조회 예외:', error);
        return [];
    }
}

// 경기 기록 추가
async function addMatchRecord(recordData) {
    if (!ensureSupabase()) return null;
    
    try {
        const { data, error } = await supabase
            .from('match_records')
            .insert([recordData])
            .select()
            .single();
        
        if (error) {
            console.error('경기 기록 추가 오류:', error);
            throw error;
        }
        
        return data;
    } catch (error) {
        console.error('경기 기록 추가 예외:', error);
        throw error;
    }
}

// 경기 기록 업데이트
async function updateMatchRecord(recordId, recordData) {
    if (!ensureSupabase()) return null;
    
    try {
        recordData.updated_at = new Date().toISOString();
        
        const { data, error } = await supabase
            .from('match_records')
            .update(recordData)
            .eq('id', recordId)
            .select()
            .single();
        
        if (error) {
            console.error('경기 기록 업데이트 오류:', error);
            throw error;
        }
        
        return data;
    } catch (error) {
        console.error('경기 기록 업데이트 예외:', error);
        throw error;
    }
}

// 경기 기록 삭제
async function deleteMatchRecord(recordId) {
    if (!ensureSupabase()) return false;
    
    try {
        const { error } = await supabase
            .from('match_records')
            .delete()
            .eq('id', recordId);
        
        if (error) {
            console.error('경기 기록 삭제 오류:', error);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('경기 기록 삭제 예외:', error);
        return false;
    }
}

// ========== 뉴스 관리 ==========

// 뉴스 가져오기
async function getNews() {
    if (!ensureSupabase()) return [];
    
    try {
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('date', { ascending: false });
        
        if (error) {
            console.error('뉴스 조회 오류:', error);
            return [];
        }
        
        return data || [];
    } catch (error) {
        console.error('뉴스 조회 예외:', error);
        return [];
    }
}

// 뉴스 추가
async function addNews(newsData) {
    if (!ensureSupabase()) return null;
    
    try {
        const { data, error } = await supabase
            .from('news')
            .insert([newsData])
            .select()
            .single();
        
        if (error) {
            console.error('뉴스 추가 오류:', error);
            throw error;
        }
        
        return data;
    } catch (error) {
        console.error('뉴스 추가 예외:', error);
        throw error;
    }
}

// 뉴스 업데이트
async function updateNews(newsId, newsData) {
    if (!ensureSupabase()) return null;
    
    try {
        newsData.updated_at = new Date().toISOString();
        
        const { data, error } = await supabase
            .from('news')
            .update(newsData)
            .eq('id', newsId)
            .select()
            .single();
        
        if (error) {
            console.error('뉴스 업데이트 오류:', error);
            throw error;
        }
        
        return data;
    } catch (error) {
        console.error('뉴스 업데이트 예외:', error);
        throw error;
    }
}

// 뉴스 삭제
async function deleteNewsRecord(newsId) {
    if (!ensureSupabase()) return false;
    
    try {
        const { error } = await supabase
            .from('news')
            .delete()
            .eq('id', newsId);
        
        if (error) {
            console.error('뉴스 삭제 오류:', error);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('뉴스 삭제 예외:', error);
        return false;
    }
}

// ========== 회비 관리 ==========

// 회비 설정 가져오기
async function getDuesSettings() {
    if (!ensureSupabase()) return null;
    
    try {
        const { data, error } = await supabase
            .from('dues_settings')
            .select('*')
            .order('year', { ascending: false })
            .limit(1)
            .single();
        
        if (error) {
            // 설정이 없으면 기본값 반환
            return {
                monthly_dues: 10000,
                year: new Date().getFullYear()
            };
        }
        
        return data;
    } catch (error) {
        return {
            monthly_dues: 10000,
            year: new Date().getFullYear()
        };
    }
}

// 회비 설정 업데이트
async function updateDuesSettings(settingsData) {
    if (!ensureSupabase()) return null;
    
    try {
        const existing = await getDuesSettings();
        
        if (existing && existing.id) {
            // 업데이트
            settingsData.updated_at = new Date().toISOString();
            const { data, error } = await supabase
                .from('dues_settings')
                .update(settingsData)
                .eq('id', existing.id)
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } else {
            // 추가
            const { data, error } = await supabase
                .from('dues_settings')
                .insert([settingsData])
                .select()
                .single();
            
            if (error) throw error;
            return data;
        }
    } catch (error) {
        console.error('회비 설정 업데이트 오류:', error);
        throw error;
    }
}

// 회비 납부 내역 가져오기
async function getDuesPayments() {
    if (!ensureSupabase()) return [];
    
    try {
        const { data, error } = await supabase
            .from('dues_payments')
            .select('*')
            .order('payment_date', { ascending: false });
        
        if (error) {
            console.error('회비 납부 내역 조회 오류:', error);
            return [];
        }
        
        return data || [];
    } catch (error) {
        console.error('회비 납부 내역 조회 예외:', error);
        return [];
    }
}

// 회비 납부 내역 추가
async function addDuesPayment(paymentData) {
    if (!ensureSupabase()) return null;
    
    try {
        const { data, error } = await supabase
            .from('dues_payments')
            .insert([paymentData])
            .select()
            .single();
        
        if (error) {
            console.error('회비 납부 내역 추가 오류:', error);
            throw error;
        }
        
        return data;
    } catch (error) {
        console.error('회비 납부 내역 추가 예외:', error);
        throw error;
    }
}

// 회비 납부 내역 업데이트
async function updateDuesPayment(paymentId, paymentData) {
    if (!ensureSupabase()) return null;
    
    try {
        const { data, error } = await supabase
            .from('dues_payments')
            .update(paymentData)
            .eq('id', paymentId)
            .select()
            .single();
        
        if (error) {
            console.error('회비 납부 내역 업데이트 오류:', error);
            throw error;
        }
        
        return data;
    } catch (error) {
        console.error('회비 납부 내역 업데이트 예외:', error);
        throw error;
    }
}

// 회비 납부 내역 삭제
async function deleteDuesPayment(paymentId) {
    if (!ensureSupabase()) return false;
    
    try {
        const { error } = await supabase
            .from('dues_payments')
            .delete()
            .eq('id', paymentId);
        
        if (error) {
            console.error('회비 납부 내역 삭제 오류:', error);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('회비 납부 내역 삭제 예외:', error);
        return false;
    }
}
