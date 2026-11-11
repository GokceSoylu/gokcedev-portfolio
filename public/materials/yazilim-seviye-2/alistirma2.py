class Calisan:
    def __init__(self, isim: str, uzmanlik: str, saatlik_ucret: float, maksimum_kapasite_saat: int):
        self.isim = isim
        self.uzmanlik = uzmanlik
        self.saatlik_ucret = saatlik_ucret
        self.maksimum_kapasite_saat = maksimum_kapasite_saat
        self.mevcut_is_yuku = 0

    def musait_mi(self, eklenecek_saat: int) -> bool:
        return (self.mevcut_is_yuku + eklenecek_saat) <= self.maksimum_kapasite_saat

    def bilgi_ver(self) -> str:
        return f"{self.isim} ({self.uzmanlik}) - İş Yükü: {self.mevcut_is_yuku}/{self.maksimum_kapasite_saat} saat"


class Gorev:
    def __init__(self, gorev_adi: str, gereken_uzmanlik: str, tahmini_sure: int):
        self.gorev_adi = gorev_adi
        self.gereken_uzmanlik = gereken_uzmanlik
        self.tahmini_sure = tahmini_sure
        self.atanan_calisan = None
        self.tamamlandi_mi = False
        self.gerceklesen_sure = 0


class Proje:
    def __init__(self, proje_adi: str, toplam_butce: float):
        self.proje_adi = proje_adi
        self.toplam_butce = toplam_butce
        self.kalan_butce = toplam_butce
        self.gorevler = []

    def gorev_ekle(self, yeni_gorev: Gorev):
        self.gorevler.append(yeni_gorev)
        print(f"[+] '{yeni_gorev.gorev_adi}' görevi '{self.proje_adi}' projesine eklendi.")

    def _gorev_bul(self, gorev_adi: str):
        for gorev in self.gorevler:
            if gorev.gorev_adi == gorev_adi:
                return gorev
        return None

    def gorev_ata(self, gorev_adi: str, calisan: Calisan):
        gorev = self._gorev_bul(gorev_adi)
        if gorev is None:
            print(f"HATA: '{gorev_adi}' adında bir görev bulunamadı!")
            return

        if gorev.atanan_calisan is not None:
            print(f"REDDEDİLDİ: '{gorev_adi}' görevi zaten {gorev.atanan_calisan.isim} adlı çalışana atanmış!")
            return

        if gorev.gereken_uzmanlik != calisan.uzmanlik:
            print(f"REDDEDİLDİ: Uzmanlık uyuşmazlığı! '{gorev_adi}' için '{gorev.gereken_uzmanlik}' gerekli, "
                  f"ancak {calisan.isim} uzmanlığı '{calisan.uzmanlik}'.")
            return

        if not calisan.musait_mi(gorev.tahmini_sure):
            print(f"REDDEDİLDİ: Kapasite aşımı! {calisan.isim} bu görevi alırsa maksimum saat sınırını aşıyor. "
                  f"(Mevcut: {calisan.mevcut_is_yuku}, Görev: {gorev.tahmini_sure}, Sınır: {calisan.maksimum_kapasite_saat})")
            return

        tahmini_maliyet = gorev.tahmini_sure * calisan.saatlik_ucret
        if tahmini_maliyet > self.kalan_butce:
            print(f"REDDEDİLDİ: Yetersiz bütçe! '{gorev_adi}' tahmini maliyeti ({tahmini_maliyet:.2f} TL), "
                  f"kalan bütçeyi ({self.kalan_butce:.2f} TL) aşıyor.")
            return

        # Tüm kontroller başarılı, atamayı gerçekleştir
        gorev.atanan_calisan = calisan
        calisan.mevcut_is_yuku += gorev.tahmini_sure
        self.kalan_butce -= tahmini_maliyet
        print(f"ATAMA BAŞARILI: '{gorev_adi}' -> {calisan.isim} | Bloke Edilen Bütçe: {tahmini_maliyet:.2f} TL")

    def gorevi_tamamla(self, gorev_adi: str, gerceklesen_sure: int):
        gorev = self._gorev_bul(gorev_adi)
        if gorev is None:
            print(f"HATA: '{gorev_adi}' adında bir görev bulunamadı!")
            return

        if gorev.atanan_calisan is None:
            print(f"HATA: '{gorev_adi}' henüz hiçbir çalışana atanmamış, tamamlanamaz!")
            return

        if gorev.tamamlandi_mi:
            print(f"UYARI: '{gorev_adi}' görevi zaten daha önce tamamlanmış!")
            return

        calisan = gorev.atanan_calisan
        gorev.tamamlandi_mi = True
        gorev.gerceklesen_sure = gerceklesen_sure

        # Çalışanın üzerindeki tahmini iş yükünü kaldır
        calisan.mevcut_is_yuku -= gorev.tahmini_sure

        # Maliyet farkını hesapla ve bütçeyi revize et
        sure_farki = gerceklesen_sure - gorev.tahmini_sure
        maliyet_farki = sure_farki * calisan.saatlik_ucret
        self.kalan_butce -= maliyet_farki

        print(f"TAMAMLANDI: '{gorev_adi}' ({calisan.isim}) tarafından {gerceklesen_sure} saatte bitirildi.")
        if maliyet_farki > 0:
            print(f" -> Tahminden {sure_farki} saat uzun sürdü. Bütçeden ek {maliyet_farki:.2f} TL düşüldü.")
        elif maliyet_farki < 0:
            print(f" -> Tahminden {abs(sure_farki)} saat erken bitti! Bütçeye {abs(maliyet_farki):.2f} TL iade edildi.")
        else:
            print(" -> Tam tahmin edilen sürede tamamlandı, ek bütçe değişimi yok.")

    def proje_ozeti(self):
        toplam_gorev = len(self.gorevler)
        tamamlanan_gorev = sum(1 for g in self.gorevler if g.tamamlandi_mi)
        ilerleme_yuzdesi = (tamamlanan_gorev / toplam_gorev * 100) if toplam_gorev > 0 else 0.0

        print("\n" + "=" * 55)
        print(f"PROJE ÖZET RAPORU: {self.proje_adi}")
        print(f"İlerleme Durumu : %{ilerleme_yuzdesi:.1f} ({tamamlanan_gorev}/{toplam_gorev} Görev Tamamlandı)")
        print(f"Başlangıç Bütçe : {self.toplam_butce:.2f} TL")
        print(f"Kalan Bütçe     : {self.kalan_butce:.2f} TL", end="")
        if self.kalan_butce < 0:
            print(" (DİKKAT: BÜTÇE AŞIMI!)")
        else:
            print()

        print("-" * 55)
        print("GÖREV DETAYLARI:")
        for g in self.gorevler:
            durum = "Tamamlandı" if g.tamamlandi_mi else ("Devam Ediyor" if g.atanan_calisan else "Atanmadı")
            calisan_adi = g.atanan_calisan.isim if g.atanan_calisan else "Yok"
            sure_bilgisi = f"Tahmini: {g.tahmini_sure}s"
            if g.tamamlandi_mi:
                sure_bilgisi += f", Gerçekleşen: {g.gerceklesen_sure}s"
            print(f" * {g.gorev_adi} [{g.gereken_uzmanlik}] -> Durum: {durum} | Çalışan: {calisan_adi} | ({sure_bilgisi})")
        print("=" * 55)


# ==========================================
# TEST VE SİMÜLASYON
# ==========================================
if __name__ == "__main__":
    # 1. Çalışanları Oluşturma
    dev_ali = Calisan("Ali", "Backend", saatlik_ucret=400.0, maksimum_kapasite_saat=25)
    dev_zeynep = Calisan("Zeynep", "Frontend", saatlik_ucret=350.0, maksimum_kapasite_saat=20)

    # 2. Projeyi ve Görevleri Oluşturma
    e_ticaret_projesi = Proje("E-Ticaret Platformu", toplam_butce=12000.0)

    g1 = Gorev("Veritabanı Mimarisi", "Backend", tahmini_sure=15)
    g2 = Gorev("Ödeme API Entegrasyonu", "Backend", tahmini_sure=12)
    g3 = Gorev("Ana Sayfa Arayüzü", "Frontend", tahmini_sure=10)

    e_ticaret_projesi.gorev_ekle(g1)
    e_ticaret_projesi.gorev_ekle(g2)
    e_ticaret_projesi.gorev_ekle(g3)

    print("\n--- Atama Testleri ---")
    # Uzmanlık uyuşmazlığı testi (Backend görevine Frontend çalışanı atama)
    e_ticaret_projesi.gorev_ata("Veritabanı Mimarisi", dev_zeynep)

    # Başarılı atama (Ali: 15 saat iş yükü aldı, 6000 TL bütçe bloke edildi)
    e_ticaret_projesi.gorev_ata("Veritabanı Mimarisi", dev_ali)

    # Kapasite aşımı testi (Ali'nin 15 saati var, +12 saat = 27 saat > 25 saat sınırı)
    e_ticaret_projesi.gorev_ata("Ödeme API Entegrasyonu", dev_ali)

    # Başarılı atama (Zeynep: 10 saat iş yükü aldı, 3500 TL bütçe bloke edildi)
    e_ticaret_projesi.gorev_ata("Ana Sayfa Arayüzü", dev_zeynep)

    print("\n--- Görev Tamamlama ve Bütçe Revizyonu ---")
    # Ali 15 saatlik işi 12 saatte erken bitiriyor (3 saatlik ücret bütçeye iade edilmeli ve Ali'nin iş yükü sıfırlanmalı)
    e_ticaret_projesi.gorevi_tamamla("Veritabanı Mimarisi", gerceklesen_sure=12)

    # Ali artık müsait olduğu için ikinci Backend görevini alabilir
    e_ticaret_projesi.gorev_ata("Ödeme API Entegrasyonu", dev_ali)

    # Zeynep 10 saatlik işi 16 saatte bitiriyor (6 saatlik ek maliyet bütçeden kesilecek)
    e_ticaret_projesi.gorevi_tamamla("Ana Sayfa Arayüzü", gerceklesen_sure=16)

    # Proje Özeti Raporu
    e_ticaret_projesi.proje_ozeti()