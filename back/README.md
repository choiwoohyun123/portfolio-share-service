# 포트폴리오 공유 서비스 백엔드 코드

## 실행 방법

## 1. Mongodb 서버 구축 (a, b 중 선택)

### a. 로컬 서버

아래 공식 문서 참조 \
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/ \
`mongosh` 커맨드로 서버가 들어가지면 성공적으로 구축된 것입니다. \

### b. Atlas 서버

아래 링크 가입 -> 무료 클러스터 생성 (512MB) \
https://www.mongodb.com/atlas \
왼쪽 아래 SECURITY 의 Database Access -> Add New User -> name, password 설정 \
왼쪽 아래 SECURITY 의 Network Access -> Add IP Address -> current IP 등록 \
왼쪽 위 DEPLOYMENT Databases -> Connect -> Connect your application -> 서버 링크 복사

## 2. Mongodb 서버 url 환경변수에 등록

./.env 파일 수정 \
MONGODB_URL을 위에서 만든 mongodb 서버 링크로 설정

```bash
MONGODB_URL="mongodb://localhost:27017/myDB"  (로컬 서버의 경우 예시)
MONGODB_URL="mongodb+srv://<name>:<password>@cluster0.acaph.mongodb.net/myDB?retryWrites=true&w=majority" (Atlas 서버의 경우 예시)
```

## 3. Express 실행

> yarn은 사실 npm 패키지입니다. yarn부터 설치합니다. (이미 설치 시 생략)

> 이후, 아래 yarn 커맨드는, yarn install 커맨드의 단축키입니다. 즉, 라이브러리 설치 커맨드입니다.

> yarn 입력 시 자동으로, package.json 바탕으로 라이브러리를 한꺼번에 설치해 줍니다.

```bash
npm install --global yarn
yarn
yarn start
```
