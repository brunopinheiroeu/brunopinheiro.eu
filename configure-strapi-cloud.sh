#!/bin/bash

# Script para configurar o frontend para usar Strapi Cloud
# Uso: ./configure-strapi-cloud.sh https://seu-app.strapiapp.com

if [ -z "$1" ]; then
  echo "❌ Erro: URL do Strapi Cloud não fornecida"
  echo ""
  echo "Uso: ./configure-strapi-cloud.sh https://seu-app.strapiapp.com"
  echo ""
  echo "Exemplo:"
  echo "  ./configure-strapi-cloud.sh https://brunopinheiro.strapiapp.com"
  exit 1
fi

STRAPI_URL="$1"

# Remove trailing slash se houver
STRAPI_URL="${STRAPI_URL%/}"

echo "🔧 Configurando frontend para usar Strapi Cloud..."
echo "   URL: $STRAPI_URL"
echo ""

# Atualiza o .env.local
cat > .env.local << EOF
NEXT_PUBLIC_STRAPI_URL=$STRAPI_URL
EOF

echo "✅ Arquivo .env.local atualizado com sucesso!"
echo ""
echo "📝 Próximos passos:"
echo "   1. Reinicie o servidor de desenvolvimento: npm run dev"
echo "   2. Para produção no Vercel, adicione a variável NEXT_PUBLIC_STRAPI_URL nas configurações do projeto"
echo ""

