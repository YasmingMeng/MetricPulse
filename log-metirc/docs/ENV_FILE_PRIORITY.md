# Next.js 环境变量加载顺序说明

## 🔍 发现的问题

你的项目中有两个 `.env` 文件：

- **`.env`**: `DATABASE_SCHEMA=public` ⚠️
- **`.env.local`**: `DATABASE_SCHEMA=preview` ✅

## Next.js 环境变量加载优先级

Next.js 按以下**从高到低**的优先级加载环境变量：

### 开发模式 (`npm run dev`)

1. ✅ **`.env.local`** - **最高优先级**（本地开发配置，不会被 Git 提交）
2. `.env.development.local`
3. `.env.development`
4. `.env` - **最低优先级**

### 生产模式 (`npm run build` / `npm start`)

1. `.env.local`
2. `.env.production.local`
3. `.env.production`
4. `.env`

## ⚠️ 重要说明

### `.env.local` vs `.env`

- **`.env.local`**:

  - ✅ **优先级更高**
  - ✅ **不会提交到 Git**（通常在 `.gitignore` 中）
  - ✅ **用于本地开发配置**

- **`.env`**:
  - ⚠️ **优先级较低**
  - ⚠️ **可能会提交到 Git**
  - ⚠️ **用于共享的默认配置**

## 🎯 解决方案

### 方案 1：删除 `.env` 中的 `DATABASE_SCHEMA`（推荐）

因为 `.env.local` 中已经有正确的配置，可以删除 `.env` 中的重复配置：

```bash
# 编辑 .env 文件，删除或注释掉这行：
# DATABASE_SCHEMA=public
```

### 方案 2：确保 `.env.local` 存在且正确

确认 `.env.local` 文件中有：

```env
DATABASE_SCHEMA=preview
```

### 方案 3：检查 `.env.development` 文件

如果存在 `.env.development` 文件，确保它不会覆盖 `.env.local` 的设置。

## 📋 next.config.ts 中的 dotenv

你的 `next.config.ts` 中有：

```typescript
dotenv.config({ path: '.env.development' })
```

这个配置**只影响 `next.config.ts` 文件本身**，不会影响 Next.js 应用代码中的环境变量。

Next.js 会**自动加载**所有 `.env` 文件，按照上述优先级。

## 🔧 验证方法

### 方法 1：运行检查脚本

```bash
npm run check:env
```

### 方法 2：在代码中打印

在 `src/lib/db-config.ts` 中添加：

```typescript
export function getDatabaseSchema(): string {
  const schema = process.env.DATABASE_SCHEMA || 'preview'
  console.log('📋 DATABASE_SCHEMA 值:', schema)
  return schema
}
```

### 方法 3：在终端检查

```bash
# 检查所有 .env 文件中的值
grep DATABASE_SCHEMA .env* 2>/dev/null
```

## ✅ 最佳实践

1. **使用 `.env.local` 存放本地开发配置**

   ```env
   DATABASE_SCHEMA=preview
   DATABASE_URL=postgresql://...
   ```

2. **使用 `.env` 存放默认配置**（可选）

   ```env
   # 不要包含 DATABASE_SCHEMA，让每个开发者自己配置
   # DATABASE_SCHEMA=preview
   ```

3. **不要提交 `.env.local` 到 Git**

   - 确保 `.gitignore` 中包含 `.env.local`

4. **重启开发服务器**
   - 修改 `.env` 文件后，必须重启 `npm run dev`

## 🐛 常见问题

### Q: 为什么设置后还是 `public`？

A: 可能的原因：

1. 没有重启开发服务器
2. `.env.local` 中的值被其他文件覆盖
3. 系统环境变量中设置了 `DATABASE_SCHEMA=public`

### Q: `.env.local` 和 `.env` 同时存在会怎样？

A: `.env.local` 的优先级更高，会覆盖 `.env` 中的同名变量。

### Q: 如何确认当前使用的值？

A: 运行 `npm run check:env` 或查看代码日志输出。
