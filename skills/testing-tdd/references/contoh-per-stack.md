# Contoh Test per Stack

> Contoh sintaks; **cek dokumentasi versi yang terpasang** sebelum memakai (API berubah antar versi).

## PHP / Laravel (PHPUnit atau Pest)

```php
// tests/Feature/PesananTest.php
public function test_menolak_pesanan_bila_stok_kurang(): void
{
    $produk = Produk::factory()->create(['stok' => 1]);
    $user   = User::factory()->create();

    $res = $this->actingAs($user)->postJson('/api/pesanan', [
        'produk_id' => $produk->id, 'jumlah' => 2,
    ]);

    $res->assertStatus(422);                       // jalur gagal
    $this->assertDatabaseCount('pesanan', 0);      // tidak ada efek samping
}
```
Tips: `RefreshDatabase`/transaksi untuk isolasi, `Http::fake()` untuk API luar, `Mail::fake()`, `Carbon::setTestNow()` untuk membekukan waktu. Uji **otorisasi**: pengguna A tidak boleh mengakses pesanan pengguna B (`assertForbidden()`).

## TypeScript (Vitest/Jest)

```ts
import { describe, it, expect } from "vitest";
import { hitungTotal } from "./keranjang";

describe("hitungTotal", () => {
  it("mengembalikan 0 untuk keranjang kosong", () => {
    expect(hitungTotal([])).toBe(0);
  });
  it("menjumlahkan harga x jumlah", () => {
    expect(hitungTotal([{ harga: 10000, qty: 2 }])).toBe(20000);
  });
});
```
Tips: uji fungsi murni di unit; route handler lewat pengujian integrasi dengan DB uji; mock `fetch` pada batas luar saja.

## Python (pytest)

```python
import pytest
from toko.diskon import hitung_diskon

@pytest.mark.parametrize("total,harapan", [(0, 0), (99_999, 0), (100_000, 10_000)])
def test_diskon_10_persen_mulai_100rb(total, harapan):
    assert hitung_diskon(total) == harapan

def test_tolak_total_negatif():
    with pytest.raises(ValueError):
        hitung_diskon(-1)
```

## E2E (Playwright, satu alur kritis)

Uji alur nyata: buka halaman → isi form → kirim → lihat konfirmasi. Gunakan selector berbasis peran/label (`getByRole`), bukan kelas CSS rapuh. Jalankan di data uji terpisah. Simpan jumlah E2E kecil karena lambat dan rapuh.

## Checklist review test

- [ ] Nama menjelaskan perilaku; satu konsep per test
- [ ] Ada jalur gagal dan kasus tepi
- [ ] Tidak bergantung pada waktu/acak/urutan/jaringan
- [ ] Asersi bermakna (bukan sekadar "tidak error")
- [ ] Mock hanya di batas luar
- [ ] Bisa dijalankan sendirian dan cepat
