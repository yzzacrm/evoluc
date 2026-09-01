# Vídeos do hero (scroll-scrub)

Status atual: **preenchido com as filmagens reais do decorado** enviadas pelo
cliente (cortadas e comprimidas para web com ffmpeg).

- `take-1.mp4` — Cozinha planejada (12,4s, ~1,4MB)
- `take-2.mp4` — Quarto e acabamentos (16,4s, ~3,7MB)
- `take-3.mp4` — Área de lazer do condomínio (9,4s, ~2,3MB)

Cada arquivo tem um poster (`take-N-poster.jpg`) usado como capa antes do
vídeo carregar.

## Para trocar por vídeos novos

Basta substituir os arquivos `take-1.mp4` / `take-2.mp4` / `take-3.mp4` por
novos arquivos com o mesmo nome (a página já reflete a mudança automaticamente,
sem precisar editar código). Para gerar poster e comprimir um vídeo novo:

```bash
ffmpeg -i entrada.mp4 -vf "scale=1920:1080" -an -c:v libx264 -preset slow -crf 24 -movflags +faststart public/videos/take-1.mp4
ffmpeg -ss 0.5 -i public/videos/take-1.mp4 -frames:v 1 -q:v 3 public/videos/take-1-poster.jpg
```

Se algum arquivo `take-N.mp4` estiver ausente ou não carregar, o site exibe
automaticamente um placeholder estilizado no lugar — a mecânica de scroll
continua funcionando normalmente.
