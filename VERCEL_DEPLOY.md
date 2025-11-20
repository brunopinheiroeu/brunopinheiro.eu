# Deploy no Vercel - Guia Completo

## ✅ O que já está configurado

- ✅ `next.config.ts` aceita imagens de `images.ctfassets.net`
- ✅ `package.json` possui scripts de build/teste
- ✅ Código pronto para consumir o Contentful Delivery API

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

1. No painel do projeto, vá em **Settings → Environment Variables**
2. Adicione as variáveis abaixo (marcando Production, Preview e Development):

| Name                        | Value                                   |
| --------------------------- | --------------------------------------- |
| `CONTENTFUL_SPACE_ID`       | ID do espaço no Contentful              |
| `CONTENTFUL_ENVIRONMENT`    | Ambiente (ex.: `master`)                |
| `CONTENTFUL_DELIVERY_TOKEN` | Token do Content Delivery API           |
| `CONTENTFUL_PREVIEW_TOKEN`  | (Opcional) Token do Content Preview API |

3. Clique em **Save**

> ⚠️ Sem esses tokens o frontend não consegue buscar dados do Contentful.

### 4. Fazer o Deploy

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

- Confirme se os IDs/tokens do Contentful estão corretos
- Verifique se existem entradas publicadas
- Veja os logs do Vercel para eventuais `errors` retornados pela API GraphQL

### Erro: "Image hostname not configured"

- Confira se `images.ctfassets.net` está cadastrado em `next.config.ts`
- Refaça o deploy após qualquer alteração nesse arquivo

### Build falha

- Verifique os logs do build no Vercel
- Certifique-se de que todas as dependências estão no `package.json`
- Verifique se não há erros de TypeScript (`npm run build` localmente)

## 📝 Checklist de Deploy

- [ ] Repositório conectado ao Vercel
- [ ] Root Directory configurado (se necessário)
- [ ] Variáveis `CONTENTFUL_*` adicionadas
- [ ] Build executado com sucesso (`npm run build`)
- [ ] Site funcionando em produção (produtos e imagens carregando)
