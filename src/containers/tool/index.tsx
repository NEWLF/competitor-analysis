import { colors } from "@boxfoxs/bds-common";
import { Button, Divider, Spacing, Text } from "@boxfoxs/bds-web";
import { defaultPrompt } from "constants/defaultPrompt";
import { useAsyncCallback } from "hooks/useAsyncCallback";
import { useInputState } from "hooks/useInputState";
import { uniq } from "lodash";
import { useState } from "react";
import { requestFirst } from "remotes/chat-gpt/request";
import { Result } from "types/Result";
import { ResultSection } from "./components/ResultSection";
import { StyledTextArea } from "./components/StyledTextArea";

const defaultData = [
  {
    id: 9786223,
    content:
      "프리오더인데 바로 다음날 도착했네요이번시즌은 화장이 줄어서 수선할 필요도 없이 딱 좋아요",
    rate: 5,
    age: "31",
    gender: "M",
  },
  {
    id: 9874850,
    content:
      "소매가 손 반정도 덮어서 딱 좋습니다. 부드럽고 색감도 원하던 색이고 기장도 무릎 아래까지 와서 잘맞네요",
    rate: 5,
    age: "27",
    gender: "M",
  },
  {
    id: 9835448,
    content:
      "HIS제품 처음사봤는데 핏도 착 감기고 역시 고급스럽네요.쿠어나 인사일런스같은 도메스틱에서 괜찮다는 브랜드들 주로 입어봤는데 비슷한듯 좋네요ㅎㅎ 잘입겠습니다.",
    rate: 5,
    age: "33",
    gender: "M",
  },
  {
    id: 9831584,
    content: "단추에 데미지 있는거 빼고는 이 가격에 좋은 퀄리티의 코트같습니다",
    rate: 4,
    age: "29",
    gender: "M",
  },
  {
    id: 9823093,
    content:
      "두께감보통이에요포장꼼꼼해요빠른 배송이 맘에 들어요사진상 색감이랑 큰차이 없어서 맘에 들어요",
    rate: 3,
    age: "36",
    gender: "M",
  },
  {
    id: 9832410,
    content:
      "헤마칸이 왜 인기 많은지 알거같아요 부드럽고 핏도 정말 이쁩니다 저번시즌거는 어떤지 모르지만 요번 시즌이 팔기장이 줄었다고 하는데 그래서 그런지 이쁘게 떨어지네요 상체발달형인데도 세미오버핏으로 딱 좋아요",
    rate: 5,
    age: "28",
    gender: "M",
  },
  {
    id: 9873243,
    content:
      "추워지기전에 미리 싸게 구입한것갘습니다. 없는 유형 자켓이라 구매했습니다. 이쁘네요.",
    rate: 5,
    age: "36",
    gender: "M",
  },
  {
    id: 9873280,
    content:
      "키가작아서 확실히 총장길이랑 팔길이는 많이 긴편입니다. 무게가 무겁지만 겉촉감은 부드럽고 좋네요.",
    rate: 5,
    age: "36",
    gender: "M",
  },
  {
    id: 9872346,
    content: "작년부터 사고싶었는데 시기를 놓쳤다가 올해에 구입하네요 이뻐요",
    rate: 5,
    age: "34",
    gender: "M",
  },
  {
    id: 9851395,
    content: "그냥 다 좋은데. .. 팔이 넘 길어요 손가락만 나와요 ㅋㅋㅋㅋ",
    rate: 3,
    age: "42",
    gender: "M",
  },
  {
    id: 9873264,
    content: "엘플데이 행사할때 후딱 샀어요. 팔길이가 좀 길긴한데 예뻐요~",
    rate: 5,
    age: "24",
    gender: "M",
  },
  {
    id: 9873892,
    content: "적당한길이에 적당한 가격으로 잘산거같아요 소매는 긴편이긴해요",
    rate: 5,
    age: "26",
    gender: "M",
  },
  {
    id: 9871179,
    content:
      "너무 오버핏이 부담스러우면 S도 괜찮은 선택이에요 평소 L나 XL입습니다",
    rate: 5,
    age: "41",
    gender: "M",
  },
  {
    id: 39716136,
    content:
      "두께감이 있고 살짝 무겁네요 색은 찐하고 보온은 따뜻하네요. 생각한것만큼 디자인이 심플해서 마음에 꼭 드네요",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 40165967,
    content:
      "기장도 오히려 적당해서 좋고 이쁩니다.재질도 부드럽고 좋네요.잘 입겠습니다",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 40200038,
    content: "색감이 캐쥬얼해서 캐쥬얼하게 매치해봤어요~ 괜찮네요",
    rate: 4,
    age: "",
    gender: "",
  },
  {
    id: 40147552,
    content:
      "상품 진짜 대만족! 캐시미어 소량 들어갓지만 재질 너무 좋아요!M사이즈 진짜 큽니다 오버핏 조아하는데너무 커서 S사이즈로 교환햇습니다",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 39909312,
    content:
      "두께가 그리 두텁지는 않지만 가볍고 보온성은 좋은 느낌이에요가족 선물했는데 색감이 어둡고 여기저기 편하게 매치하기 좋아 흡족해하네요촉감 부드럽고 소재가 좋은 티가 나서 좋아요한사이즈 이상 크게 나온 느낌이라 보통체격인데도 세미오버핏에 팔기장도 조금 기네요사진은 위에서 찍어서 많이 부해 보이는데 적당한 세미오버핏이에요",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 9789623,
    content:
      "엄청 이쁘다하는 아이템은 아니지만 데일리로 입기에 이만한 가성비는 없을 것 같음",
    rate: 4,
    age: "36",
    gender: "M",
  },
  {
    id: 40361110,
    content:
      "팔이 살짝 긴 감이 있는데 오버핏으로 입을거라서 딱 이쁘게 떨어지네요. 재질도 좋고 만족합니다!",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 9877274,
    content:
      "코트는 별로 없기도 하고 추천이 많아서 구매했는데 팔길이 빼고 만족합니다. 잘 입을게요~",
    rate: 5,
    age: "38",
    gender: "M",
  },
  {
    id: 40392618,
    content:
      "좋아요 겨울동안 정말 유용하게 입었습니다. 무거운감이 있지만 발마칸 코트 특성상 이정도면 괜찮은거 같습니다",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 9870848,
    content:
      "XS사길 잘했네요팔길이도 딱맞고 총장도 적당해요조금 무거운 감은 있지만 따뜻하겠죠",
    rate: 5,
    age: "35",
    gender: "M",
  },
  {
    id: 40262982,
    content:
      "헤이그 발마칸 아주 물건입니다.크지 않고 사이즈 좋고 재질도 좋습니다.헤이즈 파이팅!",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 9870988,
    content: "이쁘고좋아요 매우 만족해요 만졋을때 느낌도조아요 ㅅ굿굿",
    rate: 5,
    age: "48",
    gender: "M",
  },
  {
    id: 9876899,
    content: "소매만수선하면되것네요 조금무겁긴한데겨울옷이니까뭐..암튼 만족",
    rate: 5,
    age: "38",
    gender: "M",
  },
  {
    id: 9846705,
    content:
      "옷이 많이 무거워서 완전 한겨울 코트니 그점 감안하셔서 조금 크게사시는거 추천드립니다",
    rate: 5,
    age: "28",
    gender: "M",
  },
  {
    id: 9870869,
    content: "작년에 못사서 올해 샀는데 만족스럽네요소매가 좀 길긴해요",
    rate: 5,
    age: "33",
    gender: "M",
  },
  {
    id: 40444089,
    content: "만족합니다 찾던 제품에 찾던 핏이에요 질도 좋아요",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 9803931,
    content:
      "듣던대로 소매가 엄청 길어요 그리고 품도 꽤 큰편이네요오버하게 입는 맛으로 입으려 합니다",
    rate: 4,
    age: "41",
    gender: "M",
  },
  {
    id: 9890147,
    content: "입어보니 왜 이 제품이 유명한지 바로 알겠어요너무 이쁘고 좋아요",
    rate: 5,
    age: "31",
    gender: "M",
  },
  {
    id: 9882005,
    content:
      "178cm76kg사이즈 적당하고 가격대비 핏도 좋음겨울 옷은 대부분 패딩류이고후드 없는 코트는 처음인데 적당히 질 맞아요.가성비 훌륭한거 같음",
    rate: 5,
    age: "49",
    gender: "M",
  },
  {
    id: 9893711,
    content: "정사가세요 오버하게 이쁩니다팔작년보다 짧게나와서 정사가세요ㅔ",
    rate: 5,
    age: "31",
    gender: "M",
  },
  {
    id: 9892746,
    content:
      "일단 저는 178/71에 마른 체형입니다헤지스 발마칸 코트가 평이 좋아서 구매하게 됐구요S로 갈지 M으로 갈지 고민하다가 M으로 갔는데 소매가 좀 긴거 같습니다전체적으로 보면 오버핏 느낌 나게 입을 수 있을 것 같고 코트 안에 겨울 니트 껴입고 입어보니 사이즈 적당히 크다고 느껴졌습니다",
    rate: 5,
    age: "31",
    gender: "M",
  },
  {
    id: 9892738,
    content:
      "배송도 빠르고 도착하자마자 입어봤는데 저 한테 사이즈도 살짝 세미 오버핏으로 딱이였습니다",
    rate: 4,
    age: "36",
    gender: "M",
  },
  {
    id: 9880728,
    content:
      "촉감 디자인 모두 만족해요 무겁다는 평이 있는데 크게 무겁지는 않습니다",
    rate: 5,
    age: "53",
    gender: "F",
  },
  {
    id: 40620613,
    content:
      "생각보다 오버하고 기장도 긴 편이에요. 무게도 꽤 나가지만 질은 좋아요",
    rate: 4,
    age: "",
    gender: "",
  },
  {
    id: 9876676,
    content:
      "세일을 많이해서 저렴한 가격에 구매했어요코트 두툼하고 딱 제가 원하는 네이비색상에 청바지 슬랙스 스웻팬츠 등 다양한 분위기 연출이 가능해요",
    rate: 5,
    age: "34",
    gender: "M",
  },
  {
    id: 9887100,
    content: "네이비 코트 사려했는데 질두 좋고 고급스럽네요. 잘 샀어요.",
    rate: 5,
    age: "45",
    gender: "M",
  },
  {
    id: 9879375,
    content: "만족합니다 할인도 많이 되고 사이즈도 딱이예요겨울이 기다려집니다",
    rate: 5,
    age: "28",
    gender: "M",
  },
  {
    id: 9888650,
    content: "부드럽고 핏도 예쁩니다 세일가격에 나름 적절한 가격에 구매한듯",
    rate: 5,
    age: "41",
    gender: "M",
  },
  {
    id: 9891384,
    content:
      "잘받았습니다. 가격은 좋게 산거 같은데 생각보다 코트 사이즈가 더 크네요. 워메",
    rate: 5,
    age: "38",
    gender: "M",
  },
  {
    id: 40692394,
    content:
      "오버한 느낌의 코트입니다. 다른 후기들 처럼 어깨선이 있는 옷이 아니라 팔이 다소 길게 느껴질수 있으나 캐쥬얼한 느낌으로 코트가 이뻐요. 할인할 때 사서 좋았어요",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 9894511,
    content: "배송도 빠르고 옷도 유명하니 좋네요. 살짝 오버핏 느낌으로 사봐요",
    rate: 5,
    age: "36",
    gender: "M",
  },
  {
    id: 9888559,
    content:
      "생각보다 배송은 빠르게 왔습니다 다른 색상 배송은 맘에 안드는게 많았는데 이건 괜찮아서 다행입니다",
    rate: 4,
    age: "31",
    gender: "M",
  },
  {
    id: 9884175,
    content:
      "처음에 m로 주문했다가 너무 커서 S로 교환하였는데 사이즈가 딱 맞습니다배송도 빠르고 너무 만족합니다",
    rate: 5,
    age: "33",
    gender: "M",
  },
  {
    id: 9884825,
    content:
      "발마칸 코트는 다양한 코디에 활용하기 좋아 없어서는 안 되는 남자 겨울코트로 손꼽히는 아우터입니다.캐주얼룩이나 남친룩은 물론 미니멀 패션에도 잘 어울리며, 어떤 룩에도 매치하기 좋아 남녀 모두에게 사랑받는 아우터라고 볼 수 있죠.전체적으로 여유있는 사이즈로 출시되었고 아래로 내려갈수록 넓어지는 A라인이 특징입니다. 발마칸 코트도 다양한 핏이 존재하는데,지금까지 여러 발마칸을 입어봤을때 느낀점은 아래로 내려갈수록 넓어지는 핏이 가장 내추럴하면서 자연스럽고 꾸안꾸 코디로 입기 가장 좋았어요.히스헤지스 발마칸 코트는 취향에 따라서 컨버터블 칼라를 통해 넥라인을 오픈할수도, 따뜻한 보온성을 위해 클로징할수도 있는데요.두가지 스타일 모두 자연스럽게 예뻐서 그때그때 느낌에 따라서 스타일링하면 좋겠더라구요.",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 9880776,
    content:
      "오버사이즈고 두툼한 코트입니다.엄청 크다는 얘기가 많았는데 L사이즈 괜찮네요",
    rate: 4,
    age: "34",
    gender: "M",
  },
  {
    id: 9891413,
    content: "빠른 배송 고맙습니다.데일리용으로 딱이에요.사이즈도 잘 받네요.",
    rate: 5,
    age: "41",
    gender: "M",
  },
  {
    id: 9935620,
    content:
      "좋은가격에 좋은 코트 샀네요고급진 네이비 색깔에 고급진 코트 맛이 느껴집니다!",
    rate: 5,
    age: "34",
    gender: "M",
  },
  {
    id: 9945359,
    content:
      "팔이 조금 길지만 좋아요. 색감은 전형적인 남색이라 조금 밝다고 느껴질순 있습니다.",
    rate: 5,
    age: "28",
    gender: "M",
  },
  {
    id: 9950619,
    content: "아주좋아요~~~ 약간 무겁긴한데 따뜻해서 좋네요. 올겨울은 이걸로.",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 9934177,
    content:
      "역시 스테디 발마칸 킹쁘네요..s갔으면 무조건 컸을듯요지금도 사실 기장이랑 소매 좀만 더 짧았으면 좋겠어요",
    rate: 4,
    age: "23",
    gender: "M",
  },
  {
    id: 9945780,
    content:
      "겨울에 입기좋은 두꺼운 코트입니다 확실히 소매가 기네요 한사이즈 작게 가도 좋을듯",
    rate: 5,
    age: "24",
    gender: "M",
  },
  {
    id: 9936180,
    content:
      "원래 모직코트가 좀 무거운가요?170cm의 65kg의 아들이 입었는데 단정해보이고디자인이며 길이감이며 딱 좋아요",
    rate: 4,
    age: "46",
    gender: "F",
  },
  {
    id: 9930304,
    content:
      "생각보다는 무겁네요 한사이즈 다운시키길 잘한것 같네요 색감도 그렇고 만족합니다",
    rate: 5,
    age: "33",
    gender: "M",
  },
  {
    id: 9936508,
    content:
      "소매길이가 좀 길고 기장은 짧은 느낌이 있긴 하지만 전체적으로 딱 이쁘게 떨어지는 핏입니다.",
    rate: 5,
    age: "24",
    gender: "M",
  },
  {
    id: 10000425,
    content: "진짜 물건입니다. 이가격에 이런퀄리티라니…. 정말 만족합니다.",
    rate: 5,
    age: "33",
    gender: "M",
  },
  {
    id: 9933592,
    content:
      "와 정말 원단도 괜찮고 핏도 괜찮고 한겨울에나 초겨울에나 입어도 될것 같아요 너무 만족합니다.",
    rate: 5,
    age: "34",
    gender: "M",
  },
  {
    id: 9933598,
    content: "재질도 부들부들해서 너무 좋고 핏도 좋아요!구매하길 잘한것같아용",
    rate: 5,
    age: "27",
    gender: "M",
  },
  {
    id: 9911411,
    content:
      "부드럽고 소매길이도 살짝 긴듯 하지만 괜찮습니다20만원정도면 괜찮은듯 합니다",
    rate: 4,
    age: "23",
    gender: "M",
  },
  {
    id: 9967294,
    content:
      "오버핏으로 딱 좋습니다. 안에 헤비 후드 입고 입어도 활동에 불편하지 않을 정도 입니다. 가볍지만 겨울에 입어도 따뜻할 것 같아요.",
    rate: 5,
    age: "38",
    gender: "M",
  },
  {
    id: 9951694,
    content: "가성비 훌륭합니다. 사이즈는 한사이즈 다운하면 맞으실듯요",
    rate: 5,
    age: "40",
    gender: "M",
  },
  {
    id: 9980154,
    content:
      "다른건 다 괜찮은데 소매 길이가 너무 짧아서 늘리는 수선 했습니다.2.5cm정도까지된대서 다 뺐더니 좀 괜찮아졌습니다.종종 입어야겠네요사진은 수선전 소매가 매우 짧은상태 참고용...",
    rate: 5,
    age: "37",
    gender: "M",
  },
  {
    id: 9949464,
    content:
      "쿠폰 이용해서 좋은 제품 싸게 잘 구입했습니다. 디자인도 예쁘고 사이즈도 딱 맞네요.",
    rate: 5,
    age: "41",
    gender: "M",
  },
  {
    id: 9978294,
    content:
      "상당히 크네요 이불 느낌입니다 대신 포근하고 자연스럽게 떨어져서 그렇게 이상하진 않아요.",
    rate: 5,
    age: "29",
    gender: "M",
  },
  {
    id: 9896946,
    content:
      "진짜 이쁘고 촉감도 좋습니다. 충분히 투자할만한 가치가 있는 옷입니다. 사이즈는 사이즈표대로 평소 L~XL을 입는 분은 M사이즈 그대로 가면 이쁘게 맞을거라 생각합니다. 여유 있게 떨어지는 핏인데, 이불처럼 나풀거리지 않고 몸의 체형을 그대로 타고 흘러내리면서 약간의 무게감이 몸을 잡아주는 기분좋은느낌입니다. 사이즈 고민을 많이 했는데 S였다면 좀 더 딱 맞았겠지만 그래서 아쉬웠을테고, L이었다면 너무 컸을 것 같습니다. 발마칸코트의 특성상 트렌치코트와는 다르게 추운날씨 보온의 목적이 크고 그렇기에 추운 날 코트 안에 껴입을 옷들을 생각한다면 M사이즈가 마냥 크다고는 느껴질 수 없을 것입니다. 몸에 딱붙어 체형의 단점을 부각하거나 너무 펑퍼짐해 마치 코트에 몸을 맡기고 끌고 다닌다는 느낌이 없다는게 이 코트 디자인의 가장 큰 장점입니다.색상 역시 훌륭합니다. 톤다운된 차분한 느낌의 네이비가 캐주얼룩과 비지니스룩 모두를 충분히 이쁘게 만들어줄거라 생각합니다. 한가지 아쉬운 점이 있다면 바로 소매기장입니다. 지난 fw시즌에 나온 소비자들의 의견을 반영해 소매기장을 짧게했는데, 이로써 코트 착용시 손을 덮지않아 착용에 편리함이 있지만, 반면 언뜻보기에는 손등 일부를 살며시 덮어주는 타 브랜드의 코트 기장감과는 사뭇 다른 느낌이 있어 소매기장이 약간은 어색한듯 짧은 것이 아닌가라는 의문을 잠시 들게하기도합니다. 물론 그 의문은 코트를 착용하고 얼마지나지 않아 코트의 여러 장점들에 매료되어 금방 잊혀지지만, 소매기장과 관련해 예민한 소비자가 있다면 구매전 꼭 고려해보아야할 부분입니다. 오로지 편의성이 제일 중시되는 소비자에게는 물론 이러한 개선은 더할나위없이 좋은 변화입니다. 멋스러운 비조, 카라, 포켓 위치, 핏, 소재, 두께감, 내피, 군더더기없이 깔끔한 디자인 등 모든 부분을 고려해보았을때 동 가격대에서 비교대상이 없다고봐도 무방할 정도의 훌륭한 발마칸 코트입니다. 추후 날씨가 추워지고 야외에서 코트를 착용한 후 코트의 상태 변화, 혹시 있을지 모를 수선과 관련된 CS 등의 문제는 두고보아야할 부분이지만 지금 헤지스 발마칸 코트를 받아본 시점에서는 그 어떤 아우터류를 배송받았을때보다 기분좋은 느낌입니다. 구매를 고민하신다면 구매 추천드립니다.",
    rate: 4,
    age: "24",
    gender: "M",
  },
  {
    id: 9954064,
    content:
      "옷이 무겁긴한데 너무 이뻐요 재질도 좋습니다입고 다니면 다이어트 될듯ㅋ 무거버서",
    rate: 5,
    age: "34",
    gender: "M",
  },
  {
    id: 41136091,
    content:
      "일단 그냥 예뻐요 핏도 잘 떨어지구 코트 사기전에 고민 많이 했는데 왜 고민했지 할 정도로 맘에 듭니다.",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 9895053,
    content:
      "발마칸 맘에드는게 없었는데 고르곤졸라 헤지스 좋은가격에 구매합니다.",
    rate: 5,
    age: "32",
    gender: "M",
  },
  {
    id: 9954218,
    content: "정말 듣던대로 명작이네여 잘입겠습니다. 세일해서 싸게샀네요",
    rate: 5,
    age: "41",
    gender: "M",
  },
  {
    id: 9969900,
    content: "제품 실물로 보니까 너무 이뻐요사이즈도 적당한것 같습니다",
    rate: 5,
    age: "27",
    gender: "M",
  },
  {
    id: 41196852,
    content: "무난하고 어디가서 옷 예쁘다는 소리 많이 듣고다녀요",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 9969937,
    content:
      "무게감은 있지만 원단 결도 좋고 실제 보니 더 예뻐서 마음에 듭니다!",
    rate: 5,
    age: "46",
    gender: "F",
  },
  {
    id: 9957372,
    content:
      "헤지스 히스꺼 발마칸 가성비 괜찮네요 두툼하고 따뜻하고 핏도 좋네요 사이즈 다운해서 S로시키길 잘한듯",
    rate: 5,
    age: "23",
    gender: "M",
  },
  {
    id: 40950618,
    content: "생각했던것 보다 훨씬 품질이 좋아요핏이나 기장도 매우 훌륭합니다",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 90012029,
    content:
      "키가 작아서 사이즈로 고민했는데 아주 좋습니다!팔길이만 살짝 수선하면 베스트일거같아요.원단 좋아요!!",
    rate: 5,
    age: "36",
    gender: "M",
  },
  {
    id: 9959751,
    content:
      "아주 마음에 듭니다.딱맞는 오버핏에 재질도 괜찮은 것 같습니다 추천",
    rate: 4,
    age: "33",
    gender: "M",
  },
  {
    id: 9959934,
    content:
      "색감 핏 잘맞고 좋아요네이비 컬러라 캐쥬얼하게 코디하기가 아주 무난하고 편합니다",
    rate: 5,
    age: "41",
    gender: "M",
  },
  {
    id: 9936973,
    content:
      "배송도 빠르고 옷도 재질도 좋고 너무 만족스럽습니다. 팔길이가 조금 기네요",
    rate: 5,
    age: "30",
    gender: "M",
  },
  {
    id: 41371129,
    content:
      "두께가 그리 두텁지는 않지만 가볍고 보온성은 좋은 느낌이에요가족 선물했는데 색감이 어둡고 여기저기 편하게 매치하기 좋아 흡족해하네요촉감 부드럽고 소재가 좋은 티가 나서 좋아요한사이즈 이상 크게 나온 느낌이라 보통체격인데도 세미오버핏에 팔기장도 조금 기네요사진은 위에서 찍어서 많이 부해 보이는데 적당한 세미오버핏이에요",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 9901132,
    content:
      "왜 거짓말을 해놓는지 이해가 가질 않아요.. 분명 픽업하면 수선가능이라고 쓰여있어서 그거 믿고 산건데 바지만 가능하다고 하고... 피팅예약한거는 되지도 않고. 직접 구매가 아니라 픽업이어서 그럴까요? 직원은 엄청 퉁명스럽고.. 결국 발마칸 코트 팔기장 수선비 따로 엄청 내고 했습니다.원래 발마칸 코트 팔 기장비는 비싸기 때문에 그거 생각해서 이렇게 산건데.. 대체 이럴거면 왜 수선가능이라고 써놨는지 이해가 가질 않아요. 너무 화가 나고 너무 열받네요.",
    rate: 4,
    age: "32",
    gender: "M",
  },
  {
    id: 41561205,
    content: "너무좋아요!! 무조건 강추!!! 사면 무조건 뽀옹 뽑습니다!!",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 9930483,
    content: "잘 맞아요 잘 맞아요 배송이 빨라서 너무 좋네요.",
    rate: 5,
    age: "42",
    gender: "M",
  },
  {
    id: 9937753,
    content: "전체적인 퀄리티는 매우 만족입니다. 다만 기장 조금 길게 느겨져요.",
    rate: 4,
    age: "23",
    gender: "M",
  },
  {
    id: 9914662,
    content: "좋은 품질인 게 느껴지는 아우터로 핏이 좋게 떨어집니다",
    rate: 5,
    age: "31",
    gender: "M",
  },
  {
    id: 90011537,
    content:
      "생각보다 커서 처음에는 당황했는데 볼수록 이뻐서 교환 없이 입기로 했습니다. 어깨라인이 자연스럽게 떨어져서 오버핏으로 입어도 귀엽고 이쁜것 같아요!",
    rate: 5,
    age: "37",
    gender: "M",
  },
  {
    id: 9914624,
    content:
      "사이즈가 크게나왔다고해서 고민이많았는데 여러리뷰보면서 골랐더니 다행히 잘 맞네요",
    rate: 5,
    age: "31",
    gender: "M",
  },
  {
    id: 9913443,
    content: "옷 이쁘고 사이즈도 적당합니다 겨울에 자주입을거같아요.",
    rate: 5,
    age: "34",
    gender: "M",
  },
  {
    id: 9913692,
    content:
      "후기에 사이즈 다운하라는 말이 많아서 다운했는데 딱 정핏이네요그냥 라지시킬걸 싶기도 한데 귀찮아서 그냥 입으려구요기장이 살짝 짧고 살짝 무거운데 부들부들해서 좋네요",
    rate: 4,
    age: "36",
    gender: "M",
  },
  {
    id: 9899813,
    content:
      "제품 너무 이쁘고 소재도 무척 부드럽습니다. 어디에나 잘 어울려서 얼른 겨울이 오길 기대중입니드",
    rate: 5,
    age: "30",
    gender: "M",
  },
  {
    id: 9933210,
    content:
      "L사이즈 샀으면 클 뻔 했어요. M사이즈 적당해요다른 리뷰들처럼 소재 괜찮고 살짝 무겁습니다.",
    rate: 5,
    age: "29",
    gender: "M",
  },
  {
    id: 9906744,
    content:
      "대기업에서 만든 짜임새있는 가성비 발마칸입니다.가격대비 재질이 좋고 캐시미어 덕분에 부드럽습니다.",
    rate: 5,
    age: "31",
    gender: "M",
  },
  {
    id: 41827290,
    content: "생각보다 옷이 무거워요 그래도 따뜻하고 이쁩니다",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 41606572,
    content:
      "xs사이즈 구매했는데 적당히 오버하고 좋아요 늦가을부터 초봄까지 입을수 있을거같아요",
    rate: 5,
    age: "",
    gender: "",
  },
  {
    id: 9986029,
    content:
      "Xs 시켰다가 어깨도 끼고 소매도 짧아서 s로 교환했더니 딱 맞습니다 평소 오버핏 즐겨입으신다면 제 스펙이어도 무조건 s가세요",
    rate: 5,
    age: "22",
    gender: "F",
  },
  {
    id: 9974688,
    content:
      "182/87 라지 사이즈.소매 길이 손등 반쯤 옵니다.총장 적당하구요. 품 아주 여유롭네요.미디엄으로 갔어도 여유있게 맞았을거 같아요.소재 터치감은 아주 부드러워요.발마칸 코트 고민 중이시면 그냥 헤지스 사시면 됩니다.",
    rate: 5,
    age: "44",
    gender: "M",
  },
  {
    id: 9981742,
    content: "평소 사이즈 구입했다가 커서 한 사이즈 다운해서 교환하니 맞음.",
    rate: 5,
    age: "55",
    gender: "F",
  },
  {
    id: 41953786,
    content: "옷 너무 이쁘고 편하네요.가벼운데 보온성도 좋아요!",
    rate: 4,
    age: "",
    gender: "",
  },
];

export default function HomePage() {
  const [prompt, onPromptChange] = useInputState(defaultPrompt);
  const [data, onDataChange] = useInputState(JSON.stringify(defaultData));
  const [data2, onData2Change] = useInputState("");
  const [result, setResult] = useState<Result>();
  const [result2, setResult2] = useState<Result>();

  const cta = useAsyncCallback(async () => {
    setResult(await requestFirst(prompt, JSON.parse(data)));
  });

  const cta2 = useAsyncCallback(async () => {
    const formattedResult = {
      summary: result.summary,
      pros: result.pros.map((p) => [p[0], p[1], p[2], []]),
      cons: result.cons.map((p) => [p[0], p[1], p[2], []]),
    };
    const result2 = await requestFirst(
      prompt +
        `
        This is privous summary :
        ${JSON.stringify(formattedResult)}
        
        Analyze the following reviews and combine it with the previous summary. If there are any newly analyzed pros and cons, please add them.:`,
      JSON.parse(data2)
    );
    const combineResult = {
      ...result2,
      pros: result2.pros.map((p, idx) => [
        p[0],
        p[1],
        uniq([...(result.pros[idx]?.[3] ?? []), ...p[3]]),
      ]),
      cons: result2.cons.map((p, idx) => [
        p[0],
        p[1],
        uniq([...(result.cons[idx]?.[3] ?? []), ...p[3]]),
      ]),
    };
    setResult2(combineResult);
  });

  return (
    <div style={{ padding: "24px" }}>
      <Text weight="bold" size="lg">
        시스템 프롬프트
      </Text>
      <Spacing height={8} />
      <StyledTextArea
        placeholder="시스템 프롬프트"
        value={prompt}
        onChange={onPromptChange}
      />
      <Spacing height={24} />
      <Text weight="bold" size="lg">
        데이터
      </Text>
      <Spacing height={8} />
      <StyledTextArea
        placeholder="데이터"
        value={data}
        onChange={onDataChange}
      />
      <Spacing height={24} />
      <Button
        style={{ width: "100%" }}
        onClick={cta.callback}
        loading={cta.isLoading}
      >
        확인
      </Button>
      <Spacing height={24} />
      <Divider
        height={1}
        width="100%"
        marginVertical={24}
        color={colors.gray300}
      />
      <ResultSection data={result} list={tryParseJson(data)} />
      {!!result && (
        <div>
          <Divider
            height={1}
            width="100%"
            marginVertical={32}
            color={colors.gray300}
          />
          <Text weight="bold" size="lg">
            추가 데이터 (ADD)
          </Text>
          <Spacing height={8} />
          <StyledTextArea
            placeholder="데이터"
            value={data2}
            onChange={onData2Change}
          />
          <Button
            style={{ width: "100%" }}
            onClick={cta2.callback}
            loading={cta2.isLoading}
          >
            확인
          </Button>
        </div>
      )}
      {!!result2 && (
        <ResultSection
          data={result2}
          prevData={result}
          list={[...tryParseJson(data), tryParseJson(data2)]}
        />
      )}
    </div>
  );
}

function tryParseJson(data: string) {
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}
