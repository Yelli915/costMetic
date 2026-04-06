# 💡 프로젝트 한 줄 요약

> 비정형 화장품 데이터를 **AI와 정규표현식(Hybrid Parsing)**으로 구조화하고, 구매부터 폐기까지의 **데이터 중심 생애 주기**를 관리하는 풀스택 애플리케이션

---

## 1. Project Overview

| **구분** | **내용** |
| --- | --- |
| **Role** | 1인 풀스택 (기획, 디자인, 프론트엔드, 백엔드, DB 설계) |
| **Period** | 2026.04.05 ~ 2026.05.10 |
| **Tech Stack** | **FE:** Next.js (App Router), TypeScript, Zustand, Tailwind, Recharts / **BE:** Next.js API Routes, Gemini 1.5 Flash, Google Vision API / **DB:** Supabase (PostgreSQL), Prisma |
| **Data Source** | 식약처 공공데이터 API, 주요 이커머스 JSON-LD 및 Open Graph 메타데이터 |

### Market Positioning (Strategic Gap Filling)

- **화해 대비:** 단순 성분 조회를 넘어, 사용자가 보유한 제품 간의 **스펙(용량/가격) 비교 및 중복 구매 방지**에 특화.
- **네이버쇼핑 대비:** 단순 최저가가 아닌, AI 분석을 통해 '증정품/추가 구성'을 포함한 **실질 1ml당 단가** 산출.
- **기존 관리 앱 대비:** 수동 입력의 번거로움을 **AI OCR 및 메타데이터 자동 파싱**으로 자동화하여 진입장벽 제거.

---

## 2. System Architecture

### High-Level Architecture

단순 CRUD를 넘어, 데이터의 흐름과 안정성을 최우선으로 고려한 설계를 적용했습니다.

### Core Logic: Multi-Layer Data Extraction Pipeline

외부 커머스 사이트의 차단을 피하고 데이터 정확도를 확보하기 위한 4단계 공정입니다.

```
사용자 상품 링크 입력
    → 1단계: Open Graph 메타데이터 추출 (상품명/이미지)
    → 2단계: JSON-LD 구조화 데이터 탐색 (가격/브랜드)
    → 3단계: Gemini AI 의미론적 분석 (용량/증정품 구성 파싱)
    → 4단계: Human-in-the-loop 사용자 최종 확인 → DB 저장 및 단위 가격 산출
```

---

## 3. Key Features & Technical Specs

### ① AI Hybrid Pricing Engine (단위 가격 분석기)

- **Problem:** "1+1", "본품 50ml+증정 15ml" 등 복잡한 구성으로 인해 실제 가성비 판단이 어려움.
- **Solution:** **정규표현식(Regex)**으로 표준 규격(ml, g)을 1차 스캐닝하고, 분석이 어려운 비정형 문구는 **Gemini 1.5 Flash**를 활용해 의미론적 파싱 수행.
- **Why This Design:** 모든 데이터를 AI로 처리할 경우 응답 지연 및 비용 급증이 불가피하므로, 패턴이 명확한 데이터는 Regex로 즉시 처리하고 복잡한 비정형 데이터만 AI에 위임하는 **Fallback 구조**를 설계. API 호출을 최소화하면서 파싱 정확도를 유지하는 것이 핵심 설계 목표.

### ② Intelligent Inventory & Color Alert

- **OCR 매칭:** Google Vision API로 영수증의 텍스트 좌표를 분석, '품목명'과 '결제 금액'을 인접도 기반 알고리즘으로 매칭하여 자동 등록.
- **Color Matching 알고리즘:** 립스틱, 파운데이션 등 색조 제품 등록 시, **CIEDE2000(Delta E)** 공식을 활용해 기존 보유 제품과 색상 유사도를 비교.

> **Why This Design:** 단순 RGB 비교는 인간의 시각적 인지와 괴리가 크기 때문에, 인간의 색 지각 차이를 수치화한 Delta E 알고리즘을 선택. 유사도가 일정 임계값(ΔE < 5) 이하일 경우 중복 구매 경고를 송출하는 구조로 설계.

---

## 4. Trouble Shooting (성장 기록)

### Issue 1: AI API 비용 및 응답 속도 최적화

- **상황:** 모든 데이터를 AI로 처리할 경우, 외부 API 특성상 응답 지연 및 토큰 비용 급증이 구조적으로 불가피한 문제.
- **해결:** 패턴이 일정한 데이터(약 80%)는 **Regex** 모듈로 즉시 처리하고, 복잡한 비정형 데이터만 AI에 할당하는 **Fallback 구조** 설계.
- **설계 목표:** AI 호출 빈도를 최소화하여 비용을 통제하고, 전체 파싱 프로세스의 응답 속도를 사용자가 체감하지 못하는 수준으로 유지.

### Issue 2: 데이터 획득의 윤리성 및 법적 리스크

- **상황:** 대형 커머스사의 크롤링 차단 정책으로 인한 데이터 확보의 기술적·법적 한계.
- **해결:** 기술적 우회 대신, 합법적으로 공개된 **Open Graph**와 **JSON-LD** 메타데이터를 우선 활용하여 `robots.txt` 준수.
- **설계 목표:** 법적 안정성을 확보하는 동시에, 데이터 불확실성 발생 시 **Human-in-the-loop** UI를 통해 사용자가 최종 검수하도록 강제하여 데이터 무결성 유지.

---

## 5. Project Roadmap (Current Status)

### 현재 상태 (In Progress)

- Next.js (App Router) + TypeScript + Tailwind CSS 기반 환경 구축 완료
- 프로젝트 아키텍처 설계 및 DB 스키마 모델링 완료

### Phase 1: 가성비 분석 엔진 (Roadmap)

- **Smart Link Fetcher:** 상품 URL에서 Open Graph 및 JSON-LD 구조화 데이터 자동 추출. Next.js Server Actions를 통한 API Key 보안 캡슐화.
- **Hybrid Parsing Engine:** 패턴이 명확한 데이터(80%)는 Regex로 즉시 처리, 비정형 문구(20%)만 Gemini AI에 위임하는 Fallback 구조.
- **데이터 검증 파이프라인:** Zod 스키마를 활용한 AI 응답 구조화 및 유효성 검증.
- **단위 가격 산출:** 증정품·묶음 구성을 포함한 실질 총 용량 기반 1ml당 가격 계산 및 가성비 랭킹 알고리즘 구현.
- **Human-in-the-loop UX:** AI 분석 불확실 값을 사용자가 직접 검수·수정하는 인터페이스.

### Phase 2: 인벤토리 및 생애주기 관리 (Roadmap)

- **OCR 자동 등록:** 영수증 좌표 기반 품목-가격 매칭 알고리즘으로 보유 제품 일괄 등록.
- **알림 시스템:** 권장 사용 기간(PAO) 데이터 기반 유통기한 D-Day 푸시 알림.
- **시각화 대시보드:** Recharts를 이용한 월별 지출 패턴 및 카테고리별 보유 현황.
