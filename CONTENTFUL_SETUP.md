# Contentful Setup

This guide explains how to recreate the Strapi data structure inside Contentful so
the frontend can fetch products directly from Contentful’s Content Delivery API.

## 1. Create a space

1. Log in at https://app.contentful.com and create (or reuse) a **Space**.
2. Inside the space create a new **Environment** (default `master` is fine).
3. Grab the following values for later:
   - `Space ID`
   - `Environment ID`
   - `Content Delivery API - access token`
   - (Optional) `Content Preview API - access token` if you want draft data.

## 2. Define the `product` content model

Create a content type named **Product** with the fields below. Match the ID
exactly so the frontend mapping works without extra transforms.

| Field ID         | Type                        | Notes                                                                                                                                                |
| ---------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`          | Short text                  | Required                                                                                                                                             |
| `slug`           | Short text (unique)         | Suggested for stable URLs. If you prefer numeric URLs, set validation to “must match regex `^[0-9]+$`” and store the same value as `frontPageOrder`. |
| `frontPageOrder` | Number (integer)            | Required, also used to control ordering and optional slug replacement.                                                                               |
| `frontPage`      | Boolean                     | “Show on homepage.” Default: true.                                                                                                                   |
| `frontPageText2` | Long text (Markdown)        | Short summary/excerpt for cards and hero.                                                                                                            |
| `coverImage`     | Media (one asset)           | Prefer JPG/PNG ≤ 2 MB.                                                                                                                               |
| `content`        | Long text (Markdown)        | Full case study body.                                                                                                                                |
| `tools`          | Array of short text entries | Comma-separated tags are no longer necessary; use one entry per tool name.                                                                           |
| `tags`           | Array of short text entries | Used for chips on the cards and product page.                                                                                                        |

> **Dica:** cada tag/tool deve ser um item separado (não use vírgulas dentro
> do mesmo campo). Os nomes são convertidos para minúsculo para mapear ícones
> conhecidos (`figma`, `photoshop`, `nextjs`, `tailwind`, etc.). Qualquer nome
> sem ícone aparece como chip textual automaticamente.

### Assets

Upload cover images to the Media section. Each product entry should reference
one `coverImage`. Contentful auto-hosts them at `images.ctfassets.net`, which
the Next.js app will allow via `next.config.ts`.

## 3. Populate entries

You can migrate existing Strapi data manually or via import.

### Manual entry

1. Click **Content → Add entry → Product**.
2. Fill the fields listed above.
3. Publish the entry.
4. Repeat for each product.

### Bulk import (optional)

1. Export Strapi JSON using the `/api/products?populate=*` endpoint.
2. Normalize each record to Contentful’s expected shape:

```json
{
  "sys": { "id": "product-bua" },
  "fields": {
    "title": { "en-US": "Bua na Cainte" },
    "slug": { "en-US": "bua-na-cainte" },
    "frontPageOrder": { "en-US": 1 },
    "frontPage": { "en-US": true },
    "frontPageText2": { "en-US": "Short excerpt..." },
    "content": { "en-US": "## Markdown body..." },
    "tools": { "en-US": ["figma", "html5"] },
    "tags": { "en-US": ["Education", "Migration"] },
    "coverImage": {
      "en-US": {
        "sys": { "type": "Link", "linkType": "Asset", "id": "asset-cover-bua" }
      }
    }
  }
}
```

3. Upload assets first using `contentful space import` with an assets-only file.
4. Run `contentful space import` again with entries referencing the asset IDs.

## 4. Environment variables (preview)

Once the space has entries, set these env vars in `.env.local` (and on Vercel):

```
CONTENTFUL_SPACE_ID=<space>
CONTENTFUL_ENVIRONMENT=<environment>
CONTENTFUL_DELIVERY_TOKEN=<CDA token>
CONTENTFUL_PREVIEW_TOKEN=<optional CPA token>
```

The frontend tasks that follow will rely on these variables to fetch data
directly from Contentful’s API—no local installation needed.
