---
layout: single
title:  "Vue CLI, Electron에서의 파일 다운로드 및 저장하기"
toc: true
toc_label: "목차"
toc_icon: "list-alt"
toc_sticky: true
date:   2021-11-12 13:41:00 +0900
categories: ELECTRON
tags: ['electron']
<!-- classes: wide -->

---

## 개발환경
필자는 Vue CLI Plugin Electron Builder를 이용하여 Electron을 개발

## 문제사항
Electron 내에서 제작중인 특정페이지에서 Axios로 받은 Stream 파일 데이터를 fs.writeFile() 함수로 파일로 저장을 하면 파일은 생성이 되는데 데이터가 제대로 저장되지 않는 현상이 발생

## 문제의 원인
Electron에서는 ipcMain과 ipcRenderer로 두가지의 IPC(Inter Procress Communication) 모듈을 가지고 있다.
위에 명시한 문제사항은 파일을 ipcRenderer 영역에서 파일을 다운받아 저장하려고 시도한 것이 문제의 원인이다.

## 해결 방안
1. "다운로드"와 같은 버튼을 누르는 Event 발생시 ipcRenderer에서 ipcRenderer.send(eventName, data) 함수로 ipcMain에게 데이터를 전달한다.
1. ipcMain.on(eventName)로 ipcRenderer에서 전달한 데이터를 fs.writeFile() 함수로 이용하여 저장한다

## 결론
1. ipcMain 과 ipcRenderer 를 이해한다.
3. ipcRenderer에서 ipcMain으로 데이터를 전달한다.
2. 실제 파일저장은 ipcRenderer가 아닌 ipcMain에서 처리를 한다.


## 참고자료
* [Electron의 IPC 통신 - ipcMain과 ipcRenderer][Electron-IPC-ipcMain-ipcRenderer]
* [(소스 예제)electron axios stream download with progress
][electron-axios-stream-download-with-progress]

[electron-axios-stream-download-with-progress]: https://gist.github.com/tvaliasek/be0b54230ccfebb46a8c8654f368af71
[Electron-IPC-ipcMain-ipcRenderer]: https://velog.io/@minidoo/Electron-Electron%EC%9D%98-IPC-%ED%86%B5%EC%8B%A0-ipcMain%EA%B3%BC-ipcRenderer
