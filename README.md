# Evoluc Platform

Site institucional + base da futura plataforma do morador para a Evoluc
Engenharia. Construído com Next.js 16 (App Router), TypeScript, Tailwind CSS
v4 e Framer Motion.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Estrutura

- `src/app/*` — páginas (uma pasta por rota).
- `src/components/home/*` — seções da home, incluindo `ScrollVideoHero.tsx`
  (o hero com scroll-scrub de vídeo em 3 takes).
- `src/components/developments`, `src/components/blog`, `src/components/forms`,
  `src/components/finance` — componentes reutilizáveis por área.
- `src/lib/data.ts` — conteúdo dos lançamentos, blog, depoimentos e
  diferenciais. **Vários itens aqui são placeholders marcados no código**
  (ex: depoimentos, obras entregues) — procure por `PLACEHOLDER` no arquivo.
- `public/videos/` — os 3 vídeos do hero (`take-1.mp4`, `take-2.mp4`,
  `take-3.mp4`) + posters. Veja o README dentro da pasta para instruções de
  substituição/compressão.

## Status do projeto

### Fase 1 — concluída
Site institucional completo: home com hero de scroll-vídeo, quem somos,
diferenciais, lançamentos (listagem + página de detalhe por empreendimento),
entregues, blog (listagem + post), simulador de financiamento interativo,
formulário de contato, formulário para consultores de vendas, e uma página
de entrada para a Área do Morador (login de UI, ainda sem backend).

### Fase 2 — próximos passos (não implementado ainda)
A Área do Morador atualmente é uma tela de login "de vitrine" — não há
backend, banco de dados ou autenticação real ainda. Para a Fase 2:

1. Banco de dados (Postgres) + autenticação (ex: NextAuth ou Supabase Auth)
   com um usuário por cliente/unidade.
2. Modelagem: `clientes`, `unidades`, `empreendimentos`, `mensagens`,
   `atualizacoes_obra`, `documentos`, `lembretes`.
3. Painel do morador: feed de atualizações de obra, mensagens com a Evoluc,
   lembretes/prazos e documentos (contrato, boletos, manual do proprietário).
4. Painel administrativo interno para a equipe Evoluc postar atualizações,
   responder mensagens e cadastrar clientes/unidades.
5. Notificações por e-mail (e opcionalmente WhatsApp) quando houver nova
   atualização ou mensagem.

## Hospedagem

O projeto não depende de nenhum provedor específico:

- **Vercel**: deploy mais simples, zero configuração adicional.
- **Hostinger VPS/Cloud**: rodar com `npm run build && npm run start` atrás
  de um Nginx (reverse proxy) + PM2 para manter o processo Node ativo.
- **Hostinger hospedagem compartilhada (só PHP/MySQL)**: não roda Next.js
  diretamente — seria necessário migrar a Fase 2 para uma stack PHP ou usar
  export estático apenas para as páginas públicas (sem a Área do Morador).

## Conteúdo pendente de dados reais

Procure por `[nome a confirmar]`, `[Placeholder`, ou `TODO` no código para
encontrar todos os pontos que precisam de conteúdo real do cliente:
depoimentos de moradores, fotos de obras entregues, fotos institucionais e
galeria de cada lançamento.
