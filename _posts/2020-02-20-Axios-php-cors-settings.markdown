---
layout: single
title:  "Axios 사용을 위한 PHP CORS 설정"
toc: true
toc_label: "목차"
toc_icon: "list-alt"
toc_sticky: true
date:   2020-02-20 12:45:00 +0900
categories: PHP
tags: ['php-cors']
<!-- classes: wide -->

---

## Cross Domain 정의
자바스크립트(Javascript)의 보안 정책의 하나인 Same-Origin Policy는 스크립트 실행되는 페이지와 비동기 호출시 주소의 프로토콜,호스트,포트가 같아야 한다.
Same-Origin이 아닌 경우의 호출을 Cross Doamin이라고 한다.

## Cross Domain 의 필요
Web 개발 방식이 Server side render 방식을 주로 채용하여 사용하는 기존의 방식에서 Client 와 Server 를 구분하는 Front & Back ends 개발이 추세다. 앱 개발이 일반화되면서 Web 또한 하나의 Client로 보는 시각이 생기면서 Web Server와 Backend Server의 구분이 생기면서 Cross Domain 문제가 발생하게 된다.
이를 해결해 줘야한다.

## CORS 설정을 위한 Headers
서버에 해당되는 Backend 에서 일반적인 CORS 설정 값은 Header 값을 이용한다. ***일반적으로는*** 아래와 같이 한줄이면 해결된다.
	
	Access-Control-Allow-Origin *

* CORS 설정을 위한 Header 값들
	* Access-Control-Allow-Origin
	* Access-Control-Allow-Credentials
	* Access-Control-Allow-Methods
	* Access-Control-Allow-Headers
	* Content-type


## Axios 사용을 위한 PHP CORS 설정
본격적인 Axios 통신을 위한 설정 설명.
1. **Access-Control-Allow-Credentials: true**
	Axios로 POST 방식 호출을 Cross doamin 으로 할 경우 CORS 설정을 하지 않으면 통신자체가 불가능하게 된다. AXIOS POST 호출을 성공한다고 해도 withCredentials 설정 값을 true로 하지 않으면 브라우저상의 Header(쿠키값 포함)을 참조하지 않고 Axios 별도의 Connection을 생성하여 호출을 하게 된다. 따라서, 로그인상태 유지와 같은 쿠키값 사용을 위해서는 Axios withCredentials 값을 true 로 해야하고, 이를 서버에서 받으려면 Credentials true 설정을 해야한다.
2. **Access-Control-Allow-Origin : {API 호출 Client Domain}**
	Axios withCredentials 값을 True로 설정하는 경우, "Access-Control-Allow-Origin: *" 설정은 사용할 수 없게 된다. 명확히 허용할 IP 또는 도메인을 명시해야한다.

		예) Access-Control-Allow-Origin: client.google.com // client.google.com에서 오는 호출을 받아주겠다.

3. **Access-Control-Allow-Methods : POST, GET, PUT, DELETE, OPTIONS**
	Methods 중에 맨 뒤 'OPTIONS'가 생소했다. Axios가 POST 호출을 하기 전에 OPTIONS의 형태로 정식 호출을 하기 이전에 서버와 통신이 가능한지를 확인하기 위해 preflight을 시행한다. 이때 사용하는 호출 방식이 OPTIONS 이기 때문에 허용해줘야한다.
4. **Access-Control-Allow-Headers: Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization**
	모두 사용해도 되지만 사용하는 Header 값들만 본인 서버에 맞추어 설정하면 된다.
5. **여기까지 PHP 소스 모아보기**
```php
header('Access-Control-Allow-Origin : {API 호출 Client Domain}'); // 예시. header('Access-Control-Allow-Origin : http://client.google.com');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
header("Content-type:text/html;charset=utf-8");
```

## 다중 Access-Control-Allow-Origin 허용 PHP 코드
다중 Allow-Origin 허용은 wildcard(*)를 사용하여 바로 가능하지만, credentials 값을 true 할 경우는 와일드카드를 사용할 수 없기 때문에 코드로 제작해야한다.
공식적으로는 Access-Control-Allow-Origin 설정 값을 1개의 값으로만 설정할 수 있다. 하지만, 이를 PHP 조건을 이용하여 제작하면 아래와 같다.
```php
$httpOrigin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : null;
if (in_array($httpOrigin, [
	// 여기 Array에 허용하려는 IP 또는 DOMAIN을 추가하면 된다.
	'http://localhost:3000', // Dev Client Server using CORS
	'http://client.google.com', // Prod Client Server using CORS
]))
header("Access-Control-Allow-Origin: ${httpOrigin}");
```

## 트러블슈팅
1. **위에 방법으로 설정을 했는데도 wildcard(*) 허용을 하면 안된다는 오류가 나오는 경우 또는 Access-Control-Allow-Origin 관련 오류를 만나는 경우,**
**=>** .htaccess 파일이나 서버 ini 파일내에 Access-Control-Allow-Origin 설정이 되어있는지 확인해라. PHP에서 설정을 한다해도 서버내의 설정을 우선시 한다.
<br/>

2. **Axios를 preflight 통신 실패의 경우,**
**=>**'Access-Control-Allow-Methods'에서 'OPTIONS'를 설정하지 않았거나 'Access-Control-Allow-Credentials'를 'true'로 설정하지 않았다.
<br/>

3.  **Axios 호출시 로그인상태 유지가 안되는 경우,**
**=>** Axios설정 문제로 withCredentials 값을 true 로 설정하거나, Nuxt.js 사용시에는 nuxt.config.js 의 axios.credentials 값을 true 로 설정해라.


## 결론
Express 의 경우에는 CORS Middleware를 이용하여 쉽게 해결할 수 있었지만, PHP에서 설정을 하면서 Credentials 설정이나, wildcard 사용 통신 허용에 대한 엄격한 기준에 대해서 알게 되겠다.


## 참고자료
* [Axios : CORS error No 'Access-Control-Allow-Origin' header is present on the requested resource #569][axios-cors-no-origin]
* [Axios : preflight request with OPTIONS method][axios-preflight-options-method]
* [Access-Control-Allow-Origin가 wildcard(*)일 때 왜 인증정보를 포함한 요청은 실패하는가(why failed get data with cors policy and wildcard)][why-failed-cros-with-wildcard]
* [다중 Domain 허용 PHP Code 참고링크][multi-domain-allow-origin-php]

[axios-cors-no-origin]: https://github.com/axios/axios/issues/569
[axios-preflight-options-method]: https://okky.kr/article/498449
[why-failed-cros-with-wildcard]: https://www.hahwul.com/2019/04/why-failed-get-data-with-this-cors-policy.html
[multi-domain-allow-origin-php]: https://stackoverflow.com/a/59881217/2043471