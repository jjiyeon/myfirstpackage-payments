import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'myfirstpackage-payments',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@xstate/react', 'xstate'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@xstate/react': '@xstate/react',
          xstate: 'xstate',
        },
      },
    },
    commonjsOptions: {
      esmExternals: ['react'],
    },
  },
  plugins: [react(), dts()],
  resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, 'src') },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@components', replacement: '/src/components' },
      { find: '@context', replacement: '/src/context' },
      { find: '@style', replacement: '/src/styles' },
    ],
  },
})
