# CLAUDE.md — Proje kuralları

## Her oturumda

1. **Önce `PROGRESS.md`'yi oku.** Projeyi baştan okumak yerine oradan devam et.
2. Oturum sonunda `PROGRESS.md`'yi güncelle (durum, yapılanlar, sıradaki adım).
3. Önce plan yap, kullanıcıya göster, onay bekle. Faz sınırının dışına çıkma.
4. Emin olmadığın kararları kullanıcıya sor.

## Kullanıcı

- Yeni başlayan biri; iPad kullanıyor, yerel bilgisayarı yok. Safari'de test ediyor.
- Teknik terimleri **sade Türkçe** ile açıkla. Adımlar iPad/Safari'den yapılabilir olmalı.

## Yapı

- `shared/` ortak tipler, `client/` Vite + Three.js, `server/` Colyseus, `docs/` belgeler.
- Client ve server ortak şeyleri **yalnızca** `@fsm/shared`'den import eder.

## Kod stili

- TypeScript `strict`; `any` yok. Prettier (tek tırnak, noktalı virgül, 100 sütun) ve ESLint zorunlu.
- Kod yorumları ve kullanıcıya dönük metinler Türkçe; değişken/fonksiyon adları İngilizce.
- Sunucu otoriterdir: oyun mantığı sunucuda, istemci yalnızca gösterir ve girdi yollar.
- Dokunmatik öncelikli tasarla (iPad Safari); `devicePixelRatio` sınırlı tut.

## Doğrulama (tamamlandı demeden önce)

`npm run lint`, `npm run format:check`, `npm run build`, `npm test` ve `npm run dev` çalıştırılıp
doğrulanır. Çalışmayan şey "tamamlandı" işaretlenmez.

## Komutlar

`npm install` · `npm run dev` · `npm run build` · `npm test` · `npm run lint` · `npm run format`

## Git

Belirtilen dalda çalış, anlamlı commit mesajları yaz. Kullanıcı istemedikçe PR açma.
