---
layout: single
title:  "Azure App Service Timezone 바꾸기"
toc: true
toc_label: "목차"
toc_icon: "list-alt"
toc_sticky: true
date:   2020-02-06 00:13:25 +0800
categories: AzureAppService
tags: ['azure-app-service']
<!-- classes: wide -->

---

## Timezone 변경이 필요한 이유.
Node JS 에서 node-cron 을 이용하여 시간별로 함수를 호출하고 있으나, 설정한 시간에 작동하지 않는 버그를 발견했다.

처음엔 node-cron 자체가 작동 안하는줄 알았지만,<br>
Node가 돌고있는 OS의 시간이 맞지 않아 생긴 문제라는 것을 알게되었다.<br>

***TimeZone을 바꿔야했다.***



## Timezone 변경이 안된다?
대부분의 글들이 "WEB_TIMEZONE" 값을 congifure 화면에서 추가하면 된다는 내용을 다루고 있으나. 정상 작동 되지 않는다.

	일반적인 현상은 지역명은 변경되어 보이지만, 시간이 여전히 UTC 0 시간으로 표기됨.



## 여러 사람 답을 찾은 흔적
필자 뿐만 아니라 여러 사람의 질문들이 있는 것을 확인 할 수 있었다.
[stackoverflow 게시물](https://stackoverflow.com/questions/48760325/azure-web-app-service-time-zone-change-issue)에도 Timezone 설정에 대한 이야기가 나오지만 필자도 작동하지 않았다.

또한, [MicrosoftDocs/azure-docs에도 issue][msdoc-issue]로 올라와 있었다.



## 결론
Linux 환경의 OS라면, 
**<span style='color:red'>'TZ'값을 추가해라.</span>**

개인적으로 여러 답변 중에 Azure 특성상 'TZ'보다는 'WEB_TIMEZONE' 값을 추가하는 것이 좀 더 설득력이 있었지만 결국 <span style='color:red'>답은 'TZ'!!</span>

*Azure VM 또는 Web Service의 OS가 Windows 계열 또는 Linux 계열에 따라 해당 환경 변수값이 달라지는 것으로 확인되었다.*



## 참고자료
* [TZ변수 값으로 사용되는 전세계 TZ database][world-tz-database]
* [WEB_TIMEZONE변수 값으로 사용되는 Azure Default Timezone][azure-default-tz]
* [관련 MicrosoftDocs/azure-docs 타임존 변경 이슈][msdoc-issue]

[azure-default-tz]: https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones
[world-tz-database]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[msdoc-issue]: https://github.com/MicrosoftDocs/azure-docs/issues/33417

