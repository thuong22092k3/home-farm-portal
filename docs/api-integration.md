# Home Farm Portal API integration

Portal gọi API tại `https://home-farm-api.vercel.app/api/v1` theo mặc định.

Có thể cấu hình lại bằng các biến môi trường:

```text
NEXT_PUBLIC_HOME_FARM_API_URL=https://home-farm-api.vercel.app/api/v1
NEXT_PUBLIC_HOME_FARM_FARMER_ID=user-farmer
NEXT_PUBLIC_HOME_FARM_ADMIN_ID=user-admin
```

Trong prototype, request dùng `x-user-id` theo contract hiện tại của API. Khi triển khai đăng nhập thật, thay hai ID mẫu bằng access token hoặc session HTTP-only phía server.

Các màn Farmer sử dụng namespace `/farmer/*`; các màn Admin sử dụng `/admin/*`. Lớp dùng chung nằm tại `src/data/api`, gồm Axios client, TanStack Query client, request/response types, API functions và hooks theo từng domain. Mutation tự động invalidate các query được khai báo trong `meta`.
