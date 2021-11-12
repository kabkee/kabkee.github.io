---
layout: single
title:  "Vue CLI, Electron에서 실행가능한 Windows BAT 파일 Text Encoding 관련"
toc: true
toc_label: "목차"
toc_icon: "list-alt"
toc_sticky: true
date:   2021-11-12 14:16:00 +0900
categories: ELECTRON
tags: ['electron', 'encoding']
<!-- classes: wide -->

---

## 개발환경
- 필자는 Vue CLI Plugin Electron Builder를 이용하여 Electron을 개발
- MacOS 환경에서 Windows OS 구동 프로그램 개발

## 문제사항
MacOS 환경에서 개발한 프로그램에서 Windows BAT 파일 생성시, Windows에서 실행 안되고 글자가 깨지는 현상 발생

## 문제의 원인
- MacOS 와 Windows 환경에서의 사용하는 Text Encoding의 차이로 글자가 깨짐
- MacOS 개발 환경에서는 UTF-8을 사용하고, Windows CMD(Windows Command Processor)에는 cp949를 기본 Encoding으로 사용한다.
- Electron 개발시 사용하는 Enter를 이용한 줄바꿈은 EOL(End of Line)을 의미하지 않는다.

## 해결 방안
- Windows 환경에 대비하여 BAT 파일 생성시 들어가는 모든 Text는 EUC-KR로 변경해준다. (CP949로 해줘도 되지만, EUC-KR로 코딩해도 충분함) - [참고링크][cp949vsEucKr]
- Electron 개발시 줄바꿈은 Enter가 아닌 OS.EOL 를 사용한다 - [참고링크][EOL 사용하기]

## 결론
1. Windows CMD 용 BAT 개발시 EUC-KR Encoding 사용
2. 줄바꿈은 Enter쓰지말고 OS.EOL 사용


## 참고자료
* [UTF-8 VS EUC-KR][UTF-8 VS EUC-KR]
* [CP949 VS EUC-KR][cp949vsEucKr]
* [NodeJS에서 EOL 사용하기][EOL 사용하기]

[cp949vsEucKr]: https://codingdog.tistory.com/entry/cp949-vs-euc-kr-%EC%96%B4%EB%96%A4-%EC%B0%A8%EC%9D%B4%EC%A0%90%EC%9D%B4-%EC%9E%88%EB%8A%94%EC%A7%80-%EA%B0%84%EB%8B%A8%ED%9E%88-%EC%95%8C%EC%95%84%EB%B4%85%EC%8B%9C%EB%8B%A4
[UTF-8 VS EUC-KR]: https://studyforus.tistory.com/167
[EOL 사용하기]: https://stackoverflow.com/questions/10864486/node-js-constant-for-platform-specific-new-line
