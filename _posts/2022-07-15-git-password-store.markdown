---
layout: single
title:  "Git 사용할 때마다 id/password (아이디/비번) 계속 물어보는거 해결 방법"
toc: true
toc_label: "목차"
toc_icon: "list-alt"
toc_sticky: true
date:   2022-07-15 16:27:00 +0900
categories: git
tags: ['git']
<!-- classes: wide -->

---


## 문제사항
Git을 통해서 소스관리를 하려고 할 때마다 지속적으로 비밀번호와 아이디를 물어보는 현상 발생 (귀찮음)


## 해결방법
1. git 의 계정 정보를 다시 묻지 않게 저장함
    ``` ssh
    git config --global credential.helper store
    ```
1. git 의 계정 정보를 세션에 담음 (cached)
    ``` ssh
    git config --global credential.helper cache
    ```
1. git 의 계정 정보를 시간설정하고 세션에 담기 (cached)
    ``` ssh
    git config --global credential.helper 'cache --timeout=600'
    ```



## 결론
1. 위에 설정을 해주면 다시는 안 물어봄


## 참고자료
* [How to fix Git always asking for user credentials](https://www.freecodecamp.org/news/how-to-fix-git-always-asking-for-user-credentials/)