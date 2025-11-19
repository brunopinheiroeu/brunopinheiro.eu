# Configurando Frontend com Strapi Cloud

Este guia explica como conectar o frontend Next.js ao Strapi Cloud.

## 1. Obter URL do Strapi Cloud

Após fazer o deploy do backend no Strapi Cloud, você receberá uma URL como:
- `https://seu-app.strapiapp.com`

## 2. Configuração Local (Desenvolvimento)

Crie um arquivo `.env.local` na raiz do projeto `frontend/`:

```bash
cd frontend
cp .env.example .env.local
```

Edite o `.env.local` e adicione a URL do seu Strapi Cloud:

```env
NEXT_PUBLIC_STRAPI_URL=https://seu-app.strapiapp.com
```

## 3. Configuração no Vercel (Produção)

1. Acesse o [Dashboard do Vercel](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione a variável:
   - **Name**: `NEXT_PUBLIC_STRAPI_URL`
   - **Value**: `https://seu-app.strapiapp.com`
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

Se você receber erros de CORS, verifique se o Strapi Cloud está configurado para permitir requisições do seu domínio:

1. No Strapi Cloud, vá em **Settings** → **Security**
2. Adicione seu domínio Vercel na lista de origens permitidas

### Erro 404 na API

Verifique se a URL está correta e se o Strapi Cloud está rodando. A URL deve terminar sem `/api`:
- ✅ Correto: `https://seu-app.strapiapp.com`
- ❌ Incorreto: `https://seu-app.strapiapp.com/api`

