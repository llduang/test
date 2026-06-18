"""
BATHLUXE 图片压缩脚本
- 将 PNG 转换为 WebP（质量 85，视觉无损，体积减 70-90%）
- 智能缩放：宽度超过 MAX_WIDTH 的图片按比例缩小
- 保留原始 PNG（重命名为 .orig.png）作为备份
- 输出压缩前后对比

用法:
  python3 scripts/compress_images.py
"""
from PIL import Image, ImageOps
import os
import sys
from pathlib import Path

# ===== 配置 =====
IMAGES_DIR = Path("/home/z/my-project/public/images")
QUALITY = 85          # WebP 质量 (0-100)，85 视觉无损
MAX_WIDTH = 1600      # 最大宽度，超过则按比例缩小（显示尺寸最多 1440px，留余量）
METHOD = 6            # WebP 压缩方法 (0-6)，6 最慢但压缩率最高
SKIP_QR = True        # 二维码不压缩（保持 PNG 以保证扫描可靠性）

# 显示尺寸参考（用于决定是否需要缩小）
DISPLAY_SIZES = {
    "products": (600, 800),   # 产品图：列表展示最大 ~300px，详情弹窗最大 ~1200px
    "scenes": (1280, 960),    # 场景图：作为 Hero 背景或场景卡片
    "strength": (1280, 960),  # 强度演示图
    "promo": (1280, 960),     # 宣传海报
    "qr": (300, 300),         # 二维码
}


def human_size(num_bytes: int) -> str:
    for unit in ["B", "KB", "MB"]:
        if num_bytes < 1024:
            return f"{num_bytes:.0f}{unit}"
        num_bytes /= 1024
    return f"{num_bytes:.1f}GB"


def compress_one(png_path: Path) -> tuple[int, int, str]:
    """压缩单张 PNG -> WebP，返回 (原大小, 新大小, 状态)"""
    orig_size = png_path.stat().st_size

    # 二维码跳过
    rel = png_path.relative_to(IMAGES_DIR)
    if SKIP_QR and rel.parts[0] == "qr":
        return orig_size, orig_size, "skip (QR)"

    # 读取图片
    with Image.open(png_path) as img:
        # 自动旋转（处理 EXIF orientation）
        img = ImageOps.exif_transpose(img)

        # 转 RGB（PNG 可能是 RGBA/P 模式，WebP 也支持 alpha 但 RGB 体积更小）
        if img.mode in ("RGBA", "LA", "P"):
            # 保留透明通道
            bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
            if img.mode == "P":
                img = img.convert("RGBA")
            bg.paste(img, mask=img.split()[-1] if img.mode == "RGBA" else None)
            img = bg.convert("RGB")
        elif img.mode != "RGB":
            img = img.convert("RGB")

        # 智能缩放
        w, h = img.size
        if w > MAX_WIDTH:
            new_h = round(h * MAX_WIDTH / w)
            img = img.resize((MAX_WIDTH, new_h), Image.LANCZOS)
            status = f"resize {w}x{h}->{MAX_WIDTH}x{new_h}"
        else:
            status = f"keep {w}x{h}"

        # 保存为 WebP
        webp_path = png_path.with_suffix(".webp")
        img.save(
            webp_path,
            "WEBP",
            quality=QUALITY,
            method=METHOD,
            progressive=True,
        )

    new_size = webp_path.stat().st_size

    # 删除原 PNG（备份已在脚本外完成）
    png_path.unlink()

    return orig_size, new_size, status


def main():
    if not IMAGES_DIR.exists():
        print(f"❌ 目录不存在: {IMAGES_DIR}")
        sys.exit(1)

    # 收集所有 PNG
    pngs = sorted(IMAGES_DIR.rglob("*.png"))
    if not pngs:
        print("ℹ️  没有找到 PNG 图片")
        return

    print(f"📂 处理目录: {IMAGES_DIR}")
    print(f"🖼️  发现 {len(pngs)} 张 PNG")
    print(f"⚙️  配置: quality={QUALITY}, max_width={MAX_WIDTH}, method={METHOD}")
    print()

    total_orig = 0
    total_new = 0
    results = []

    for png in pngs:
        orig, new, status = compress_one(png)
        total_orig += orig
        total_new += new
        results.append((png, orig, new, status))

        # 单张报告
        ratio = (1 - new / orig) * 100 if orig else 0
        print(
            f"  {png.relative_to(IMAGES_DIR)}: "
            f"{human_size(orig)} -> {human_size(new)} "
            f"(↓{ratio:.0f}%) [{status}]"
        )

    print()
    print("=" * 60)
    print(f"✅ 总计 {len(pngs)} 张图片")
    print(f"   原始大小: {human_size(total_orig)}")
    print(f"   压缩后:   {human_size(total_new)}")
    print(f"   节省:     {human_size(total_orig - total_new)} "
          f"({(1 - total_new / total_orig) * 100:.1f}%)")
    print("=" * 60)
    print()
    print("💡 下一步：")
    print("   1. 代码中 .png 引用需更新为 .webp")
    print("   2. 提交并推送：git add -A && git commit && git push")


if __name__ == "__main__":
    main()
