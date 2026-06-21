"""
专门压缩二维码图片的脚本
- 缩放到 TARGET_SIZE（400px 方形，网页显示 200px，留 2x 余量）
- 转 1-bit 黑白（最高对比度，扫描可靠性最佳）
- 保持 PNG 格式
"""
from PIL import Image
import os

QR_DIR = "/home/z/my-project/public/images/qr"
TARGET_SIZE = 400  # 网页显示 200px，留 2x 高清余量

print(f"📂 处理目录: {QR_DIR}")
print(f"⚙️  目标尺寸: {TARGET_SIZE}x{TARGET_SIZE} px")
print()

total_before = 0
total_after = 0

for name in sorted(os.listdir(QR_DIR)):
    if not name.endswith(".png"):
        continue
    path = os.path.join(QR_DIR, name)
    orig_size = os.path.getsize(path)
    total_before += orig_size

    with Image.open(path) as img:
        # 裁剪为正方形（居中裁剪）
        w, h = img.size
        side = min(w, h)
        left = (w - side) // 2
        top = (h - side) // 2
        img = img.crop((left, top, left + side, top + side))

        # 缩放到目标尺寸
        img = img.resize((TARGET_SIZE, TARGET_SIZE), Image.LANCZOS)

        # 转 RGB -> 灰度 -> 1-bit 黑白（最大对比度，扫描最稳）
        img = img.convert("L").point(lambda x: 0 if x < 128 else 255, "1")

        # 保存为 PNG（optimize=True 减小体积）
        img.save(path, "PNG", optimize=True)

    new_size = os.path.getsize(path)
    total_after += new_size
    ratio = (1 - new_size / orig_size) * 100
    print(
        f"  {name:25s}  "
        f"{orig_size//1024}KB -> {new_size//1024}KB  "
        f"(↓{ratio:.0f}%)"
    )

print()
print("=" * 60)
print(f"✅ 4 张二维码压缩完成")
print(f"   原始: {total_before//1024} KB ({total_before/1024/1024:.2f} MB)")
print(f"   压缩后: {total_after//1024} KB ({total_after/1024/1024:.2f} MB)")
print(f"   节省: {(total_before-total_after)//1024} KB ({(1-total_after/total_before)*100:.1f}%)")
print("=" * 60)
