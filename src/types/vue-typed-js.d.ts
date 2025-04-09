declare module 'vue-typed-js' {
  import { DefineComponent } from 'vue';
  const VueTypedJs: DefineComponent<{
    strings: string[];
  }>;
  export default VueTypedJs;
} 