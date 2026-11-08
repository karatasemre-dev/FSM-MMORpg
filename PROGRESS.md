# PROGRESS.md — Proje hafıza dosyası

> **Kural:** Her oturumun BAŞINDA bu dosyayı oku, SONUNDA güncelle.

## Proje özeti

İzometrik açılı, 3D, hayatta kalma temalı, web tabanlı MMORPG. Çapraz platform; ana test
cihazı iPad (Safari). Geliştirici bulutta çalışır, yerel bilgisayar yoktur.

## Teknoloji kararları

| Konu         | Karar                                                                     |
| ------------ | ------------------------------------------------------------------------- |
| Dil          | TypeScript (her yerde, `strict`)                                          |
| Monorepo     | npm workspaces: `shared`, `client`, `server`                              |
| İstemci      | Vite + Three.js (ortografik/izometrik kamera)                             |
| Sunucu       | Node.js + Colyseus 0.18 (`defineServer`/`defineRoom`/`listen`), port 2567 |
| Ortak tipler | `@fsm/shared` (derlenmiş `dist` üzerinden import edilir)                  |
| Kalite       | ESLint (flat config) + Prettier                                           |
| Yayın        | GitHub Pages, GitHub Actions ile (`main` dalı); karar: kullanıcı seçti    |
| Node sürümü  | 22 (>=20)                                                                 |

## Fazlar

| Faz | Konu                                                       | Durum                        |
| --- | ---------------------------------------------------------- | ---------------------------- |
| 0   | Temel kurulum                                              | Kodlandı, yayın doğrulanmadı |
| 1   | Oyuncu hareketi (izometrik kamera, dokunmatik kontrol)     | Başlanmadı                   |
| 2   | İstemci–sunucu bağlantısı, çok oyunculu senkronizasyon     | Başlanmadı                   |
| 3   | Dünya (harita, çevre)                                      | Başlanmadı                   |
| 4   | Hayatta kalma sistemleri (açlık, kaynak toplama, envanter) | Başlanmadı                   |
| 5   | Üretim ve inşa, düşmanlar                                  | Başlanmadı                   |
| 6   | Cilalama, performans, yayına hazırlık                      | Başlanmadı                   |

## Faz 0 — yapılan işler

- [x] Monorepo iskeleti, tsconfig, ESLint, Prettier, `.gitignore`
- [x] `shared`: sabitler (`GAME_ROOM_NAME`, `DEFAULT_SERVER_PORT`); build geçti
- [x] `client`: Vite + Three.js, dönen küp, izometrik kamera, dokunmatik/boyut uyumu; build geçti;
      iPad dikey/yatay ekran görüntüsüyle doğrulandı (konsol hatası yok)
- [x] `server`: boş `GameRoom`; `localhost:2567` HTTP 200 doğrulandı; istemciye bağlı DEĞİL
- [x] `npm run dev` tek komutla client (5173) + server (2567) başlatıyor — doğrulandı
- [x] `npm run lint`, `npm run format:check`, `npm run build` geçiyor
- [x] GitHub Actions iş akışları yazıldı (`ci.yml`, `deploy-pages.yml`), `docs/YAYIN-KURULUMU.md`
- [ ] **Canlı yayın doğrulanmadı:** kullanıcı Pages ayarını yapıp `main`'e merge edene kadar
      yayının çalıştığı kanıtlanmış sayılmaz.

## Bilinen notlar

- Three.js paketi büyük (~536 kB); Vite uyarı verir, Faz 0 için sorun değil.
- Colyseus bağımlılık ağacında `npm audit` düşük/orta uyarılar var; ileride gözden geçirilecek.
- Pages yayını yalnızca `main` dalında tetiklenir (GitHub ortam kuralı).
- Sunucu bulutta çalışır; iPad localhost'a erişemez. Çok oyunculu test için Faz 2'de sunucu
  barındırma kararı gerekecek.

## Sıradaki adım

1. Kullanıcı `docs/YAYIN-KURULUMU.md` adımlarını uygular ve yayın adresini doğrular.
2. Onaydan sonra Faz 1 (oyuncu hareketi) için plan + prompt yazılır (kullanıcı onayıyla).

## Oturum günlüğü

- **Oturum 1:** Faz 0 kurulumu yapıldı (yukarıdaki liste).
