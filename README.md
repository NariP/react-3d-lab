# Title
Three js 연습

### Version
- node: v20.11.1
- pnpm: v9.0.6

### Start
```
# install
pnpm i

# devserver start
pnpm dev
```

http://localhost:3000/

### 실습을 위해 필요한 라이브러리
- three
  - Three.js 코어 라이브러리
- @react-three/fiber
  - React 렌더러 for Three.js
- @react-three/drei
  - 유용한 헬퍼 컴포넌트와 훅 모음
- @types/three (optional)
  - 타입

### Nextjs 를 사용한다면?
```js
// next.config.js
module.exports = {
  transpilePackages: ['three']
}
```