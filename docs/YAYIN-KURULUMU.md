# Oyunu internette yayınlama (GitHub Pages) — iPad / Safari

Bu adımları **bir kez** yapmanız yeterli. Sonra `main` dalına her değişiklik gelişinde oyun
kendiliğinden güncellenir.

> **Önemli:** GitHub Pages'in ücretsiz planı için depo **herkese açık (Public)** olmalıdır.

## Adım 1 — Depoyu herkese açık yapın (gizliyse)

1. Safari'de `github.com` → deponuz `FSM-MMORpg` sayfasını açın.
2. **Settings** (Ayarlar) sekmesine girin. Küçük ekranda sekmeler "…" menüsünde olabilir.
3. En alta inin → **Danger Zone** → **Change visibility** → **Make public**.

## Adım 2 — Pages kaynağını "GitHub Actions" yapın

1. Aynı **Settings** sayfasında soldaki menüden **Pages**'i seçin.
2. **Build and deployment → Source** bölümünde **GitHub Actions**'ı seçin.

## Adım 3 — Değişiklikleri `main` dalına alın

Yayın yalnızca `main` dalındaki değişiklikte tetiklenir (GitHub'ın güvenlik kuralı).

1. Depoda **Pull requests** → **New pull request**.
2. `base: main` ← `compare: claude/funny-pasteur-a1nzdt` seçin → **Create pull request**.
3. **Merge pull request** → **Confirm merge**.

## Adım 4 — Yayını izleyin

1. Depoda **Actions** sekmesine girin. "İstemciyi GitHub Pages'e yayınla" işi çalışır (1–2 dk).
2. Yeşil tik gelince oyun şu adreste açılır:
   `https://<kullanıcı-adınız>.github.io/FSM-MMORpg/`
3. Adresi Safari'de açın. **Paylaş → Ana Ekrana Ekle** ile uygulama gibi kullanabilirsiniz.

## Sorun giderme

- **Sayfa 404 veriyor:** Adım 2'deki kaynağın "GitHub Actions" olduğunu kontrol edin.
- **Actions kırmızı:** İşe tıklayıp hata satırını bana gönderin.
- **Siyah ekran:** Adresin sonunda `/FSM-MMORpg/` olmalı (büyük/küçük harfe dikkat).
- Colyseus sunucusu bu yayına **dahil değildir**; Faz 2'de ayrıca barındırılacak.
