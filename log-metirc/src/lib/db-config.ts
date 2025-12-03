/*
 * @Description: 数据库配置工具
 * @Date: 2025-10-27 17:30:00
 */

/**
 * 获取当前使用的数据库 schema
 * 通过环境变量 DATABASE_SCHEMA 控制，默认为 'preview'（测试环境）
 * 
 * 环境变量设置：
 * - DATABASE_SCHEMA=preview (测试环境)
 * - DATABASE_SCHEMA=public (正式环境)
 */
export function getDatabaseSchema(): string {
  console.log('DATABASE_SCHEMA:', process.env.DATABASE_SCHEMA);
  return process.env.DATABASE_SCHEMA || 'preview';
}

/**
 * 格式化表名，包含 schema
 */
export function formatTableName(tableName: string): string {
  const schema = getDatabaseSchema();
  return `${schema}."${tableName}"`;
}

/**
 * 判断是否为正式环境
 */
export function isProduction(): boolean {
  return getDatabaseSchema() === 'public';
}

/**
 * 判断是否为测试环境
 */
export function isTest(): boolean {
  return getDatabaseSchema() === 'preview';
}

