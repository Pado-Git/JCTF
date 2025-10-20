# JCTF Participant Page

JCTF(Jeopardy-style CTF) 참가자를 위한 웹 플랫폼입니다. 사이버보안 경진대회 참가자들이 대회 정보를 확인하고, 챌린지를 해결하며, 리더보드를 확인할 수 있는 종합적인 플랫폼을 제공합니다.

## 시작하기

### 필수 요구사항
- Node.js 18+
- pnpm (권장) 또는 npm

### 설치 및 실행

1. **저장소 클론**
```bash
git clone https://github.com/Pado-Git/JCTF.git
cd jctf-participant-dev
```

2. **의존성 설치**
```bash
pnpm install
```

3. **개발 서버 실행**
```bash
pnpm dev
```

4. **브라우저에서 확인**
```
http://localhost:8080
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
pnpm build

# 빌드 결과 미리보기
pnpm preview

# 배포 (Vercel)
vercel
```

### 프로젝트 구조

```
src/
├── +shared/                 # 공통 컴포넌트 및 유틸리티
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── hooks/              # 커스텀 훅
│   ├── stores/             # 상태 관리
│   ├── utils/              # 유틸리티 함수
│   └── styles/             # 글로벌 스타일
├── pages/                  # 페이지 컴포넌트
│   ├── Home/               # 홈페이지
│   ├── Login/              # 로그인
│   ├── Dashboard/          # 대시보드
│   ├── Competitions/       # 대회 목록
│   ├── Challenges/         # 챌린지
│   ├── Leaderboard/        # 리더보드
│   └── Profile/            # 프로필
├── home/                   # 홈페이지 전용 컴포넌트
├── challenge/              # 챌린지 관련 컴포넌트
├── competition/            # 대회 관련 컴포넌트
├── leaderboard/            # 리더보드 관련 컴포넌트
└── profile/                # 프로필 관련 컴포넌트
```

