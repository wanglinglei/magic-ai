import transformerDirectives from '@unocss/transformer-directives';
import { defineConfig, presetAttributify, presetUno, transformerVariantGroup } from 'unocss';

export default defineConfig({
  presets: [presetAttributify(), presetUno()],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  theme: {
    fontFamily: {
      BebasNeue: ['BebasNeue', 'sans-serif'],
      BiaoTiHei: ['YouSheBiaoTiHei', 'sans-serif'],
      AlibabaPuHuiTi: ['AlibabaPuHuiTi', 'sans-serif'],
    },
  },
  shortcuts: [
    {
      operation: 'flex gap-x-6px justify-center items-center',
      'flex-center': 'flex justify-center items-center',
      'flex-col-center': 'flex justify-center items-center flex-col',
      'flex-between': 'flex justify-between items-center',
      'theme-green': 'text-[#00C800]',
      'theme-pale-green': 'text-[#61D6D1]',
      'theme-blue': 'text-[#1296DB]',
      'theme-orange': 'text-[#F1A55B]',
      'theme-red': 'text-[#FF0000]',
      'theme-gray': 'text-[#E0F0FF]/80',
    },
  ],
});
