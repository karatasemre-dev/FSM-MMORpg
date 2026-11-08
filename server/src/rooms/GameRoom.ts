import { Room } from 'colyseus';

/**
 * Boş oyun odası (Faz 0). Henüz oyun mantığı yok ve istemci bağlanmıyor.
 * Gerçek durum (state) ve mesajlar Faz 2'de eklenecek.
 */
export class GameRoom extends Room {
  onCreate(): void {
    console.info('[GameRoom] oda oluşturuldu');
  }

  onDispose(): void {
    console.info('[GameRoom] oda kapatıldı');
  }
}
