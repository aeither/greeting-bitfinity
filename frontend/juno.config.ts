import {defineConfig} from '@junobuild/config';

export default defineConfig({
  satellite: {
    id: '5atmt-fiaaa-aaaal-amtma-cai',
    source: 'dist',
    predeploy: ['pnpm build']
  }
});
