---
layout: single
title:  "Github 에러 해결법: Authentication failed for ~ use a personal access token instead"
toc: true
toc_label: "목차"
toc_icon: "list-alt"
toc_sticky: true
date:   2022-07-15 16:12:00 +0900
categories: github
tags: ['github', 'personal access token']
<!-- classes: wide -->

---

## 문제사항
Github 를 통해서 소스관리를 위해서 Clone, pull, push, fetch 등의 작업을 할 경우, 아래와 같은 에러 문구가 나오면서 작동하지 않음
```
remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
fatal: Authentication failed for ~

```

## 해결방법
1. github의 'Settings' -> 'Developer seetings' -> 'Personal access tokens'로 이동
1. 'Generate token' 클릭
1. 'Confirm Access' 페이지가 나오면 인증 진행
1. Token 에 대한 노트, 파기 일자, 권한 등을 설정
1. 'Generate token' 클릭
1. 표시되는 token 복사 (페이지를 바꾸면 다시 볼 수 없음)
1. 해당 토큰을 github id 이후에 password 입력 부분에서 비번대신 입력



## 결론
1. github 외부에서 id/password 를 이용한 인증이 필요한 경우
1. 실제 비밀번호이 아닌 'personal access token'을 생성하여 대신 사용한다.


## 참고자료
* [Github 에러 해결법 - Authentication failed for ~](https://wotres.tistory.com/m/entry/Github-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%EB%B2%95-Authentication-failed-for-use-a-personal-access-token-instead)