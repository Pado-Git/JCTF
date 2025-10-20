# ACDC 2025 CTF Participant Platform

ACDC(Advanced Cyber Defense Challenge) 2025 CTF 대회 참가자를 위한 웹 플랫폼입니다. 
사이버보안 경진대회 참가자들이 대회 정보를 확인하고, 챌린지를 해결하며, 리더보드를 확인할 수 있는 종합적인 플랫폼을 제공합니다.

## 🌐 데모 및 배포 사이트

- **데모 사이트**: [바로가기](https://acdc-demo.vercel.app)
- **프로덕션 사이트**: [바로가기](https://acdc-2025.vercel.app)
- **개발 서버**: [바로가기](https://acdc-ctf.ngrok.io/)

## 🚀 주요 기능

- **대회 정보**: 실시간 대회 상태 및 일정 확인
- **챌린지 해결**: 다양한 카테고리의 CTF 챌린지 제공
- **실시간 알림**: WebSocket을 통한 공지사항 및 힌트 알림
- **리더보드**: 실시간 순위 및 팀 점수 확인
- **팀 관리**: 팀 생성, 참가, 멤버 관리
- **프로필**: 개인 성과 및 활동 내역 확인

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Tailwind CSS, Custom Components
- **상태 관리**: Zustand
- **라우팅**: React Router v6
- **HTTP 클라이언트**: Ky
- **실시간 통신**: WebSocket (Gotify)
- **배포**: Vercel

---

## 시작하기

### 필수 요구사항
- Node.js 18+
- pnpm (권장) 또는 npm

### 설치 및 실행

1. **저장소 클론**
```bash
git clone acdc --single-branch https://github.com/Pado-Git/JCTF.git
cd acdc-2025-ctf
```

2. **의존성 설치**
```bash
pnpm install
```

3. **환경 변수 설정**
```bash
# .env.local 파일 생성
VITE_API_URL="https://api-dev.jctf.padev.surf"
VITE_DEV_API_URL="https://api-dev.jctf.padev.surf"
```

4. **개발 서버 실행**
```bash
pnpm dev
```

5. **브라우저에서 확인**
```
http://localhost:8080
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
pnpm build

# 빌드 결과 미리보기
pnpm preview

# Vercel 배포
vercel --prod
```

## 📁 프로젝트 구조

```
src/
├── +shared/                 # 공통 컴포넌트 및 유틸리티
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── hooks/              # 커스텀 훅 (WebSocket, 인증 등)
│   ├── stores/             # 상태 관리 (Zustand)
│   ├── libs/               # API 클라이언트 및 유틸리티
│   └── styles/             # 글로벌 스타일
├── pages/                  # 페이지 컴포넌트
│   ├── Home/               # 홈페이지
│   ├── Login/              # 로그인/회원가입
│   ├── Dashboard/          # 대시보드
│   ├── Competitions/       # 대회 목록
│   ├── Challenges/         # 챌린지 해결
│   ├── Leaderboard/        # 리더보드
│   ├── Teams/              # 팀 관리
│   ├── Profile/            # 프로필
│   └── Notices/            # 공지사항
├── auth/                   # 인증 관련 컴포넌트
└── challenge/              # 챌린지 관련 컴포넌트
```

## 🔧 개발 가이드

### API 연동
- RESTful API를 통한 데이터 통신
- JWT 토큰 기반 인증
- 자동 토큰 갱신 및 401 에러 처리

### 실시간 알림
- WebSocket을 통한 실시간 공지사항
- 토스트 알림으로 사용자에게 알림 표시

### 라우트 보호
- 인증된 사용자만 접근 가능한 보호된 라우트
- 자동 로그인/로그아웃 처리

## 📞 문의

- **개발팀**: ACDC 2025 개발팀
- **이슈 리포트**: [GitHub Issues](https://github.com/Pado-Git/JCTF/issues)

## 📄 라이선스

이 프로젝트는 ACDC 2025 대회 전용으로 개발되었습니다.