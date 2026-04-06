cosme-log/
├── .env.local                          # API 키 환경변수 (Gemini, Supabase)
├── .env.example                        # 환경변수 템플릿 (커밋용)
├── next.config.ts                      # Next.js 설정
├── tailwind.config.ts                  # Tailwind 설정
├── prisma/
│   └── schema.prisma                   # DB 스키마 (Product, PriceHistory)
│
└── src/
    ├── app/                            # App Router 루트
    │   ├── layout.tsx                  # 전역 레이아웃
    │   ├── page.tsx                    # 홈 (URL 입력 → 분석 시작)
    │   │
    │   ├── compare/                    # 가성비 비교 페이지
    │   │   └── page.tsx                # 비교 대시보드 (카드 + 테이블)
    │   │
    │   └── api/                        # Route Handlers
    │       └── parse/
    │           └── route.ts            # POST /api/parse (링크 → 파싱 결과 반환)
    │
    ├── actions/                        # Server Actions (API Key 캡슐화)
    │   ├── fetchMetadata.ts            # URL → OG/JSON-LD 추출
    │   └── parseWithGemini.ts          # 비정형 텍스트 → Gemini AI 파싱
    │
    ├── components/
    │   ├── ui/                         # 범용 공통 컴포넌트
    │   │   ├── Button.tsx
    │   │   ├── Badge.tsx               # '최고 가성비' 등 뱃지
    │   │   ├── Skeleton.tsx            # 로딩 스켈레톤
    │   │   └── Tooltip.tsx
    │   │
    │   ├── form/
    │   │   ├── UrlInputForm.tsx        # URL 입력 + 즉시 로딩 상태
    │   │   └── ProductReviewForm.tsx   # Human-in-the-loop 검수 UI
    │   │
    │   └── compare/
    │       ├── ProductCard.tsx         # 단위 가격 + 뱃지 표시 카드
    │       ├── CompareTable.tsx        # 용량/가격/단위가격 비교 테이블
    │       └── UncertainField.tsx      # AI 불확실 값 하이라이트 + 수정 인풋
    │
    ├── lib/
    │   ├── parser/                     # 핵심 파싱 엔진
    │   │   ├── regexParser.ts          # 1차 Regex 처리 (ml, g, 1+1 등)
    │   │   ├── geminiOrchestrator.ts   # 2차 AI 위임 및 응답 핸들링
    │   │   └── normalizer.ts           # 단위 통합 변환 (oz → ml 등)
    │   │
    │   ├── pricing/
    │   │   ├── calculator.ts           # 실질 총 용량 산출 + 1ml당 단가 계산
    │   │   └── ranking.ts              # 가성비 랭킹 알고리즘
    │   │
    │   ├── fetcher/
    │   │   ├── ogFetcher.ts            # Open Graph 메타데이터 추출
    │   │   └── jsonLdFetcher.ts        # JSON-LD 구조화 데이터 추출
    │   │
    │   ├── validation/
    │   │   └── productSchema.ts        # Zod 스키마 (AI 응답 + 폼 입력 검증)
    │   │
    │   └── supabase/
    │       └── client.ts               # Supabase 클라이언트 초기화
    │
    ├── store/
    │   └── compareStore.ts             # Zustand: 비교군 상품 리스트 전역 상태
    │
    └── types/
        └── product.ts                  # Product, ParsedResult, RankedProduct 타입 정의