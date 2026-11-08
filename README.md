# FSM MMORPG

İzometrik açılı, 3D, hayatta kalma temalı, web tabanlı çok oyunculu oyun.
**Durum:** Faz 1 — karakteri joystick (iPad) veya WASD/ok tuşları (bilgisayar) ile gezdirebilirsiniz. Sunucu henüz istemciye bağlı değil.

Teknoloji: TypeScript, Three.js + Vite (istemci), Node.js + Colyseus (sunucu), npm workspaces.

## Klasörler

| Klasör    | Ne işe yarar                                 |
| --------- | -------------------------------------------- |
| `client/` | Tarayıcıda çalışan 3D oyun (Vite + Three.js) |
| `server/` | Oyun sunucusu (Colyseus)                     |
| `shared/` | İstemci ve sunucunun ortak kullandığı tipler |
| `docs/`   | Belgeler (ör. yayın kurulumu)                |

## Kurulum

Gerekenler: **Node.js 20 veya üstü** ve npm.

```bash
npm install
```

## Çalıştırma

```bash
npm run dev
```

Tek komut hem istemciyi hem sunucuyu başlatır:

- İstemci: http://localhost:5173
- Sunucu: http://localhost:2567

## Diğer komutlar

| Komut                  | Açıklama                     |
| ---------------------- | ---------------------------- |
| `npm run build`        | Her şeyi derler              |
| `npm run lint`         | Kod hatalarını denetler      |
| `npm run format`       | Kodu otomatik düzenler       |
| `npm run format:check` | Düzen kontrolü (değiştirmez) |

## Otomatik yayın

`main` dalına her değişiklik geldiğinde istemci GitHub Pages'e yayınlanır.
iPad/Safari'den yapılacak tek seferlik adımlar: [docs/YAYIN-KURULUMU.md](docs/YAYIN-KURULUMU.md)

## Proje hafızası

Fazlar, kararlar ve sıradaki adım: [PROGRESS.md](PROGRESS.md). Kurallar: [CLAUDE.md](CLAUDE.md).
