// Minimal Deno type declarations for IDE support
// These globals are provided by the Deno runtime in Supabase Edge Functions.
// Quando o Deno está disponível, os tipos nativos sobrescrevem estes.

declare namespace Deno {
  export interface Env {
    get(name: string): string | undefined;
  }
  export const env: Env;
}
