---
layout: single
title:  "Docker, Docker Compose가 무엇인지 알아보았다."
toc: true
toc_label: "목차"
toc_icon: "list-alt"
toc_sticky: true
date:   2020-01-15 22:21:00 +0800
categories: Docker
tags: ['docker', 'docker-compose']
<!-- classes: wide -->

---


## Docker를 어떻게 알게되었나?
처음 유튜브 노마드 코더의 [Docker 가 왜 좋은지 5분안에 설명해줌](youtube-nomad) 영상을 처음 접하게 되었다.


## Docker를 공부하게 된 계기는 무엇인가?
지금도 조금의 불편함을 감수하면 큰 변화없이, Docker를 공부하지 않아도 개발할 수 있지만.. 아래와 같은 이유가 공부하게된 계기가 되었다.

* 최근 개발 블로그나 Youtube를 통해서 Docker에 대한 내용을 많이 접하게 되었다.<br>
참고로 도커의 오픈소스 출시는 2013년도 3월이라고 한다.
* NodeJS 버전관리 nvm 을 이용하는 것도 좋지만, 귀찮게 버전은 그때그때 변경하지 않고 필요한 NodeJS 개발 환경별로 개발 환경을 구축할 순 없을까? 하는 의문이 들었다.
* 최신 공개된 소스들 (xampp, wamp, mamp)등 모두 최신 버전을 기본으로 제공하고 있는 등. 서버 환경에 맞추어 개발 환경을 맞추는데 생각보다 많은 시간을 할애하고 어려움을 가지고 있다는 것을 알게 되었다.<br>
특히, 타인에게 내 개발환경을 그대로 전달 또는 배포하는 방법으로 좋겠다는 생각이 들었다.
* "Docker가 다들 그렇게 좋다는데?...", 그냥 궁금했다.
* "Docker 나만 안 쓰는건가? ㅋㅋㅋ ... ㅠㅠ", 조금은 불안했다.<br>
Docker라는 것이 어떤 것인지 알고 이해하는데 그치지 않고, 필요할때 사용할 수 있는 수준이 되고 싶었다. ~"필요한 날은 꼭 올 것만 같아"~

[ActiveLAMP의 Building a Local Dev Environment with Docker](activelamp-why-docker)에서는 왜 Docker를 써야하는지에 대해서, 그리고 Docker를 쓸때의 장점에 대해서 잘 설명하고 있다.

## Docker란 무엇인가?
간단히 정리하자면, 아래와 같다.

* 소프트웨어(Application 단위 혹은 OS)를 Container 개념으로 블럭처럼 조합하여 운영할 수 있는 오픈소스 소포트웨어 플랫폼이다.
* SOA(Service Oriented Architecture) 또는 Microservices를 기반으로 다양한 서비스(소프트웨어)를 조합하여 인프라스트럭처를 만들 수 있다.
* 개발 또는 배포 환경차이에서 오는 개발자의 어려움을 해결하여 안정적 배포를 할 수 있는 환경을 쉽게 만들고 운영하는데 도움을 준다.
* 더 자세한 내용은 [위키피디아 도커(소프트웨어)](https://ko.wikipedia.org/wiki/%EB%8F%84%EC%BB%A4_(%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4)) 참조
* 내가 느낀건..
	* 간결하면서도 신기했다.
	* 각 서비스별 세부 설정은 복잡할지 몰라도, 서버나 서비스가 이렇게 쉽게 구성/조합 될 수 있는 것인지 신기했다.
	* 거짓말 조금 보태면 Android Google Store에서 앱 선택하고 다운하는 느낌?!
	* "운영중인 서비스에서 필요한 특정 기능을 Microservice로 쉽게 제공 할 수 있겠다." 는 생각이 바로 들었다.
	* "1개 서버에서 다중 서비스(vhost 이용)를 운영중인데, 각각의 서버를 Container로 감싸 Proxy 서버를 통해서 Docker를 통해 관리/운영하면 서버 관리가 편리하겠다." 는 생각이 들었다.<br>
	~서버 하나때문에 서버 리부팅하면 다 다운되버린다능.~


## Docker Containers VS Virtual Machines
VM과 Docker의 Container가 비슷한데, 두개의 차이점이 뭘까?
사용해본 결과, 인터넷 연결 속도만 느리지 않다면 Docker(Container) 사용이 매력적이다.

마치 pm2를 활용한 nodeJS 관리와 흡사하지만, OS와 DB, NodeJS 등의 서비스를 이미지화(images)된 상태로 스위치 켜고 내리는 것처럼 실행과 중단이 용이하다는데 놀라웠다. 동일한 설정 상태를 타인에게 배포/공유가 용이한 것은 비슷하지만, Docker는 VM과 같이 VM Image전체를 공유하는 것이 아닌 스펙만을 정의하여 공유하면 Docker가 필요한 것들을 설치해주기 때문에 Container가 더 매력적이다.

자세한 차이점 설명은 [공식 사이트 링크](https://www.docker.com/resources/what-container)를 확인하자.

>단언컨데, 윈도우를 제외한 개발환경은 이제 나는 Virtual Box 쓸일이 없을 것이다.


## Docker 실행
다른 자료들이 너무 잘 정리되어있기 때문에 본문에서는 간단한 개념만 짚으려 한다.
1. Docker와 Docker Compose라는 것 통해서 실행 및 종료, 관리 된다.
1. Docker는 Dockerfile 이라는 것을 통해서 설정하고 Docker Compose는 'docker-compose.yml'을 통해 설정한다.
1. 실행은
```bash
	Docker build
	Docker run
```

과 같은 명령어로 Container를 생성(이미지화)하고 실행 시킨다.
1. Docker Compose는 다수의 Container 또는 조합을 한번에 실행 및 종료 시킬 수 있는 도구이다.

자세한 설명은 아래 [widthj-kr의 DOCKER 강의][withj-kr-docker-lecture]를 통해 듣도록 하자.
Docker Compose 사용관련한 설명은 Docker를 이용한 LAMP 설정 방법을 설명한 [How to create a docker-based LAMP stack using docker-compose on Ubuntu 18.04 Bionic Beaver Linux](docker-lamp-compose)를 참조하자.
여러 강좌나 블로그를 확인했지만, 가장 인상적이고 가장 잘 설명한 것은 withj-kr의 DOCKER 강의였고, 내가 원하는 바를 명확하게 설명하고 있었다.


## 결론
막연했던 Docker의 개념과 쓰임에 대해서 알 수 있는 기회였고, 새로운 개발환경 구축에 당연하게도 이용할 것으로 판단되는 개발 도구라고 생각한다. Docker를 이용하여 다수의 서비스를 너무나도 쉽게 설치 및 실행, 활용할 수 있는 것에 놀랐으며 Docker Container 개념을 이용한 서비스인 [Google Cloud](https://cloud.google.com/)가 있다는 사실도 알게되었다. 서버리스(Serverless) 개발환경을 얘기하는 요즘, Backend의 환경구축이 얼마나 단순화되고 환경 구축의 장벽이 사라지고 있는지 알 수 있는 기회였다.



## 참고자료
* [Docker 가 왜 좋은지 5분안에 설명해줌][youtube-nomad]
* [widthj-kr의 DOCKER 강의][withj-kr-docker-lecture]
* [How to create a docker-based LAMP stack using docker-compose on Ubuntu 18.04 Bionic Beaver Linux][docker-lamp-compose]
* [Youtube-ActiveLAMP, Building a Local Dev Environment with Docker][activelamp-why-docker]

[youtube-nomad]: https://www.youtube.com/watch?v=chnCcGCTyBg
[withj-kr-docker-lecture]: https://medium.com/withj-kr/tagged/docker
[docker-lamp-compose]: https://linuxconfig.org/how-to-create-a-docker-based-lamp-stack-using-docker-compose-on-ubuntu-18-04-bionic-beaver-linux
[activelamp-why-docker]: https://www.youtube.com/watch?v=FiaLKwdv9TI
ㄴ