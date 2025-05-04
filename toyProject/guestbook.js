const baseURL = "http://3.35.249.99:8000/guestbook/";

// DOM 요소 선택
document.addEventListener('DOMContentLoaded', function() {
    // 폼 및 모달 관련 요소
    const guestbookForm = document.getElementById('guestbookForm');
    const guestbookEntries = document.getElementById('guestbookEntries');
    const passwordModal = document.getElementById('passwordModal');
    const editModal = document.getElementById('editModal');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    const confirmEditBtn = document.getElementById('confirmEdit');
    const cancelModalBtn = document.getElementById('cancelModal');
    const editForm = document.getElementById('editForm');
    const cancelEditBtn = document.getElementById('cancelEdit');
    
    // 모달 닫기 요소
    const closeBtns = document.querySelectorAll('.close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    // 초기 데이터 로드
    loadGuestbookEntries();
    
    // 폼 제출 이벤트 리스너
    guestbookForm.addEventListener('submit', handleFormSubmit);
    
    // 수정 폼 제출 이벤트 리스너
    editForm.addEventListener('submit', handleEditFormSubmit);
    
    // 모달 관련 이벤트 리스너
    cancelModalBtn.addEventListener('click', closeModals);
    cancelEditBtn.addEventListener('click', closeModals);
    
    // 전역 변수 (현재 작업 중인 항목 ID)
    let currentEntryId = null;
    
    /**
     * 방명록 항목을 생성하고 저장하는 함수
     * @param {Event} event - 폼 제출 이벤트
     */
    async function handleFormSubmit(event) {
        event.preventDefault();
        
        // 폼 데이터 가져오기
        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('author').value.trim();
        const content = document.getElementById('content').value.trim();
        const password = document.getElementById('password').value;
        
        // 유효성 검사
        if (!title || !author || !content || !password) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        
        // 새 방명록 항목 생성
        const newEntry = {
            title: title,
            author: author,
            body: content,
            password: password
        };
        
        try {
            const response = await postGuestbookEntry(newEntry);
            if (response.message) {
                alert('방명록이 등록되었습니다.');
                loadGuestbookEntries();
            } else if (response.error) {
                alert(response.error);
            }
        } catch (error) {
            console.error('방명록 등록 오류:', error);
        }
        
        // 폼 초기화
        guestbookForm.reset();
    }
    
    /**
     * 방명록 항목을 POST 요청으로 서버에 전송하는 함수
     * @param {Object} newEntry - 방명록 항목 객체
     * @returns {Object} 서버 응답
     */
    async function postGuestbookEntry(newEntry) {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEntry)
        });
        
        return await response.json();
    }
    
    /**
     * 로컬 스토리지에서 방명록 항목들을 가져오는 함수
     * @returns {Array} 방명록 항목 배열
     */
    async function loadGuestbookEntries() {
        try {
            const entries = await getGuestbookEntries();
            displayGuestbookEntries(entries);
        } catch (error) {
            console.error('방명록 불러오기 오류:', error);
        }
    }
    
    /**
     * 방명록 항목들을 GET 요청으로 서버에서 가져오는 함수
     * @returns {Array} 방명록 항목 배열
     */
    async function getGuestbookEntries() {
        const response = await fetch(baseURL);
        if (!response.ok) {
            throw new Error('방명록을 불러오는 데 실패했습니다.');
        }
        return await response.json();
    }
    
    /**
     * 방명록 항목들을 화면에 표시하는 함수
     * @param {Array} entries - 방명록 항목 배열
     */
    function displayGuestbookEntries(entries) {
        // 기존 항목 삭제
        guestbookEntries.innerHTML = '';
        
        // 항목이 없는 경우
        if (entries.length === 0) {
            guestbookEntries.innerHTML = '<p class="no-entries">등록된 방명록이 없습니다.</p>';
            return;
        }
        
        // 각 항목을 DOM에 추가
        entries.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.classList.add('guestbook-entry');
            entryElement.dataset.id = entry.id;
            
            entryElement.innerHTML = `
                <div class="entry-header">
                    <div class="entry-title">${escapeHTML(entry.title)}</div>
                    <div class="entry-author">작성자: ${escapeHTML(entry.author)}</div>
                </div>
                <div class="entry-content">${escapeHTML(entry.body)}</div>
                <div class="entry-date">${entry.created}</div>
                <div class="entry-actions">
                    <button class="edit-btn" data-id="${entry.id}">수정</button>
                    <button class="delete-btn" data-id="${entry.id}">삭제</button>
                </div>
            `;
            
            guestbookEntries.appendChild(entryElement);
        });
        
        // 수정 및 삭제 버튼 이벤트 리스너 추가
        addEntryButtonListeners();
    }
    
    /**
     * 항목의 수정 및 삭제 버튼에 이벤트 리스너를 추가하는 함수
     */
    function addEntryButtonListeners() {
        // 수정 버튼
        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const entryId = parseInt(this.dataset.id);
                showPasswordModal(entryId, 'edit');
            });
        });
        
        // 삭제 버튼
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const entryId = parseInt(this.dataset.id);
                showPasswordModal(entryId, 'delete');
            });
        });
    }
    
    /**
     * 비밀번호 확인 모달을 표시하는 함수
     * @param {number} entryId - 방명록 항목 ID
     * @param {string} action - 'edit' 또는 'delete'
     */
    function showPasswordModal(entryId, action) {
        currentEntryId = entryId;
        
        // 모달 표시
        passwordModal.style.display = 'block';
        confirmPasswordInput.value = '';
        confirmPasswordInput.focus();
        
        // 버튼 이벤트 리스너 초기화
        confirmDeleteBtn.onclick = null;
        confirmEditBtn.onclick = null;
        
        // 액션에 따른 버튼 활성화
        if (action === 'delete') {
            confirmDeleteBtn.style.display = 'block';
            confirmEditBtn.style.display = 'none';
            
            confirmDeleteBtn.onclick = function() {
                verifyPassword('delete');
            };
        } else {
            confirmDeleteBtn.style.display = 'none';
            confirmEditBtn.style.display = 'block';
            
            confirmEditBtn.onclick = function() {
                verifyPassword('edit');
            };
        }
    }
    
    /**
     * 비밀번호를 확인하고 해당 작업을 수행하는 함수
     * @param {string} action - 'edit' 또는 'delete'
     */
    async function verifyPassword(action) {
        const entryPassword = await getEntryPassword(currentEntryId);
        const inputPassword = confirmPasswordInput.value;
        
        if (entryPassword === inputPassword) {
            closeModals();
            
            if (action === 'delete') {
                await deleteEntry(currentEntryId);
            } else {
                showEditForm(currentEntryId);
            }
        } else {
            alert('비밀번호가 일치하지 않습니다.');
            console.log(entryPassword);
            confirmPasswordInput.value = '';
            confirmPasswordInput.focus();
        }
    }
    
    /**
     * 특정 항목의 비밀번호를 가져오는 함수
     * @param {number} entryId - 방명록 항목 ID
     * @returns {string} 항목의 비밀번호
     */
    async function getEntryPassword(entryId) {
        const entries = await getGuestbookEntries();
        const entry = entries.find(entry => entry.id === entryId);
        //console.log(entry.password);
        return entry ? entry.password : null;
    }
    
    /**
     * 방명록 항목을 삭제하는 함수
     * @param {number} entryId - 방명록 항목 ID
     */
    async function deleteEntry(entryId) {
        const password = prompt('삭제하려면 비밀번호를 입력하세요:');
        
        try {
            const response = await deleteGuestbookEntry(entryId, password);
            if (response.message) {
                alert(response.message);
                loadGuestbookEntries();
            } else if (response.error) {
                alert(response.error);
            }
        } catch (error) {
            console.error('방명록 삭제 오류:', error);
        }
    }
    
    /**
     * 방명록 항목을 DELETE 요청으로 서버에 전송하는 함수
     * @param {number} entryId - 방명록 항목 ID
     * @param {string} password - 비밀번호
     * @returns {Object} 서버 응답
     */
    async function deleteGuestbookEntry(entryId, password) {
        const response = await fetch(`${baseURL}${entryId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password })
        });
        
        return await response.json();
    }
    
    /**
     * 수정 폼을 표시하는 함수
     * @param {number} entryId - 방명록 항목 ID
     */
    function showEditForm(entryId) {
        currentEntryId = entryId;
        const entry = guestbookEntries.querySelector(`[data-id="${entryId}"]`);
        
        // 기존 항목 데이터로 수정 폼 채우기
        document.getElementById('editTitle').value = entry.querySelector('.entry-title').textContent.trim();
        document.getElementById('editAuthor').value = entry.querySelector('.entry-author').textContent.replace('작성자:', '').trim();
        document.getElementById('editContent').value = entry.querySelector('.entry-content').textContent.trim();
        
        // 수정 모달 표시
        editModal.style.display = 'block';
    }
    
    /**
     * 수정된 정보를 서버에 전송하여 방명록 항목을 수정하는 함수
     * @param {Event} event - 폼 제출 이벤트
     */
    async function handleEditFormSubmit(event) {
        event.preventDefault();
        
        const title = document.getElementById('editTitle').value.trim();
        const author = document.getElementById('editAuthor').value.trim();
        const content = document.getElementById('editContent').value.trim();
        
        if (!title || !author || !content) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        
        const updatedEntry = {
            title: title,
            author: author,
            body: content
        };
        
        try {
            const response = await updateGuestbookEntry(currentEntryId, updatedEntry);
            if (response.message) {
                alert('방명록이 수정되었습니다.');
                loadGuestbookEntries();
            } else if (response.error) {
                alert(response.error);
            }
        } catch (error) {
            console.error('방명록 수정 오류:', error);
        }
        
        // 수정 모달 닫기
        closeModals();
    }
    
    /**
     * 방명록 항목을 PUT 요청으로 서버에 전송하여 수정하는 함수
     * @param {number} entryId - 방명록 항목 ID
     * @param {Object} updatedEntry - 수정된 항목 데이터
     * @returns {Object} 서버 응답
     */
    async function updateGuestbookEntry(entryId, updatedEntry) {
        const response = await fetch(`${baseURL}${entryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEntry)
        });
        
        return await response.json();
    }
    
    /**
     * 모든 모달을 닫는 함수
     */
    function closeModals() {
        passwordModal.style.display = 'none';
        editModal.style.display = 'none';
    }
    
    /**
     * 문자열을 HTML 인젝션을 방지하여 안전하게 변환하는 함수
     * @param {string} str - HTML 변환할 문자열
     * @returns {string} 변환된 문자열
     */
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
});