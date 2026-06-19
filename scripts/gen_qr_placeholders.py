"""Generate placeholder QR codes for the BATHLUXE contact section.
These are placeholders that the user should later replace with their actual
WeChat / Douyin QR code images.
"""
import qrcode
from qrcode.constants import ERROR_CORRECT_H
import os

OUT_DIR = "/home/z/my-project/public/images/qr"
os.makedirs(OUT_DIR, exist_ok=True)


def make_qr(data: str, filename: str):
    qr = qrcode.QRCode(
        version=None,
        error_correction=ERROR_CORRECT_H,
        box_size=12,
        border=2,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#1a1a1a", back_color="white")
    img.save(os.path.join(OUT_DIR, filename))
    print(f"  -> {filename}  ({data})")


# 占位二维码 - 用户后续替换为真实二维码图片即可
make_qr("https://u.wechat.com/PLACEHOLDER_REPLACE_ME", "wechat-qr.png")
make_qr("https://www.douyin.com/user/PLACEHOLDER_REPLACE_ME", "douyin-qr.png")
make_qr("https://www.xiaohongshu.com/user/PLACEHOLDER_REPLACE_ME", "xiaohongshu-qr.png")

print("\n✓ 占位二维码已生成，位于 public/images/qr/")
print("  用户可将真实二维码图片替换以下文件：")
print("  - public/images/qr/wechat-qr.png       (微信)")
print("  - public/images/qr/douyin-qr.png       (抖音)")
print("  - public/images/qr/xiaohongshu-qr.png  (小红书)")
