---
layout: single
title:  "Github 에 SSH 등록하기"
toc: true
toc_label: "목차"
toc_icon: "list-alt"
toc_sticky: true
date:   2022-07-15 15:07:00 +0900
categories: github
tags: ['github', 'SSH']
<!-- classes: wide -->

---

## GITHUB 에서 SSH 등록을 왜 해야하는가?
결국은 보안문제이다.
지속적으로 Github 를 통해서 소스관리를 위해서 키(특정 컴퓨터) 등록하여 github의 소스를 Clone, pull, push, fetch 등의 작업을 할 수 있다.

## 문제사항
- "Git error: "Host Key Verification Failed" when connecting to remote repository" 와 같은 에러메시지와 함께 github를 통한 소스관리 불가.
- ssh 등록을 하지 않으면, 소스관리를 위한 github를 이용에 제약이 걸림

## 해결방법
1. ssh-keygen으로 공개키와 개인키를 생성한다.<br/>[Git 서버 - SSH 공개키 만들기](https://git-scm.com/book/ko/v2/Git-%EC%84%9C%EB%B2%84-SSH-%EA%B3%B5%EA%B0%9C%ED%82%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0)
    ``` ssh
    ssh-keygen
    ```
1. github의 'Settings' -> 'SSH and GPG Keys' -> 'New SSH Key'를 통해서 공개키 등록<br/>[Github - SSH and GPG Keys](https://github.com/settings/keys)



## 결론
1. 보안강화로 기존의 id 와 password 만으로는 사용이 불가하게 변하였고,
3. 사이트이외의 컴퓨터 및 서비스에서는 ssh 또는 personal token을 사용하도록 변경되었다.
2. github에 공개키를 등록함으로써 컴퓨터 인증을 하듯 키를 이용하여 소스관리 서비스를 이용할 수 있다.


## 참고자료
* [Git 서버 - SSH 공개키 만들기](https://git-scm.com/book/ko/v2/Git-%EC%84%9C%EB%B2%84-SSH-%EA%B3%B5%EA%B0%9C%ED%82%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0)
* [GitHub 접속 용 SSH 키 만드는 방법](https://www.lainyzine.com/ko/article/creating-ssh-key-for-github/)