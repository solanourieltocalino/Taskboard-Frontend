    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react-swc'
    import path from 'node:path'

    export default defineConfig({
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@/api': path.resolve(__dirname, 'src/api'),
                '@/components': path.resolve(__dirname, 'src/components'),
                '@/pages': path.resolve(__dirname, 'src/pages'),
                '@/types': path.resolve(__dirname, 'src/types'),
                '@/hooks': path.resolve(__dirname, 'src/hooks')
            }
        }
    })
