# Deploy no Vercel - Guia Completo

## ✅ O que já está configurado

- ✅ `next.config.ts` - Configurado para aceitar imagens do Strapi Cloud
- ✅ `package.json` - Scripts de build prontos
- ✅ Código pronto para produção

## 🔧 Configuração necessária no Vercel

### 1. Conectar o Repositório

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Clique em **Add New Project**
3. Conecte o repositório do GitHub/GitLab/Bitbucket
4. Selecione o repositório do **frontend** (não o repositório raiz)

### 2. Configurar o Projeto

**Root Directory:**

- Se o repositório for apenas o frontend: deixe em branco
- Se o repositório contém frontend e backend: defina como `frontend`

**Build Command:**

```
npm run build
```

**Output Directory:**

```
.next
```

**Install Command:**

```
npm install
```

### 3. Configurar Variáveis de Ambiente (OBRIGATÓRIO)

1. No painel do projeto, vá em **Settings** → **Environment Variables**
2. Adicione a seguinte variável:

| Name                     | Value                                                | Environments                     |
| ------------------------ | ---------------------------------------------------- | -------------------------------- |
| `NEXT_PUBLIC_STRAPI_URL` | `https://miraculous-animal-a6e1da2121.strapiapp.com` | Production, Preview, Development |

3. Clique em **Save**

> ⚠️ **Importante:** Sem essa variável, o frontend não conseguirá buscar dados do Strapi Cloud.

### 4. Configurar CORS no Strapi Cloud (se necessário)

Se você receber erros de CORS após o deploy, você pode precisar configurar CORS no código do backend. O Strapi Cloud geralmente já permite requisições por padrão, mas se necessário:

1. No projeto `backend/`, edite `config/middlewares.ts`
2. Configure o middleware de CORS para permitir seu domínio Vercel

**Nota:** Na maioria dos casos, o Strapi Cloud já está configurado para aceitar requisições de qualquer origem. Se você receber erros de CORS, verifique primeiro se a URL do Strapi está correta.

### 5. Fazer o Deploy

1. Clique em **Deploy**
2. Aguarde o build completar
3. Acesse a URL fornecida pelo Vercel

## 🔍 Verificar se está funcionando

Após o deploy, verifique:

1. ✅ A página carrega sem erros
2. ✅ Os produtos aparecem na página inicial
3. ✅ As imagens carregam corretamente
4. ✅ Os links para páginas de produtos funcionam

## 🐛 Troubleshooting

### Erro: "Failed to fetch products"

- Verifique se `NEXT_PUBLIC_STRAPI_URL` está configurada corretamente
- Verifique se o Strapi Cloud está rodando
- Verifique as configurações de CORS no Strapi Cloud

### Erro: "Image hostname not configured"

- O `next.config.ts` já está configurado, mas você precisa fazer um novo deploy após qualquer mudança nesse arquivo

### Build falha

- Verifique os logs do build no Vercel
- Certifique-se de que todas as dependências estão no `package.json`
- Verifique se não há erros de TypeScript (`npm run build` localmente)

## 📝 Checklist de Deploy

- [ ] Repositório conectado ao Vercel
- [ ] Root Directory configurado (se necessário)
- [ ] Variável `NEXT_PUBLIC_STRAPI_URL` adicionada
- [ ] CORS verificado (geralmente já funciona por padrão no Strapi Cloud)
- [ ] Build executado com sucesso
- [ ] Site funcionando em produção
