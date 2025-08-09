// DOM 요소들을 위한 변수들
document.addEventListener('DOMContentLoaded', function() {
    // 페이지가 로드되면 실행되는 함수들
    initializeApp();
});

// 앱 초기화 함수
function initializeApp() {
    // 네비게이션 메뉴 스크롤 이벤트
    handleNavigation();
    
    // 폼 제출 이벤트
    handleFormSubmission();
    
    // 스크롤 애니메이션
    handleScrollAnimations();
    
    console.log('웹 템플릿이 성공적으로 로드되었습니다!');
}

// 네비게이션 관련 함수들
function handleNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 버튼 클릭 시 메시지 표시
function showMessage() {
    alert('안녕하세요! 이것은 기본 JavaScript 기능입니다.');
    
    // 추가적인 인터랙션
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// 폼 제출 처리
function handleFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (validateForm(name, email, message)) {
                // 실제 서버 전송 대신 시뮬레이션
                simulateFormSubmission(name, email, message);
                
                // 폼 초기화
                this.reset();
            }
        });
    }
}

// 폼 유효성 검사
function validateForm(name, email, message) {
    if (!name.trim()) {
        alert('이름을 입력해주세요.');
        return false;
    }
    
    if (!email.trim()) {
        alert('이메일을 입력해주세요.');
        return false;
    }
    
    if (!isValidEmail(email)) {
        alert('올바른 이메일 형식을 입력해주세요.');
        return false;
    }
    
    if (!message.trim()) {
        alert('메시지를 입력해주세요.');
        return false;
    }
    
    return true;
}

// 이메일 유효성 검사
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 폼 제출 시뮬레이션
function simulateFormSubmission(name, email, message) {
    // 로딩 표시
    showLoadingMessage();
    
    // 2초 후 성공 메시지 표시 (실제 서버 통신 시뮬레이션)
    setTimeout(() => {
        hideLoadingMessage();
        alert(`${name}님, 메시지가 성공적으로 전송되었습니다!\n이메일: ${email}\n메시지: ${message}`);
    }, 2000);
}

// 로딩 메시지 표시
function showLoadingMessage() {
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = '전송 중...';
}

// 로딩 메시지 숨김
function hideLoadingMessage() {
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    submitButton.disabled = false;
    submitButton.textContent = '전송';
}

// 스크롤 애니메이션 처리
function handleScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // 관찰할 요소들 선택
    const animatedElements = document.querySelectorAll('.service-card, .section h2');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// 유틸리티 함수들
const utils = {
    // 요소 선택 헬퍼
    select: (selector) => document.querySelector(selector),
    selectAll: (selector) => document.querySelectorAll(selector),
    
    // 현재 시간 반환
    getCurrentTime: () => new Date().toLocaleString('ko-KR'),
    
    // 랜덤 색상 생성
    getRandomColor: () => {
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
};

// 개발자 도구용 디버그 함수들
const debug = {
    log: (message) => console.log(`[DEBUG] ${message}`),
    error: (message) => console.error(`[ERROR] ${message}`),
    info: (message) => console.info(`[INFO] ${message}`)
};

// 페이지 성능 모니터링 (간단한 예시)
function monitorPerformance() {
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        debug.info(`페이지 로드 시간: ${loadTime.toFixed(2)}ms`);
    });
}

// 성능 모니터링 시작
monitorPerformance();

// 전역 이벤트 리스너들
window.addEventListener('resize', function() {
    // 반응형 처리를 위한 리사이즈 이벤트
    debug.log('화면 크기 변경됨: ' + window.innerWidth + 'x' + window.innerHeight);
});

// 에러 처리
window.addEventListener('error', function(e) {
    debug.error('JavaScript 에러 발생: ' + e.message);
});

// 마우스 오버 효과를 위한 이벤트 리스너
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('service-card')) {
        e.target.style.borderLeft = '4px solid ' + utils.getRandomColor();
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('service-card')) {
        e.target.style.borderLeft = 'none';
    }
});