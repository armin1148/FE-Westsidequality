# 🎨 CMS Block Dashboard

Dashboard quản lý nội dung dạng block với giao diện hiện đại, phong cách SaaS.

## ✨ Tính năng

### 📦 Quản lý Blocks

- Danh sách blocks dạng bảng với tìm kiếm và lọc
- Tạo, chỉnh sửa, xem chi tiết blocks
- Hỗ trợ nhiều formats: Hero, Banner, Text+Image, Gallery, FAQ, CTA
- Chọn và đổi template cho từng block
- Quản lý trạng thái (Active/Draft)

### 🎨 Quản lý Templates

- Danh sách templates phân theo format
- Preview templates dạng card
- Tạo template mới
- Áp dụng template cho blocks

### 📊 Dashboard

- Thống kê tổng quan: tổng blocks, blocks active, templates, blocks draft
- Danh sách blocks gần đây
- Giao diện trực quan với biểu đồ

### ⚙️ Cài đặt & Người dùng

- Quản lý cấu hình hệ thống
- Quản lý người dùng

## 🚀 Cài đặt

```bash
# Cài đặt dependencies
pnpm install

# Chạy development server
pnpm dev

# Build production
pnpm build

# Chạy production
pnpm start
```

Mở [http://localhost:3000](http://localhost:3000) để xem dashboard.

## 🏗️ Cấu trúc dự án

```
fe-dashboard/
├── app/                      # Next.js App Router
│   ├── page.tsx              # Dashboard chính
│   ├── blocks/               # Quản lý blocks
│   │   ├── page.tsx          # Danh sách blocks
│   │   └── [id]/page.tsx     # Chi tiết block
│   ├── templates/            # Quản lý templates
│   ├── settings/             # Cài đặt
│   └── users/                # Quản lý người dùng
├── components/
│   ├── ui/                   # UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   └── textarea.tsx
│   ├── layout/               # Layout components
│   │   ├── sidebar.tsx
│   │   ├── topbar.tsx
│   │   └── dashboard-layout.tsx
│   └── dialogs/              # Dialog components
│       ├── create-block-dialog.tsx
│       └── create-template-dialog.tsx
├── lib/
│   ├── utils.ts              # Utility functions
│   └── mock-data.ts          # Mock data
├── types/
│   └── index.ts              # TypeScript types
└── styles/
    └── globals.css           # Global styles
```

## 🎨 Block Formats

### Hero

- Tiêu đề, mô tả, CTA button
- Phù hợp cho trang chủ, landing page

### Banner

- Tiêu đề, mô tả, hình ảnh
- Phù hợp cho quảng cáo, thông báo

### Text + Image

- Tiêu đề, nội dung văn bản, hình ảnh
- Phù hợp cho giới thiệu, about us

### Gallery

- Danh sách hình ảnh
- Hiển thị dạng grid hoặc masonry

### FAQ

- Câu hỏi và trả lời
- Hiển thị dạng accordion

### CTA (Call to Action)

- Tiêu đề, mô tả, button action
- Phù hợp cho chuyển đổi người dùng

## 🎯 Cách sử dụng

### Tạo Block mới

1. Click nút "Tạo Block" ở top bar
2. Nhập tên block và chọn format
3. Chọn template từ danh sách
4. Điền nội dung tương ứng với format
5. Lưu block

### Chỉnh sửa Block

1. Vào trang "Quản lý Blocks"
2. Click "Xem" hoặc "Sửa" ở block cần chỉnh sửa
3. Cập nhật thông tin và nội dung
4. Click "Lưu" để lưu thay đổi

### Đổi Template

1. Vào chi tiết block
2. Click "Chọn Template khác"
3. Chọn template mong muốn từ danh sách
4. Template được áp dụng ngay lập tức

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Theo chuẩn shadcn/ui
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Animations**: tailwindcss-animate

## 🎨 Design System

### Colors

- **Primary**: Blue 600 (#3B82F6) với gradients
- **Background**: Gray 50 với backdrop blur
- **Surface**: White với subtle borders
- **Accent**: Blue 50-100 cho hover states

### Typography

- **Font**: System fonts với antialiasing
- **Weights**: Medium (500), Semibold (600), Bold (700)
- **Sizes**: Responsive với line-height tối ưu

### Components

- **Border radius**: 12-16px (lg, xl)
- **Shadows**: Layered shadows với blur
- **Spacing**: 16-24px grid system
- **Transitions**: 200ms ease-out
- **Focus states**: Ring với offset
- **Hover effects**: Scale, shadow, background changes

### Interactions

- **Buttons**: Active scale effect, shadow transitions
- **Cards**: Hover shadow elevation
- **Inputs**: Focus ring với smooth transitions
- **Dialogs**: Backdrop blur, fade + zoom animations

## 📝 License

MIT
