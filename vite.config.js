import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  mode: 'production', // 生产模式
  build: {
		chunkSizeWarningLimit: 2000,
		cssCodeSplit: true,
		sourcemap: false,
		minify: 'terser',
		outDir: 'put', // 输出文件夹
		assetsInlineLimit: 4000,
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
		rollupOptions: {
			output: {
				chunkFileNames: 'assets/js/[name]-[hash].js',
				entryFileNames: 'assets/js/[name]-[hash].js',
				assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
				// 分块打包
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				},
			},
		},
	},
})
