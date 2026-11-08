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
- [x] **Canlı yayın doğrulandı:** PR #1 `main`'e birleşti, Pages iş akışı (build + deploy) yeşil;
      kullanıcı iPad Safari'de https://karatasemre-dev.github.io/FSM-MMORpg/ adresini açtı, küp dönüyor.

## Faz 1 — yapılan işler

Kararlar (kullanıcı onayıyla): kontrol = **yüzen sanal joystick** (ekranın sol yarısı), kamera =
**karakteri takip eden, sabit izometrik açı**. Sunucu yok; her şey yerel.

- [x] `client/src` parçalandı: `scene.ts`, `camera.ts`, `player.ts`, `loop.ts`, `input/` (joystick,
      klavye, birleştirici), `game/movement.ts` (saf fonksiyonlar, Three.js/DOM'dan bağımsız)
- [x] Zemin 100x100, kapsül karakter + yön "burnu", gölge (gölge kamerası oyuncuyu izler)
- [x] Hareket: ölü bölge %10, çapraz hızlanma yok, sabit hız 5 birim/sn, `dt` ile ölçekli ve
      `dt` üst sınırı 0.1 sn, zemin sınırında durma, yumuşak dönüş
- [x] Dokunmatik: Pointer Events + `setPointerCapture`, tek parmak izlenir, `pointercancel`/blur'da
      sıfırlanır; WASD/ok tuşları da çalışır
- [x] Vitest: 15 birim testi geçti (`npm test`)
- [x] Playwright + gerçek dokunma olayları (CDP) ile iPad dikey/yatay: joystick yukarı/sağ doğru
      yöne gidiyor, bırakınca duruyor, sayfa kaymıyor, konsol hatası yok; klavye çalışıyor
- [x] `lint`, `format:check`, `build`, `test` geçiyor; CI'a `npm test` eklendi
- [ ] **Gerçek iPad Safari testi bekliyor** (PR `main`'e birleşip Pages güncellenince)

Dev modunda `window.__fsm.player` otomatik testler için açığa çıkar (üretim derlemesinde yok).

## Bilinen notlar

- Three.js paketi büyük (~536 kB); Vite uyarı verir, Faz 0 için sorun değil.
- Colyseus bağımlılık ağacında `npm audit` düşük/orta uyarılar var; ileride gözden geçirilecek.
- Pages yayını yalnızca `main` dalında tetiklenir (GitHub ortam kuralı).
- Sunucu bulutta çalışır; iPad localhost'a erişemez. Çok oyunculu test için Faz 2'de sunucu
  barındırma kararı gerekecek.

## Sıradaki adım

1. Kullanıcı Faz 1'i iPad Safari'de dener (joystick hissi, takip kamerası) ve geri bildirim verir.
2. Onaydan sonra Faz 2 (istemci–sunucu bağlantısı) için plan + prompt yazılır; Faz 2'de sunucu
   barındırma kararı gerekir. Onay olmadan Faz 2'ye başlanmaz.

## Oturum günlüğü

- **Oturum 1:** Faz 0 kurulumu yapıldı (yukarıdaki liste). PR #1 birleşti, Pages yayını canlı ve
  iPad Safari'de doğrulandı (2026-11-08). Faz 0 tamamlandı.
- **Oturum 2:** Faz 1 kodlandı ve otomatik testlerle doğrulandı; gerçek iPad testi bekliyor.
