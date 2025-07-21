"use client";
import { useForm } from 'react-hook-form';
import { Cog6ToothIcon, ServerIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

type SystemConfig = {
  serverAddress: string;
  port: number;
  timeout: number;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  autoUpdate: boolean;
};

export default function SystemConfigForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<SystemConfig>({
    defaultValues: {
      serverAddress: 'api.example.com',
      port: 8080,
      timeout: 30,
      logLevel: 'info',
      autoUpdate: true
    }
  });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // if (event.origin == window.location.origin) {
      //   return;
      // }
      console.log('Received message from parent:', event.data);
      const data = event.data;
      if (data && typeof data === 'object') {
        // 自动填充表单数据
        Object.keys(data).forEach((key) => {
          const validKeys: (keyof SystemConfig)[] = ['serverAddress', 'port', 'timeout', 'logLevel', 'autoUpdate'];
          if (validKeys.includes(key as keyof SystemConfig)) {
            // 处理数字类型转换
            const value = key === 'port' || key === 'timeout' 
              ? Number(data[key]) 
              : data[key];
              
            setValue(key as keyof SystemConfig, value, {
              shouldValidate: true,  
              shouldDirty: true,   
              shouldTouch: true      
            });
          }
        });
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [register, setValue]);

  const onSubmit = (data: SystemConfig) => {
    console.log('Submitted config:', data);
    // 提交逻辑
  };

  return (
    <div id="child-iframe">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 bg-white/10 rounded-lg backdrop-blur-sm">
        <div className="flex items-center mb-8 gap-3">
          <Cog6ToothIcon className="w-8 h-8 text-[#9AE6B4]" />
          <h2 className="text-2xl font-bold text-[#9AE6B4]">系统配置</h2>
        </div>

        <div className="space-y-6">
          {/* 服务器配置组 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-white">
                <ServerIcon className="w-5 h-5" />
                服务器地址
              </label>
              <input
                {...register('serverAddress', { required: '必填项' })}
                className="w-full px-4 py-2 bg-white/20 rounded-md text-white focus:ring-2 focus:ring-[#9AE6B4]"
              />
              {errors.serverAddress && (
                <span className="text-red-400 text-sm">{errors.serverAddress.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-white">
                <ServerIcon className="w-5 h-5" />
                端口号
              </label>
              <input
                type="number"
                {...register('port', { 
                  required: '必填项',
                  min: { value: 1, message: '端口范围1-65535' },
                  max: { value: 65535, message: '端口范围1-65535' }
                })}
                className="w-full px-4 py-2 bg-white/20 rounded-md text-white focus:ring-2 focus:ring-[#9AE6B4]"
              />
              {errors.port && <span className="text-red-400 text-sm">{errors.port.message}</span>}
            </div>
          </div>

          {/* 高级配置组 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-white">
                <ClockIcon className="w-5 h-5" />
                请求超时（秒）
              </label>
              <input
                type="number"
                {...register('timeout', { 
                  required: '必填项',
                  min: { value: 5, message: '最小5秒' }
                })}
                className="w-full px-4 py-2 bg-white/20 rounded-md text-white focus:ring-2 focus:ring-[#9AE6B4]"
              />
              {errors.timeout && <span className="text-red-400 text-sm">{errors.timeout.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-white">
                <DocumentTextIcon className="w-5 h-5" />
                日志级别
              </label>
              <select
                {...register('logLevel')}
                className="w-full px-4 py-2 bg-white/20 rounded-md text-white focus:ring-2 focus:ring-[#9AE6B4]"
              >
                <option value="debug">Debug</option>
                <option value="info">Info</option>
                <option value="warn">Warn</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>

          {/* 开关组 */}
          <div className="flex items-center gap-4 pt-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register('autoUpdate')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full peer-checked:bg-[#9AE6B4] transition-colors duration-200"></div>
            </label>
            <span className="text-sm text-white">自动更新配置</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#9AE6B4] hover:bg-[#7acf9d] text-black font-medium rounded-md transition-colors duration-200"
          >
            保存配置
          </button>
        </div>
      </form>
    </div>
  );
}