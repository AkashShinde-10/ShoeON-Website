import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'aboutUs.html',
        checkout: 'checkout.html',
        contact: 'contactUs.html',
        home: 'home.html',
        login: 'login.html',
        payment: 'payment.html',
        product: 'product.html',
        signup: 'signup.html',
        success: 'success.html'
      },
    },
  },
});
