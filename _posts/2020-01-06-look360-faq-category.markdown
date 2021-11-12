---
layout: single
title:  "LOOK360 FAQ 게시판 카테고리 설정"
toc: true
toc_label: "목차"
toc_icon: "list-alt"
toc_sticky: true
date:   2020-01-07 15:54:00 +0900
categories: LOOK360
tags: ['look360-dev-note', 'kimsq1.2-bbs-theme']
<!-- classes: wide -->
---

LOOK360 FAQ에 카테고리 설정 및 제목이 수정되었습니다.

## 문제사항
* FAQ 게시판 느낌이 들지 않음<br>
~~아직도 완벽하게 해결되지 않음, 디자인적인 문제인 듯~~
* FAQ 질문의 종류별로 구분할 수 없음


## 해결방법
1. 게시글 카테고리별로 구분
1. FAQ 질문 종류를 선택할 수 있는 카테고리 나열 디자인 적용<br>
[참고 사이트 - kt.com/pc/faq][kt-faq]
![KT 자주하는 질문 사이트](/assets/img/2020/01/look360_faq/faq_1.png "KT 자주하는 질문 사이트 캡처")
1. 'FAQ' 라는 게시판 제목이 잘 보이게 변경, "FAQ -> 자주하는 질문"


## 결과물

### 변경 전

* 게시물 제목에 카테고리를 포함하고 있어, 제목으로 카테고리를 검색해야 함.
* 게시물 종류를 제목으로 검색하니 직관적이지 않음.


| ![카테고리와 제목 / 변경 전](/assets/img/2020/01/look360_faq/faq_2.png "카테고리와 제목 / 변경 전") |
|:--:|
| *카테고리와 제목 / 변경 전* |

| ![카테고리 적용 전/후 게시물 목록](/assets/img/2020/01/look360_faq/faq_3.png "카테고리 적용 전/후 게시물 목록") |
|:--:|
| *카테고리 적용 전/후 게시물 목록* |


### 변경 후

* 게시물 제목에서 카테고리를 분리.
* 카테고리별 게시물 열람이 용이해짐.
* 카테고리 선택을 `<select>` HTML element 를 사용하는 것이 아니라 나열된 네비게이션 메뉴에서 선택하기 때문에 직관적임.



| ![카테고리와 제목 / 변경 후](/assets/img/2020/01/look360_faq/faq_4.png "카테고리와 제목 / 변경 후") |
|:--:|
| *카테고리와 제목 / 변경 후* |





## 참고자료
* [KT 자주하는 질문][kt-faq]
* [LOOK360 FAQ 게시판][look360-faq]

[kt-faq]: https://ermsweb.kt.com/pc/faq/faqListCate.do
[look360-faq]: https://look360.kr/?m=bbs&bid=faq



