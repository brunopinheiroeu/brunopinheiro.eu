# Configurando Frontend com Strapi Cloud

Este guia explica como conectar o frontend Next.js ao Strapi Cloud.

## 1. Obter URL do Strapi Cloud

Após fazer o deploy do backend no Strapi Cloud, você receberá uma URL como:

- `https://seu-app.strapiapp.com`

## 2. Configuração Local (Desenvolvimento)

O arquivo `.env.local` já está configurado com:

```env
NEXT_PUBLIC_STRAPI_URL=https://miraculous-animal-a6e1da2121.strapiapp.com
```

Se precisar alterar, edite o arquivo `.env.local` na raiz do projeto `frontend/`.

## 3. Configuração no Vercel (Produção)

1. Acesse o [Dashboard do Vercel](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione a variável:
   - **Name**: `NEXT_PUBLIC_STRAPI_URL`
   - **Value**: `https://miraculous-animal-a6e1da2121.strapiapp.com`
   - **Environments**: Marque todas (Production, Preview, Development)
5. Clique em **Save**
6. Faça um novo deploy para aplicar as mudanças

## 4. Verificar Configuração

O código já está configurado para usar `NEXT_PUBLIC_STRAPI_URL` automaticamente. Você pode verificar em:

- `src/lib/strapi.ts` - linha 54-55

## 5. Testar Conexão

Após configurar, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse http://localhost:3000 e verifique se os produtos estão sendo carregados do Strapi Cloud.

## Troubleshooting

### Erro de CORS

O Strapi Cloud geralmente já permite requisições de qualquer origem por padrão. Se você receber erros de CORS:

1. Verifique se a URL do Strapi está correta (sem `/api` no final)
2. Verifique se o Strapi Cloud está rodando e acessível
3. Se necessário, configure CORS no código do backend editando `backend/config/middlewares.ts`

### Erro 404 na API

Verifique se a URL está correta e se o Strapi Cloud está rodando. A URL deve terminar sem `/api`:

- ✅ Correto: `https://seu-app.strapiapp.com`
- ❌ Incorreto: `https://seu-app.strapiapp.com/api`
