import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BATHLUXE 空调保温洗澡房 | 冬暖夏凉 · 舒适沐浴新体验",
  description:
    "BATHLUXE 空调保温洗澡房 — 3秒速热，3分钟升温，500KG承重，30年以上寿命。整体保温结构、加厚铝合金框架、6mm磨砂3C钢化玻璃、智能暖风空调、全铜混水系统。适用于家庭住宅、民宿客栈、星级酒店、养老院、工程项目。",
  keywords: [
    "洗澡房",
    "淋浴房",
    "空调保温洗澡房",
    "智能暖风洗澡房",
    "整体淋浴房",
    "BATHLUXE",
    "卫浴",
    "干湿分离",
  ],
  authors: [{ name: "BATHLUXE" }],
  openGraph: {
    title: "BATHLUXE 空调保温洗澡房",
    description: "冬暖夏凉 · 舒适沐浴新体验",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${notoSansSC.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
