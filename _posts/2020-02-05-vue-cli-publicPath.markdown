---
layout: single
title:  "vue.config.js 에서 build 시에만 publicPath 변경 방법"
toc: true
toc_label: "목차"
toc_icon: "list-alt"
toc_sticky: true
date:   2020-02-05 00:11:00 +0800
categories: vue-cli
tags: ['vue-cli']
<!-- classes: wide -->

---


## vue cli 는 무엇인가?
vue.config.js를 이야기 하기 전에, [vue cli][vue-cli-homepage]가 무엇인가부터 살펴보아야 한다.
>Standard Tooling for Vue.js Development

vue cli는 vue 개발에 집중 할 수 있도록 webpack을 기반으로 하는 vue 개발 환경 구축 도구이다.

## 그럼, vue.config.js 는 무엇인가?
vue.config.js는 개발서버를 담당하는 @vue/cli-service에서 자동으로 로딩하는 파일로 vue cli의 환경 설정과 webpack 설정 등을 변경등을 할 수 있다. 일반적으로 webpack 사용시에는 webpack.config.js 를 직접 수정하지만, vue cli를 사용할 경우에는 vue.config.js를 통해 webpack까지 설정이 가능하다.

## publicPath 가 무엇인가?
간단히 js, css 와 같은 외부 참조 파일의 경로를 변경할 때 쓰인다.
예를 들어 root 경로가 '/'가 아닌 하위 'user' 폴더를 publicPath로 사용한다고 하면, 모든 js 와 css 파일 앋에 '/user/' 가 붙어야 할 것이다. 이때 사용하는 것이 publicPath이다.
자세한 내용은 [링크][vue-cli-publicpath]를 직접 확인하자.

## publicPath 수정방법
프로젝트 root 폴더에 vue.config.js가 없다면 새로 파일을 생성하고 아래와 같이 추가한다.
```js
module.exports = {
	publicPath: '',
}
```
기존에 사용하는 설정이나 vue.config.js가 있다면, module.pexports 오브젝트 내에 'publicPath' 만 추가해주고 원하는 경로를 value에 적어주면 된다.

## 환경에 따른 publicPath 변경의 필요성
개발환경과 달리 deploy 한 환경에서는 publicPath가 달라질 수 있다. 이에 따라서 Production과 Development 환경에 따른 publicPath를 수시로 변경해줘야하는 경우가 있다. 

예로 github pages를 통해서 프로젝트 페이지에 소스를 업로드할 경우,

	{userID}.github.io/{project_repository}

형태로 주소가 결정되며, root 경로는 {userID}.github.io에 해당된다. publicPath를 {project_repository}로 설정하지 않으면, js와 css 파일 로딩 오류가 발생되며, vue로 제작된 사이트는 아예 보이지 않는 하얀 화면을 마주하게된다.
**반대로, production을 위해서 publicPath를 수정하면 개발환경에서 js와 css 파일 로딩 오류가 발생된다!**

## 환경에 따른 publicPath 변경방법
process.env.NODE_ENV 를 환용한다.
```js
module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/'
}
```

## 결론
process.env.NODE_ENV 를 활용한 조건문을 통하여 환경에 따른 설정을 수정하는 방법을 알게되었다.
outputDir 와 assetDir 등 webpack configure 까지도 환경에 따라 설정을 할 수 있기 때문에 개발환경과 build 된 파일의 경로 문제를 해결할 수 있다.


## 참고자료
* [vue cli 공식 홈페이지][vue-cli-homepage]
* [vue.config.js 설정 관련][vue-cli-publicpath]

[vue-cli-homepage]: https://cli.vuejs.org/
[vue-cli-publicpath]: https://cli.vuejs.org/config/#publicpath