<p align="middle" >
  <img src="https://techcourse-storage.s3.ap-northeast-2.amazonaws.com/0fefce79602043a9b3281ee1dd8f4be6" width="400">
</p>
<h2 align="middle">페이먼츠</h2>
<p align="middle">React 모바일 페이먼츠 애플리케이션</p>
</p>

## 🚀 Getting Started

안녕하세요!
부족한 패키지를 사용해 주셔서 고맙습니다😃

간단한 사용법은,

```
npm i myfirstpackage-payments

or
yarn add myfirstpackage-payments

or
pnpm add myfirstpackage-payments
```

사용하고자 하는 컴포넌트에서 스타일과 함께 컴포넌트를 import 하여 주시면 됩니다.

```
import 'myfirstpackage-payments/styles'
import { Payments } from 'myfirstpackage-payments'


<CardInfoProvider>
  <App>
</CardInfoProvider>

...
isPaymentApp && (
  <Payments />
)
...
```

스타일의 경우, width 사이즈를 100%로 잡아두었습니다.
상위에서 사이즈를 잡아서 사용하시는걸 생각하였어요.
다른 레이아웃을 고민중이시라면 공유 부탁드려요😊

외부에서는 hook을 통하여 값을 확인할 수 있습니다.

```
const  {
    cardInfo,   // 카드를 등록할 때, 카드 정보값 컨텍스트
    updateCardInfo, // 카드 등록을 위한 업데이트 컨텍스트
    cardList, // 등록된 카드리스트 컨텍스트
    updateCardList, // 카드 리스트 업데이트 컨텍스트
  } = useCardInfo()
```
