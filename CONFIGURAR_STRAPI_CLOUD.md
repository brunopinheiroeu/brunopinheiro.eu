# Configurar Frontend para Strapi Cloud

## Opção 1: Usando o Script Automático (Recomendado)

1. Execute o script com a URL do seu Strapi Cloud:

```bash
cd frontend
./configure-strapi-cloud.sh https://seu-app.strapiapp.com
```

**Exemplo:**
```bash
./configure-strapi-cloud.sh https://brunopinheiro.strapiapp.com
```

2. Reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Opção 2: Configuração Manual

1. Edite o arquivo `.env.local` na pasta `frontend/`:

```bash
cd frontend
nano .env.local  # ou use seu editor preferido
```

2. Atualize a URL:

```env
NEXT_PUBLIC_STRAPI_URL=https://seu-app.strapiapp.com
```

3. Salve o arquivo e reinicie o servidor:

```bash
npm run dev
```

## Verificar se está funcionando

Após configurar, acesse http://localhost:3000 e verifique se os produtos estão sendo carregados do Strapi Cloud.

## Configurar no Vercel (Produção)

Após fazer o deploy do frontend no Vercel:

1. Acesse o [Dashboard do Vercel](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione:
   - **Name**: `NEXT_PUBLIC_STRAPI_URL`
   - **Value**: `https://seu-app.strapiapp.com`
   - **Environments**: Marque todas (Production, Preview, Development)
5. Clique em **Save**
6. Faça um novo deploy

## Troubleshooting

### Erro de CORS

Se você receber erros de CORS, configure no Strapi Cloud:

1. No Strapi Cloud, vá em **Settings** → **Security**
2. Adicione seu domínio Vercel na lista de origens permitidas
3. Exemplo: `https://seu-site.vercel.app`

### Verificar URL

Certifique-se de que a URL está correta:
- ✅ Correto: `https://seu-app.strapiapp.com`
- ❌ Incorreto: `https://seu-app.strapiapp.com/api` (não inclua `/api`)

