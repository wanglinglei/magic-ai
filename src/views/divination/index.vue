<template>
  <div class="divination-page">
    <div class="container">
      <header>
        <h1>周易占卜</h1>
        <p class="subtitle">探索古老智慧，洞察人生方向</p>
      </header>

      <div class="divination-area">
        <h2>诚心问卦</h2>
        <p>集中意念，思考您要询问的问题，然后点击铜钱进行占卜</p>

        <div class="coins-container">
          <div
            v-for="(coin, index) in coins"
            :key="index"
            class="coin"
            :class="{ throwing: coin.throwing }"
            @click="throwCoin(index)"
          >
            {{ coin.text }}
          </div>
        </div>

        <button class="divination-btn" @click="performDivination">开始占卜</button>
      </div>

      <div v-if="showResult" class="result-area">
        <div class="hexagram-display">
          <h2>卦象结果</h2>
          <div class="lines-container">
            <div
              v-for="(line, index) in currentLines"
              :key="index"
              class="line"
              :class="line"
            ></div>
          </div>
          <div class="hexagram-name">{{ currentResult?.name }}</div>
        </div>

        <div class="interpretation">
          <h3>卦辞解读</h3>
          <p>{{ currentResult?.interpretation }}</p>
        </div>
      </div>

      <footer>
        <p>周易占卜仅供参考，人生之路还需自己把握</p>
        <p>© 2023 传统智慧传承</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';

defineOptions({
  name: 'DivinationPage',
});

interface Hexagram {
  name: string;
  interpretation: string;
}

interface Coin {
  text: string;
  throwing: boolean;
}

// 周易六十四卦数据
const hexagrams: Hexagram[] = [
  {
    name: '乾为天',
    interpretation:
      '元亨利贞。乾卦象征天,具有创始、亨通、和谐、贞正的德行。表示当前时机有利,应当积极行动,坚守正道。',
  },
  {
    name: '坤为地',
    interpretation:
      '元亨,利牝马之贞。坤卦象征地,具有柔顺、包容、承载的特性。表示应当以柔克刚,顺应时势,耐心等待。',
  },
  {
    name: '水雷屯',
    interpretation:
      '元亨利贞。勿用有攸往。屯卦象征初生,表示事物处于萌芽阶段,充满艰难。需要坚定信念,耐心积累。',
  },
  {
    name: '山水蒙',
    interpretation:
      '亨。匪我求童蒙,童蒙求我。蒙卦象征启蒙,表示处于蒙昧状态,需要教育和引导。应当虚心学习,寻求智慧。',
  },
  {
    name: '水天需',
    interpretation:
      '有孚,光亨,贞吉。需卦象征等待,表示时机尚未成熟,需要耐心等待。保持诚信,最终会获得吉祥。',
  },
  {
    name: '天水讼',
    interpretation:
      '有孚窒惕,中吉,终凶。讼卦象征争讼,表示可能面临争议和冲突。应当避免诉讼,寻求和解。',
  },
  {
    name: '地水师',
    interpretation: '贞,丈人吉,无咎。师卦象征军队,表示需要组织和纪律。在领导他人时,应当公正严明。',
  },
  {
    name: '水地比',
    interpretation:
      '吉。原筮,元永贞,无咎。比卦象征亲附,表示应当团结合作,亲近贤能。和谐共处会带来吉祥。',
  },
];

// 铜钱数据
const coins = ref<Coin[]>([
  { text: '乾', throwing: false },
  { text: '坤', throwing: false },
  { text: '巽', throwing: false },
]);

// 当前结果
const currentResult = ref<Hexagram | null>(null);

// 当前爻线
const currentLines = ref<string[]>([]);

// 是否显示结果
const showResult = ref(false);

// 投掷铜钱动画
const throwCoin = (index: number) => {
  const coin = coins.value[index];
  if (!coin) return;

  coin.throwing = true;
  setTimeout(() => {
    const currentCoin = coins.value[index];
    if (currentCoin) {
      currentCoin.throwing = false;
    }
  }, 1500);
};

// 生成爻线
const generateLines = () => {
  currentLines.value = [];
  // 随机生成6条爻线（阳爻或阴爻）
  for (let i = 0; i < 6; i++) {
    const isYang = Math.random() > 0.5;
    currentLines.value.push(isYang ? 'yang' : 'yin');
  }
};

// 执行占卜
const performDivination = () => {
  // 生成随机卦象
  const randomIndex = Math.floor(Math.random() * hexagrams.length);
  const result = hexagrams[randomIndex];

  if (!result) {
    return;
  }

  // 生成爻线
  generateLines();

  // 显示结果
  showResultArea(result);
};

// 显示占卜结果
const showResultArea = (result: Hexagram) => {
  currentResult.value = result;
  showResult.value = true;

  // 滚动到结果区域
  nextTick(() => {
    const resultArea = document.querySelector('.result-area');
    if (resultArea) {
      resultArea.scrollIntoView({ behavior: 'smooth' });
    }
  });
};
</script>

<style scoped>
.divination-page {
  font-family: 'SimSun', '宋体', serif;
  background: #0a0e17
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" opacity="0.05"><rect width="100" height="100" fill="none" stroke="%23b8860b" stroke-width="2"/><path d="M0,0 L100,100 M100,0 L0,100" stroke="%23b8860b" stroke-width="1"/></svg>');
  color: #e4d5a0;
  line-height: 1.6;
  padding: 20px;
  min-height: 100vh;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(10, 14, 23, 0.8);
  border: 1px solid #b8860b;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(184, 134, 11, 0.3);
  padding: 30px;
  position: relative;
  overflow: hidden;
}

.container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" opacity="0.03"><path d="M30,5 L55,30 L30,55 L5,30 Z" fill="none" stroke="%23b8860b" stroke-width="1"/></svg>');
  pointer-events: none;
}

header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #b8860b;
}

h1 {
  font-size: 2.5rem;
  color: #d4af37;
  margin-bottom: 10px;
  text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
  letter-spacing: 5px;
}

.subtitle {
  font-size: 1.2rem;
  color: #b8860b;
}

.divination-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
  padding: 20px;
  background: rgba(20, 25, 35, 0.7);
  border: 1px solid #8b6914;
  border-radius: 5px;
}

.coins-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.coin {
  width: 70px;
  height: 70px;
  background: linear-gradient(145deg, #d4af37, #b8860b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #0a0e17;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;
  position: relative;
  user-select: none;
}

.coin::before {
  content: '';
  position: absolute;
  width: 90%;
  height: 90%;
  border: 2px solid #0a0e17;
  border-radius: 50%;
}

.coin:hover {
  transform: scale(1.1);
}

.coin.throwing {
  animation: throw 1.5s ease-in-out;
}

@keyframes throw {
  0% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-100px) rotate(180deg);
  }

  100% {
    transform: translateY(0) rotate(360deg);
  }
}

.divination-btn {
  background: #b8860b;
  color: #0a0e17;
  border: none;
  padding: 12px 30px;
  font-size: 1.2rem;
  font-family: inherit;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s;
  font-weight: bold;
}

.divination-btn:hover {
  background: #d4af37;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4);
}

.result-area {
  margin-top: 30px;
  padding: 20px;
  background: rgba(20, 25, 35, 0.7);
  border: 1px solid #8b6914;
  border-radius: 5px;
}

.hexagram-display {
  text-align: center;
  margin-bottom: 20px;
}

.hexagram-name {
  font-size: 1.8rem;
  color: #d4af37;
  margin: 15px 0;
}

.lines-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
}

.line {
  height: 8px;
  background: #d4af37;
  border-radius: 4px;
}

.line.yang {
  width: 150px;
}

.line.yin {
  width: 150px;
  background: transparent;
  border: 2px solid #d4af37;
  height: 4px;
}

.interpretation {
  margin-top: 20px;
  padding: 15px;
  background: rgba(10, 14, 23, 0.5);
  border-left: 3px solid #b8860b;
}

.interpretation h3 {
  color: #d4af37;
  margin-bottom: 10px;
}

footer {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #b8860b;
  color: #8b6914;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  h1 {
    font-size: 1.8rem;
  }

  .coin {
    width: 60px;
    height: 60px;
    font-size: 20px;
  }

  .line.yang,
  .line.yin {
    width: 120px;
  }
}
</style>
