"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  Flame,
  Thermometer,
  Shield,
  Award,
  ChevronRight,
  ChevronLeft,
  Wind,
  Layers,
  Frame,
  GlassWater,
  ShowerHead,
  Hand,
  Library,
  Square,
  Waves,
  MessageCircle,
  QrCode,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/* ==================== 数据 ==================== */

const NAV_LINKS = [
  { label: "首页", href: "#home" },
  { label: "核心优势", href: "#advantages" },
  { label: "产品细节", href: "#details" },
  { label: "强度演示", href: "#strength" },
  { label: "型号介绍", href: "#models" },
  { label: "应用场景", href: "#scenes" },
  { label: "热水器福利", href: "#heater-offer" },
  { label: "联系我们", href: "#contact" },
];

const ADVANTAGES = [
  {
    icon: Flame,
    title: "3秒速热",
    desc: "PDC陶瓷发热技术，开机3秒即享暖风，告别浴室漫长等待。",
  },
  {
    icon: Thermometer,
    title: "3分钟升温",
    desc: "智能暖风空调系统，3分钟将整个浴室提升至舒适温度。",
  },
  {
    icon: Shield,
    title: "500公斤以上承重",
    desc: "高强度框架结构，底盘承重500公斤以上，稳固耐用，安全有保障。",
  },
  {
    icon: Award,
    title: "30年以上寿命",
    desc: "全铜混水阀芯与304不锈钢五金件，使用寿命长达30年以上。",
  },
];

const PRODUCT_DETAILS = [
  {
    icon: Layers,
    title: "整体保温结构",
    desc: "采用航空级铝保温板，六面整体保温，360°全封闭锁温设计。冬季保温时间提升70%，夏季隔绝外部高温，让沐浴环境始终恒温舒适。独特的双层中空结构不仅有效阻隔热量流失，还能降低噪音传播，营造静谧私享空间。",
    image: "/images/products/product-01.webp",
  },
  {
    icon: Frame,
    title: "高强度框架结构",
    desc: "高端款采用断桥门设计，主体使用PUR大板板材，结构致密、抗压性强、保温隔热性能优异。底盘经叉车悬空承重测试，成年人站立其上无任何形变，承重能力达500公斤以上，板材使用寿命长达30年。表面经过防腐处理，长期使用依然稳固如新。",
    image: "/images/products/product-02.webp",
  },
  {
    icon: GlassWater,
    title: "6mm磨砂3C钢化玻璃",
    desc: "采用国家标准3C认证的6mm钢化玻璃，磨砂工艺保护隐私同时透光柔和。抗冲击强度是普通玻璃的5倍，破碎后形成颗粒状不伤人。配备防爆膜，双重保障家人安全。门把手、铰链等五金件均采用304不锈钢精铸。",
    image: "/images/products/product-03.webp",
  },
  {
    icon: Wind,
    title: "智能暖风空调",
    desc: "内置PDC陶瓷发热模块，无明火、无氧耗、安全高效。三档温度自由调节（25℃-45℃），3秒速热，3分钟即可让整个洗澡房达到舒适温度。配备智能恒温系统，自动维持设定温度，省电节能。还具备换气、除湿、香薰等多功能模式。",
    image: "/images/products/product-04.webp",
  },
  {
    icon: ShowerHead,
    title: "全铜混水系统",
    desc: "全铜锻造混水阀芯，配以进口陶瓷片密封，开合百万次滴水不漏。精准控温±0.5℃，避免忽冷忽热。顶喷、手持、下出水三路分水设计，一键切换。淋浴管路采用食品级PEX材质，无毒无味，水质安全有保障。",
    image: "/images/products/product-05.webp",
  },
];

const ACCESSORIES = [
  { icon: ShowerHead, name: "顶喷花洒" },
  { icon: Hand, name: "手持花洒" },
  { icon: Library, name: "置物架" },
  { icon: Square, name: "化妆镜" },
  { icon: Waves, name: "分水器" },
];

const SCENES = [
  {
    image: "/images/scenes/scene-01.webp",
    title: "家庭住宅",
    desc: "适配城市公寓、自建房、别墅等多种住宅户型，干湿分离设计让浴室整洁易打理。",
  },
  {
    image: "/images/scenes/scene-02.webp",
    title: "民宿客栈",
    desc: "为高端民宿打造差异化体验，恒温洗澡房提升住客满意度，冬季也能舒适沐浴。",
  },
  {
    image: "/images/scenes/scene-03.webp",
    title: "星级酒店",
    desc: "符合星级酒店品质要求，简洁现代的外观设计融入各类装修风格。",
  },
  {
    image: "/images/scenes/scene-04.webp",
    title: "养老院/工程项目",
    desc: "为老年人提供恒温安全沐浴环境，杜绝冬季洗澡受寒风险。也是工程项目批量集采的优选。",
  },
];

const QUALITY_SIZES = [
  { size: "90 × 90 cm（扇形）", price: "¥ 1,350" },
  { size: "100 × 100 cm（扇形）", price: "¥ 1,350" },
  { size: "100 × 100 cm（方形）", price: "¥ 1,150" },
  { size: "100 × 120 cm", price: "¥ 1,250" },
  { size: "100 × 140 cm", price: "¥ 1,500" },
  { size: "130 × 155 cm", price: "¥ 1,700" },
  { size: "120 × 190 cm", price: "¥ 1,900" },
  { size: "120 × 190 cm（隔断款）", price: "¥ 2,100" },
];

const PREMIUM_SIZES = [
  { size: "100 × 100 cm", price: "¥ 1,600" },
  { size: "100 × 120 cm", price: "¥ 1,750" },
  { size: "100 × 140 cm", price: "¥ 1,900" },
  { size: "130 × 155 cm", price: "¥ 2,100" },
  { size: "120 × 190 cm", price: "¥ 2,300" },
];

const MODELS = [
  {
    name: "品质款 · 推拉门",
    image: "/images/promo/promo-04.webp",
    tagline: "极简之美 · 经典实用",
    desc: "经典推拉门设计，铅复合保温板搭配磨砂钢化玻璃，干湿分离，性价比之选。",
    features: [
      "铅复合保温板框架",
      "6mm磨砂3C钢化玻璃",
      "推拉门设计 · 节省空间",
      "底盘承重 500 公斤以上",
      "全铜混水分水系统",
      "顶喷 + 手持花洒",
    ],
    sizes: QUALITY_SIZES,
    highlighted: false,
  },
  {
    name: "高端款 · 断桥门 PUR大板",
    image: "/images/promo/promo-03.webp",
    tagline: "极简美学 · 智享舒适",
    desc: "新款断桥门设计，主体采用PUR大板板材，保温隔热性能卓越，结构稳固，承重表现优异。",
    features: [
      "断桥门设计 · PUR大板板材",
      "6mm磨砂3C钢化玻璃 + 防爆膜",
      "板材使用寿命 30 年",
      "底盘承重 500 公斤以上",
      "全铜混水分水系统",
      "智能暖风空调（恒温±0.5℃）",
      "顶喷 + 手持 + 下出水三路分水",
      "香薰 / 换气 / 除湿多功能模式",
    ],
    sizes: PREMIUM_SIZES,
    highlighted: true,
  },
];

const PROMOS = [
  { image: "/images/promo/promo-01.webp", title: "极简美学 · 定制高端生活" },
  { image: "/images/promo/promo-02.webp", title: "极简之境 · 净享未来" },
  { image: "/images/promo/promo-03.webp", title: "极简美学 · 智享舒适" },
  { image: "/images/promo/promo-04.webp", title: "极简之美 · 尽显品质" },
  { image: "/images/promo/promo-05.webp", title: "极简之境 · 净享未来" },
  { image: "/images/promo/promo-06.webp", title: "极简之境 · 奢享空间" },
];

const PRODUCT_GALLERY = [
  "/images/products/product-01.webp",
  "/images/products/product-02.webp",
  "/images/products/product-03.webp",
  "/images/products/product-04.webp",
  "/images/products/product-05.webp",
  "/images/products/product-06.webp",
  "/images/products/product-07.webp",
  "/images/products/product-08.webp",
  "/images/products/product-09.webp",
  "/images/products/product-10.webp",
];

const STRENGTH_ITEMS = [
  {
    image: "/images/strength/strength-01.webp",
    title: "汽车碾压测试",
    desc: "让一辆小型货车的前轮直接碾压洗澡房底座，底座保持完好无损，承重能力远超日常使用需求。这一极限测试印证了产品在结构强度上的卓越表现，让每一位用户都能放心使用。",
  },
  {
    image: "/images/strength/strength-02.webp",
    title: "人体承重测试 · 站上人没事",
    desc: "洗澡房底座由叉车支撑悬空，一名成年人直接站立其上，底座不发生任何形变或松动，真正「站上人没事」。底盘承重能力达 500 公斤以上，结合加强筋结构设计，确保长期使用安全无虞。",
  },
];

/* ==================== 热水器福利活动 ==================== */
const HEATER_PROMOS = [
  {
    image: "/images/heater-promo/heater-promo-01.webp",
    brand: "美的 · 安全王 N6",
    title: "出水断电 安全无忧",
    features: ["出水断电", "智能恒温", "多重安全防护"],
    price: "¥ 750",
  },
  {
    image: "/images/heater-promo/heater-promo-02.webp",
    brand: "美的 · MD1（60L）",
    title: "大容量 畅享舒适热水",
    features: ["60升大容量", "多重安全防护", "爆款热销"],
    price: "¥ 399",
  },
  {
    image: "/images/heater-promo/heater-promo-03.webp",
    brand: "美的 · 一级能效",
    title: "2100W 高效速热更省心",
    features: ["2100W高功率", "一级能效", "限时抢购"],
    price: "¥ 680",
  },
];

const HEATER_PRODUCTS = [
  { image: "/images/heater-products/heater-product-01.webp", brand: "海尔", name: "JZ7 双管变频速热", highlights: "双管速热 · 变频节能" },
  { image: "/images/heater-products/heater-product-02.webp", brand: "美的", name: "纯净活水系列", highlights: "纯净活水 · 健康沐浴" },
  { image: "/images/heater-products/heater-product-03.webp", brand: "美的", name: "MT7 出水断电", highlights: "出水断电 · 安全守护" },
  { image: "/images/heater-products/heater-product-04.webp", brand: "海尔", name: "TA5 精智恒温", highlights: "精智恒温 · 持久恒温" },
  { image: "/images/heater-products/heater-product-05.webp", brand: "海尔", name: "AI 管家 · 3.3kW 速热", highlights: "AI管家 · 3.3kW速热" },
];

/* ==================== 联系信息（用户可在此修改） ==================== */
const CONTACT = {
  phone: "150-7669-9400", // 真实电话
  mobile: "150-7669-9400", // 真实手机号（微信同号）
  backup: "193-3317-2643", // 备用号码
  wechat: "15076699400", // 微信号（同手机号）
  address: "河北省沧州市沧县",
  workTime: "周一至周日 8:00 - 22:00",
};

/* ==================== 组件 ==================== */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-white/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded bg-neutral-900 text-white grid place-items-center font-black text-sm tracking-wider group-hover:bg-neutral-700 transition">
            BL
          </div>
          <div className="leading-tight">
            <div className="font-black text-lg tracking-wider text-neutral-900">
              BATHLUXE
            </div>
            <div className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
              Bathroom Solutions
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-neutral-700 hover:text-neutral-900 font-medium transition relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neutral-900 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <a href="#contact">
            <Button className="bg-neutral-900 hover:bg-neutral-700 text-white rounded-none px-6">
              <Phone className="w-4 h-4 mr-2" />
              立即咨询
            </Button>
          </a>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle className="text-left">BATHLUXE 导航</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-2 mt-6">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg hover:bg-neutral-100 text-neutral-700 font-medium flex items-center justify-between"
                >
                  {l.label}
                  <ChevronRight className="w-4 h-4" />
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)}>
                <Button className="w-full mt-4 bg-neutral-900 hover:bg-neutral-700 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  立即咨询
                </Button>
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 背景图 */}
      <div className="absolute inset-0">
        <img
          src="/images/scenes/scene-01.webp"
          alt="BATHLUXE 沐浴房高端浴室场景"
          className="w-full h-full object-cover"
          fetchpriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* 内容 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-32">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm tracking-wider mb-6 animate-fade-up">
          <Award className="w-3.5 h-3.5" />
          30年品质承诺 · 500公斤以上承重
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 animate-fade-up [animation-delay:100ms] [opacity:0] [animation-fill-mode:forwards]">
          空调保温洗澡房
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-4 font-light animate-fade-up [animation-delay:200ms] [opacity:0] [animation-fill-mode:forwards]">
          冬暖夏凉 · 舒适沐浴新体验
        </p>
        <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up [animation-delay:300ms] [opacity:0] [animation-fill-mode:forwards]">
          3秒速热 · 3分钟升温 · 智能恒温 · 整体保温 · 高强度框架 · 6mm磨砂3C钢化玻璃 · 全铜混水系统
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:400ms] [opacity:0] [animation-fill-mode:forwards]">
          <a href="#contact">
            <Button
              size="lg"
              className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-none px-8 text-base font-bold"
            >
              <Phone className="w-5 h-5 mr-2" />
              立即咨询
            </Button>
          </a>
          <a href="#details">
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-neutral-900 rounded-none px-8 text-base font-bold"
            >
              查看产品细节
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </div>

      {/* 向下指示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 animate-bounce">
        <ChevronRight className="w-6 h-6 rotate-90" />
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  desc,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === "center" ? "text-center max-w-3xl mx-auto" : "text-left max-w-2xl"
      }`}
    >
      {eyebrow && (
        <div
          className={`text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3 ${
            align === "center" ? "flex items-center justify-center gap-2" : ""
          }`}
        >
          {align === "center" && <span className="w-8 h-px bg-neutral-400" />}
          {eyebrow}
          {align === "center" && <span className="w-8 h-px bg-neutral-400" />}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 mb-4 tracking-tight">
        {title}
      </h2>
      {desc && (
        <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
          {desc}
        </p>
      )}
    </div>
  );
}

function Advantages() {
  return (
    <section id="advantages" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Core Advantages"
          title="核心优势"
          desc="四大核心卖点，重新定义高品质沐浴体验。从速热到寿命，每一项都经得起考验。"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVANTAGES.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="card-hover bg-neutral-50 border border-neutral-200 p-8 text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-neutral-900 text-white grid place-items-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-neutral-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductShowcase() {
  return (
    <section className="py-20 md:py-28 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Product Gallery"
          title="产品实物展示"
          desc="多角度实物拍摄，真实还原产品细节与质感。每一处工艺，皆匠心呈现。"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {PRODUCT_GALLERY.map((img, i) => (
            <Dialog key={i}>
              <DialogTrigger asChild>
                <div className="img-zoom aspect-[3/4] bg-white border border-neutral-200 cursor-pointer relative group">
                  <img
                    src={img}
                    alt={`BATHLUXE 洗澡房实物图 ${i + 1}`}
                    className="w-full h-full object-cover"
                   loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white">
                <DialogTitle className="sr-only">
                  BATHLUXE 洗澡房实物图 {i + 1}
                </DialogTitle>
                <img
                  src={img}
                  alt={`BATHLUXE 洗澡房实物图 ${i + 1}`}
                  className="w-full h-auto"
                 loading="lazy" decoding="async" />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductDetails() {
  return (
    <section id="details" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Craftsmanship"
          title="匠心细节 · 品质呈现"
          desc="每一处结构都经过精心设计与严格测试，从保温到安全，每一项都达到行业领先水平。"
        />
        <div className="space-y-20">
          {PRODUCT_DETAILS.map((item, i) => {
            const Icon = item.icon;
            const reversed = i % 2 === 1;
            return (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  reversed ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div className={`img-zoom aspect-[4/3] bg-neutral-100 lg:[direction:ltr]`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                   loading="lazy" decoding="async" />
                </div>
                <div className="lg:[direction:ltr]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-900 text-white grid place-items-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm tracking-[0.2em] text-neutral-400 uppercase">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-neutral-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    {[
                      "30年以上板材使用寿命",
                      "稳固耐用 · 安全可靠",
                      "支持上门测量与安装",
                    ].map((feat, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-neutral-900" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Accessories() {
  return (
    <section className="py-20 md:py-28 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">
            Full Bathroom Configuration
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight">
            全套卫浴配置
          </h2>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto">
            一站式配备所有卫浴配件，开箱即用，省心省力。
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {ACCESSORIES.map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={i}
                className="bg-neutral-800/50 border border-neutral-700 p-6 text-center hover:bg-neutral-800 transition card-hover"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white text-neutral-900 grid place-items-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-sm font-medium text-neutral-200">
                  {a.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Strength() {
  return (
    <section id="strength" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Strength Test"
          title="极限强度演示"
          desc="真金不怕火炼，过硬品质经得起极限测试。让每一份信任，都有据可依。"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {STRENGTH_ITEMS.map((item, i) => (
            <div
              key={i}
              className="card-hover bg-neutral-50 border border-neutral-200 overflow-hidden"
            >
              <div className="img-zoom aspect-[4/3]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                 loading="lazy" decoding="async" />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-black text-neutral-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Models() {
  return (
    <section id="models" className="py-20 md:py-28 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Product Models"
          title="型号介绍"
          desc="两大系列、十二种尺寸，覆盖不同家庭与工程需求。从经典推拉门到高端断桥门 PUR 大板，总有一款适合您。"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {MODELS.map((m, i) => (
            <div
              key={i}
              className={`card-hover bg-white border-2 flex flex-col overflow-hidden ${
                m.highlighted
                  ? "border-neutral-900 shadow-xl"
                  : "border-neutral-200"
              }`}
            >
              {m.highlighted && (
                <div className="bg-neutral-900 text-white text-center py-2 text-xs tracking-[0.2em] uppercase">
                  ★ 推荐款 · 新款断桥门 ★
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* 左侧图片 */}
                <div className="img-zoom aspect-[4/3] sm:aspect-auto bg-neutral-100">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover"
                   loading="lazy" decoding="async" />
                </div>
                {/* 右侧介绍 */}
                <div className="p-6 md:p-7 flex flex-col">
                  <div className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-2">
                    {m.tagline}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-neutral-900 mb-2 leading-tight">
                    {m.name}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                    {m.desc}
                  </p>
                  <ul className="space-y-1.5 text-xs text-neutral-700 mb-4 flex-1">
                    {m.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-neutral-900 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 尺寸价格表 */}
              <div className="border-t border-neutral-200 bg-neutral-50/50">
                <div className="px-6 md:px-7 py-3 flex items-center justify-between">
                  <div className="text-xs font-bold tracking-[0.15em] uppercase text-neutral-700">
                    尺寸 / 参考价
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    共 {m.sizes.length} 种尺寸
                  </div>
                </div>
                <div className="px-6 md:px-7 pb-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {m.sizes.map((s, j) => (
                      <div
                        key={j}
                        className="flex items-center justify-between px-3 py-2 bg-white border border-neutral-200 text-xs"
                      >
                        <span className="text-neutral-700">{s.size}</span>
                        <span className="font-black text-neutral-900">
                          {s.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-6 md:px-7 pb-5">
                  <a href="#contact">
                    <Button
                      className={`w-full rounded-none ${
                        m.highlighted
                          ? "bg-neutral-900 hover:bg-neutral-700 text-white"
                          : "bg-white border border-neutral-900 text-neutral-900 hover:bg-neutral-100"
                      }`}
                    >
                      询价咨询
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 text-sm text-neutral-500">
          * 以上价格为参考价，实际报价以测量定制为准。支持上门测量与安装。
        </div>
      </div>
    </section>
  );
}

function Scenes() {
  return (
    <section id="scenes" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Application Scenarios"
          title="多场景应用 · 满足不同需求"
          desc="从家庭到商业，从住宅到工程，BATHLUXE 洗澡房都能完美适配。"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SCENES.map((s, i) => (
            <div
              key={i}
              className="card-hover bg-white border border-neutral-200 overflow-hidden group"
            >
              <div className="img-zoom aspect-[3/4]">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover"
                 loading="lazy" decoding="async" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoGallery() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 md:py-28 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Brand Posters"
          title="品牌宣传画册"
          desc="极简美学，匠心智造。每一张海报都是对品质的诠释。"
        />

        {/* 大图预览 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 img-zoom aspect-[16/10] bg-white border border-neutral-200">
            <img
              src={PROMOS[active].image}
              alt={PROMOS[active].title}
              className="w-full h-full object-cover"
             loading="lazy" decoding="async" />
          </div>
          <div className="flex flex-col justify-center p-6 lg:p-8 bg-neutral-900 text-white">
            <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">
              Brand Story
            </div>
            <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight">
              {PROMOS[active].title}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              BATHLUXE 始终秉持「极简美学 · 匠心工艺」的设计理念，将功能与美学完美融合。每一款产品都经过严格的强度测试与品质检验，只为给您带来更舒适的沐浴体验。
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-none border-neutral-700 text-white hover:bg-neutral-800"
                onClick={() =>
                  setActive((p) => (p - 1 + PROMOS.length) % PROMOS.length)
                }
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-none border-neutral-700 text-white hover:bg-neutral-800"
                onClick={() => setActive((p) => (p + 1) % PROMOS.length)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <div className="ml-auto text-sm text-neutral-400 self-center">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(PROMOS.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        {/* 缩略图 */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {PROMOS.map((p, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`img-zoom aspect-[3/4] border-2 transition ${
                active === i
                  ? "border-neutral-900"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover"
               loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeaterOffer() {
  return (
    <section id="heater-offer" className="py-20 md:py-28 bg-gradient-to-b from-neutral-900 to-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs tracking-wider mb-4">
            🎁 限时福利活动
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight">
            晒图推荐 · 享成本价热水器
          </h2>
          <p className="text-base md:text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            购买并使用我们洗澡房后，在朋友圈/抖音/小红书等平台晒图分享使用体验，
            <span className="text-amber-300 font-bold">即可成本价购入一台品牌电热水器</span>。
            多款美的、海尔等大品牌可选，厂家直供，价格低于市面电商。
          </p>
        </div>

        {/* 福利活动三款海报 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {HEATER_PROMOS.map((h, i) => (
            <div
              key={i}
              className="card-hover bg-white text-neutral-900 overflow-hidden border-2 border-amber-500/50"
            >
              <div className="img-zoom aspect-[4/3] bg-neutral-100 relative">
                <img
                  src={h.image}
                  alt={`${h.brand} ${h.title}`}
                  className="w-full h-full object-cover"
                 loading="lazy" decoding="async" />
                <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                  成本价特惠
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs text-neutral-500 mb-1 tracking-wider">{h.brand}</div>
                <h3 className="text-lg font-black mb-3 leading-tight">{h.title}</h3>
                <ul className="space-y-1.5 text-xs text-neutral-700 mb-4">
                  {h.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-neutral-200 pt-3 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] text-neutral-500">晒图推荐专享价</div>
                    <div className="text-2xl font-black text-amber-600">{h.price}</div>
                  </div>
                  <a href="#contact">
                    <Button className="rounded-none bg-neutral-900 hover:bg-neutral-700 text-white text-xs">
                      立即咨询
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 活动规则 */}
        <div className="bg-neutral-800/50 border border-neutral-700 p-6 md:p-8 rounded">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
            活动参与流程
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            {[
              { step: "01", title: "购买安装", desc: "选购我们的洗澡房，安排上门安装" },
              { step: "02", title: "晒图分享", desc: "在朋友圈/抖音/小红书分享使用体验" },
              { step: "03", title: "联系客服", desc: "截图发给客服，确认参与活动" },
              { step: "04", title: "成本价购机", desc: "从下方多款热水器中任选一台" },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-white grid place-items-center font-black text-sm shrink-0">
                  {s.step}
                </div>
                <div>
                  <div className="font-bold text-white mb-1">{s.title}</div>
                  <div className="text-xs text-neutral-400 leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-5 border-t border-neutral-700 text-xs text-neutral-500 leading-relaxed">
            * 同一用户限参与一次。最终解释权归商家所有。热水器型号以实际库存为准，可与客服确认可选款式。
          </div>
        </div>
      </div>
    </section>
  );
}

function HeaterProducts() {
  return (
    <section id="heater-products" className="py-20 md:py-28 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Premium Water Heaters"
          title="多款高端变频热水器 · 厂家直销"
          desc="另有海尔、美的等大品牌多款高端变频热水器供您选择，厂家直销，价格最低，品质有保障。"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {HEATER_PRODUCTS.map((h, i) => (
            <div
              key={i}
              className="card-hover bg-white border border-neutral-200 overflow-hidden"
            >
              <div className="img-zoom aspect-[4/3] bg-neutral-100">
                <img
                  src={h.image}
                  alt={`${h.brand} ${h.name}`}
                  className="w-full h-full object-cover"
                 loading="lazy" decoding="async" />
              </div>
              <div className="p-4">
                <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-1">
                  {h.brand}
                </div>
                <h3 className="text-sm font-bold text-neutral-900 mb-1 leading-tight">
                  {h.name}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {h.highlights}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="#contact">
            <Button
              size="lg"
              className="rounded-none bg-neutral-900 hover:bg-neutral-700 text-white px-8"
            >
              咨询完整型号与价格
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
          <div className="mt-4 text-xs text-neutral-500">
            * 全部厂家直销，价格优于电商公开价。具体优惠请咨询客服。
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const qrItems = [
    {
      label: "微信咨询",
      desc: "扫码添加官方微信",
      image: "/images/qr/wechat-qr.png",
      icon: MessageCircle,
      account: `微信号：${CONTACT.wechat}`,
    },
    {
      label: "快手号",
      desc: "扫码关注官方快手",
      image: "/images/qr/kuaishou-qr.png",
      icon: QrCode,
      account: "快手号：BATHLUXE 官方",
    },
    {
      label: "抖音号",
      desc: "扫码关注官方抖音",
      image: "/images/qr/douyin-qr.png",
      icon: QrCode,
      account: "抖音号：BATHLUXE 官方",
    },
    {
      label: "小红书",
      desc: "扫码关注小红书账号",
      image: "/images/qr/xiaohongshu-qr.png",
      icon: QrCode,
      account: "小红书：BATHLUXE 官方",
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">
            Contact Us
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight">
            联系我们
          </h2>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto">
            专业顾问1对1服务，上门测量安装。立即咨询，享受限时优惠。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* 左：电话/地址 */}
          <div>
            <h3 className="text-2xl font-bold mb-8">联系方式</h3>
            <div className="space-y-6">
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-start gap-4 p-5 bg-neutral-800/50 border border-neutral-700 hover:bg-neutral-800 transition group"
              >
                <div className="w-12 h-12 rounded-full bg-white text-neutral-900 grid place-items-center group-hover:scale-110 transition shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 mb-1">
                    全国服务热线（点击拨打）
                  </div>
                  <div className="text-2xl font-black tracking-wide">
                    {CONTACT.phone}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    {CONTACT.workTime}
                  </div>
                </div>
              </a>

              <a
                href={`tel:${CONTACT.mobile}`}
                className="flex items-start gap-4 p-5 bg-neutral-800/50 border border-neutral-700 hover:bg-neutral-800 transition group"
              >
                <div className="w-12 h-12 rounded-full bg-white text-neutral-900 grid place-items-center group-hover:scale-110 transition shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 mb-1">
                    业务手机（点击拨打）
                  </div>
                  <div className="text-xl font-bold tracking-wide">
                    {CONTACT.mobile}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    微信同号，欢迎添加咨询
                  </div>
                </div>
              </a>

              <a
                href={`tel:${CONTACT.backup}`}
                className="flex items-start gap-4 p-5 bg-neutral-800/50 border border-neutral-700 hover:bg-neutral-800 transition group"
              >
                <div className="w-12 h-12 rounded-full bg-white text-neutral-900 grid place-items-center group-hover:scale-110 transition shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 mb-1">
                    备用号码（点击拨打）
                  </div>
                  <div className="text-xl font-bold tracking-wide">
                    {CONTACT.backup}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    主号不接请打此号
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-4 p-5 bg-neutral-800/50 border border-neutral-700">
                <div className="w-12 h-12 rounded-full bg-white text-neutral-900 grid place-items-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 mb-1">公司地址</div>
                  <div className="text-sm font-medium leading-relaxed">
                    {CONTACT.address}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右：二维码 */}
          <div>
            <h3 className="text-2xl font-bold mb-8">扫码关注我们</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {qrItems.map((q, i) => {
                const Icon = q.icon;
                return (
                  <div
                    key={i}
                    className="bg-white p-4 text-neutral-900 text-center card-hover"
                  >
                    <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-neutral-900 text-white grid place-items-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-bold mb-1">{q.label}</div>
                    <div className="text-[10px] text-neutral-500 mb-3">
                      {q.desc}
                    </div>
                    <div className="aspect-square bg-white border border-neutral-200 p-2 mb-3">
                      <img
                        src={q.image}
                        alt={q.label}
                        className="w-full h-full object-contain"
                       loading="lazy" decoding="async" />
                    </div>
                    <div className="text-[10px] text-neutral-600 break-all">
                      {q.account}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 py-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded bg-white text-neutral-900 grid place-items-center font-black text-sm tracking-wider">
                BL
              </div>
              <div>
                <div className="font-black text-lg tracking-wider text-white">
                  BATHLUXE
                </div>
                <div className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
                  Bathroom Solutions
                </div>
              </div>
            </div>
            <p className="text-xs leading-relaxed max-w-xs">
              BATHLUXE 专注于高端空调保温洗澡房的研发与制造，致力于为每一个家庭提供舒适、安全、智能的沐浴体验。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wider">
              产品中心
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#models" className="hover:text-white transition">
                  品质款 · 推拉门
                </a>
              </li>
              <li>
                <a href="#models" className="hover:text-white transition">
                  高端款 · 断桥门 PUR大板
                </a>
              </li>
              <li>
                <a href="#models" className="hover:text-white transition">
                  隔断款（120×190）
                </a>
              </li>
              <li>
                <a href="#details" className="hover:text-white transition">
                  产品细节
                </a>
              </li>
              <li>
                <a href="#strength" className="hover:text-white transition">
                  强度演示
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wider">
              联系我们
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                {CONTACT.phone}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                {CONTACT.mobile}
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                {CONTACT.address}
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div>© {new Date().getFullYear()} BATHLUXE. 保留所有权利.</div>
          <div className="flex gap-4">
            <a href="#home" className="hover:text-white transition">
              返回顶部
            </a>
            <span className="text-neutral-700">|</span>
            <a href="#contact" className="hover:text-white transition">
              联系我们
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href={`tel:${CONTACT.phone}`}
        className="w-14 h-14 rounded-full bg-neutral-900 text-white grid place-items-center shadow-lg hover:bg-neutral-700 transition group relative"
        aria-label="电话咨询"
      >
        <Phone className="w-5 h-5" />
        <span className="absolute right-full mr-3 whitespace-nowrap bg-neutral-900 text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
          电话咨询
        </span>
      </a>
      <a
        href="#contact"
        className="w-14 h-14 rounded-full bg-white border border-neutral-300 text-neutral-900 grid place-items-center shadow-lg hover:bg-neutral-100 transition group relative"
        aria-label="微信咨询"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="absolute right-full mr-3 whitespace-nowrap bg-neutral-900 text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
          微信咨询
        </span>
      </a>
    </div>
  );
}

/* ==================== 主页面 ==================== */

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Advantages />
        <ProductShowcase />
        <ProductDetails />
        <Accessories />
        <Strength />
        <Models />
        <Scenes />
        <PromoGallery />
        <HeaterOffer />
        <HeaterProducts />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
