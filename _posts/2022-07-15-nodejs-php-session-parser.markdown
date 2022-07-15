---
layout: single
title:  "NodeJs에서 PHP Session Parsing 하기"
toc: true
toc_label: "목차"
toc_icon: "list-alt"
toc_sticky: true
date:   2022-07-15 16:34:00 +0900
categories: nodejs
tags: ['nodejs', php session parsing']
<!-- classes: wide -->

---


## 문제의 발단
- NodeJS 서버와 PHP Apache 서버간의 Session 공유 방법을 찾음
- redis에 세션을 담아 공유하는 방법을 찾음
- Legacy PHP 버젼에 의한 redis 호환문제로 인하여 redis 설정에 문제 발생
- 대안으로 MySQL, MarinaDB를 활용하는 방법을 찾음
- PHP Session을 MySQL에 저장하는 방식을 구현함.

## 문제사항
- NodeJS에서 PHP Session에서 MySQL에 저장한 Session을 확인할 수 있음
- 확인한 Session이 String으로 구성된 이상한 구조임
- Javascript Object 형이나 Array 형으로 파싱이 필요함

## 해결방법
다양한 방법이 검색결과로 나왔으나, 아래 소스를 활용함
[session_decode.js](https://github.com/vianneyb/phpjs/blob/master/functions/var/session_decode.js)


## 결론
1. 이미 선배, 선조가 비슷한 고민을 했던 것을 확인할 수 있었음
1. 이미 소스까지 제작하여 공개 해놓음
1. 잘쓰기만 하면 됨.

<span style='color:red'>* NodeJS에서 위에 파서는 열람용이며, PHP Session 을 수정하고 업데이트 하는 것용도는 아님. <strike>(수정, 업데이트는 하지 않는 걸로...)</strike></span>


## 참고자료
* [session_decode.js](https://github.com/vianneyb/phpjs/blob/master/functions/var/session_decode.js)