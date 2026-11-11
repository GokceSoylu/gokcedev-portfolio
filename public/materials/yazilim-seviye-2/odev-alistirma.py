class Calisan:
    def __init__(self, isim: str, uzmanlik: str, saatlik_ucret: float, maksimum_kapasite_saat: int):
        self.isim = isim
        self.uzmanlik = uzmanlik
        self.saatlik_ucret = float(saatlik_ucret)
        self.maksimum_kapasite_saat = int(maksimum_kapasite_saat)
        self.mevcut_is_yuku = 0  # Başlangıçta 0 olarak başlar

    def musait_mi(self, eklenecek_saat: int) -> bool:
        """Çalışanın mevcut iş yüküne eklenecek_saat eklendiğinde kapasiteyi aşıp aşmadığını kontrol eder."""
        return (self.mevcut_is_yuku + eklenecek_saat) <= self.maksimum_kapasite_saat


class Gorev:
    def __init__(self, gorev_adi: str, gereken_uzmanlik: str, tahmini_sure: int):
        self.gorev_adi = gorev_adi
        self.gereken_uzmanlik = gereken_uzmanlik
        self.tahmini_sure = int(tahmini_sure)
        self.atanan_calisan = None
        self.tamamlandi_mi = False
        self.gerceklesen_sure = 0


class Proje:
    def __init__(self, proje_adi: str, toplam_butce: float):
        self.proje_adi = proje_adi
        self.toplam_butce = float(toplam_butce)
        self.kalan_butce = float(toplam_butce)
        self.gorevler = []

    def gorev_ekle(self, gorev: Gorev):
        """Parametre olarak gelen Gorev nesnesini projenin görevler listesine ekler."""
        self.gorevler.append(gorev)
        print(f"[BİLGİ] '{gorev.gorev_adi}' görevi '{self.proje_adi}' projesine eklendi.")

    def gorev_ata(self, gorev_adi: str, calisan: Calisan):
        """İlgili görevi listeden bulur ve 4 şart sağlanıyorsa verilen Calisan nesnesine atar."""
        hedef_gorev = None
        for g in self.gorevler:
            if g.gorev_adi == gorev_adi:
                hedef_gorev = g
                break

        if hedef_gorev is None:
            print(f"[HATA] '{gorev_adi}' adında bir görev bulunamadı!")
            return False

        # Şart 1: Görev zaten başka birine atanmış olmamalıdır.
        if hedef_gorev.atanan_calisan is not None:
            print(f"[UYARI] '{gorev_adi}' görevi zaten {hedef_gorev.atanan_calisan.isim} adlı çalışana atanmış!")
            return False

        # Şart 2: Çalışanın uzmanlık alanı, görevin gereken_uzmanlik alanı ile birebir eşleşmelidir.
        if calisan.uzmanlik != hedef_gorev.gereken_uzmanlik:
            print(f"[UYARI] Uzmanlık uyuşmazlığı! '{gorev_adi}' için '{hedef_gorev.gereken_uzmanlik}' gerekli, ancak {calisan.isim} uzmanlığı '{calisan.uzmanlik}'.")
            return False

        # Şart 3: Çalışan bu görevin tahmini_sure'si için müsait olmalıdır.
        if not calisan.musait_mi(hedef_gorev.tahmini_sure):
            print(f"[UYARI] Kapasite yetersiz! {calisan.isim} bu görevi alırsa maksimum kapasitesini ({calisan.maksimum_kapasite_saat} saat) aşıyor.")
            return False

        # Şart 4: Görevin tahmini maliyeti, projenin kalan_butce'sini aşmamalıdır.
        tahmini_maliyet = hedef_gorev.tahmini_sure * calisan.saatlik_ucret
        if tahmini_maliyet > self.kalan_butce:
            print(f"[UYARI] Bütçe yetersiz! '{gorev_adi}' tahmini maliyeti ({tahmini_maliyet:.2f} TL), kalan bütçeyi ({self.kalan_butce:.2f} TL) aşıyor.")
            return False

        # Tüm şartlar sağlanıyorsa atama ve güncellemeler yapılır
        hedef_gorev.atanan_calisan = calisan
        calisan.mevcut_is_yuku += hedef_gorev.tahmini_sure
        self.kalan_butce -= tahmini_maliyet

        print(f"[BAŞARILI] '{gorev_adi}' görevi {calisan.isim} adlı çalışana atandı. (Bloke Edilen Bütçe: {tahmini_maliyet:.2f} TL | Kalan Bütçe: {self.kalan_butce:.2f} TL)")
        return True

    def gorevi_tamamla(self, gorev_adi: str, gerceklesen_sure: int):
        """Atanmış bir görevi tamamlar, iş yükünü düşürür ve bütçe revizyonu yapar."""
        hedef_gorev = None
        for g in self.gorevler:
            if g.gorev_adi == gorev_adi:
                hedef_gorev = g
                break

        # Kontroller: Görev bulunamazsa, kimseye atanmamışsa veya zaten tamamlanmışsa uyarı verir
        if hedef_gorev is None:
            print(f"[UYARI] '{gorev_adi}' adında bir görev bulunamadı!")
            return False

        if hedef_gorev.atanan_calisan is None:
            print(f"[UYARI] '{gorev_adi}' görevi henüz hiçbir çalışana atanmamış!")
            return False

        if hedef_gorev.tamamlandi_mi:
            print(f"[UYARI] '{gorev_adi}' görevi zaten daha önce tamamlanmış!")
            return False

        # Görev tamamlama işlemleri
        calisan = hedef_gorev.atanan_calisan
        hedef_gorev.tamamlandi_mi = True
        hedef_gorev.gerceklesen_sure = int(gerceklesen_sure)

        # Çalışanın üzerinden tahmini iş yükü kaldırılır
        calisan.mevcut_is_yuku -= hedef_gorev.tahmini_sure

        # Bütçe Revizyonu: (gerceklesen_sure - tahmini_sure) * calisan.saatlik_ucret
        sure_farki = hedef_gorev.gerceklesen_sure - hedef_gorev.tahmini_sure
        maliyet_farki = sure_farki * calisan.saatlik_ucret
        self.kalan_butce -= maliyet_farki

        if sure_farki < 0:
            print(f"[TAMAMLANDI] '{gorev_adi}' erken bitti! Bütçeye {abs(maliyet_farki):.2f} TL iade edildi. Güncel Kalan Bütçe: {self.kalan_butce:.2f} TL")
        elif sure_farki > 0:
            print(f"[TAMAMLANDI] '{gorev_adi}' tahmin edilenden uzun sürdü! Bütçeden {maliyet_farki:.2f} TL ek kesinti yapıldı. Güncel Kalan Bütçe: {self.kalan_butce:.2f} TL")
        else:
            print(f"[TAMAMLANDI] '{gorev_adi}' tam tahmini sürede bitti. Bütçe değişmedi. Güncel Kalan Bütçe: {self.kalan_butce:.2f} TL")

        return True

    def proje_ozeti(self):
        """Projenin genel durumunu, bütçesini, tamamlanma yüzdesini ve görev detaylarını yazdırır."""
        print("\n" + "=" * 65)
        print(f"PROJE ÖZETİ: {self.proje_adi}")
        print("=" * 65)
        print(f"Başlangıç Bütçesi : {self.toplam_butce:.2f} TL")
        
        if self.kalan_butce < 0:
            print(f"Güncel Kalan Bütçe: {self.kalan_butce:.2f} TL [UYARI: BÜTÇE AŞIMI! ({abs(self.kalan_butce):.2f} TL ekside)]")
        else:
            print(f"Güncel Kalan Bütçe: {self.kalan_butce:.2f} TL")

        toplam_gorev = len(self.gorevler)
        tamamlanan_gorev = sum(1 for g in self.gorevler if g.tamamlandi_mi)
        tamamlanma_yuzdesi = (tamamlanan_gorev / toplam_gorev * 100) if toplam_gorev > 0 else 0.0

        print(f"Tamamlanma Oranı  : %{tamamlanma_yuzdesi:.1f} ({tamamlanan_gorev}/{toplam_gorev} görev tamamlandı)")
        print("-" * 65)
        print("GÖREVLERİN DETAYLI DURUMU:")

        if not self.gorevler:
            print("  Projeye henüz görev eklenmemiş.")
        else:
            for i, g in enumerate(self.gorevler, 1):
                calisan_bilgi = f"{g.atanan_calisan.isim} ({g.atanan_calisan.uzmanlik})" if g.atanan_calisan else "Atanmadı"
                if g.tamamlandi_mi:
                    durum = "Tamamlandı"
                elif g.atanan_calisan is not None:
                    durum = "Devam Ediyor"
                else:
                    durum = "Beklemede"

                print(f"  {i}. {g.gorev_adi}")
                print(f"     - Gereken Uzmanlık : {g.gereken_uzmanlik}")
                print(f"     - Atanan Çalışan   : {calisan_bilgi}")
                print(f"     - Durum            : {durum}")
                print(f"     - Süre Bilgisi     : Tahmini: {g.tahmini_sure} saat | Gerçekleşen: {g.gerceklesen_sure} saat")
        print("=" * 65 + "\n")


# ==========================================
# TEST VE ÖRNEK KULLANIM SENARYOSU
# ==========================================
if __name__ == "__main__":
    # 1. Çalışanların Oluşturulması
    calisan1 = Calisan("Ahmet Yılmaz", "Backend", 500.0, 40)
    calisan2 = Calisan("Zeynep Kaya", "Frontend", 400.0, 30)
    calisan3 = Calisan("Mehmet Demir", "Veri Bilimi", 600.0, 25)

    # 2. Projenin Oluşturulması
    proje = Proje("E-Ticaret Platformu Geliştirme", 25000.0)

    # 3. Görevlerin Oluşturulması ve Projeye Eklenmesi
    g1 = Gorev("Veritabanı ve API Mimarisi", "Backend", 25)
    g2 = Gorev("Kullanıcı Arayüzü Tasarımı", "Frontend", 20)
    g3 = Gorev("Öneri Sistemi Algoritması", "Veri Bilimi", 15)
    g4 = Gorev("Ödeme Sistemi Entegrasyonu", "Backend", 20)

    proje.gorev_ekle(g1)
    proje.gorev_ekle(g2)
    proje.gorev_ekle(g3)
    proje.gorev_ekle(g4)
    print("-" * 65)

    # 4. Görev Atama Testleri (Başarılı ve Hatalı Durumlar)
    # Hatalı Test: Uzmanlık uyuşmazlığı (Backend görevine Frontend çalışanı atama)
    proje.gorev_ata("Veritabanı ve API Mimarisi", calisan2)

    # Başarılı Atamalar
    proje.gorev_ata("Veritabanı ve API Mimarisi", calisan1)  # Maliyet: 25 * 500 = 12500 TL (Kalan: 12500 TL)
    proje.gorev_ata("Kullanıcı Arayüzü Tasarımı", calisan2)  # Maliyet: 20 * 400 = 8000 TL  (Kalan: 4500 TL)

    # Hatalı Test: Kapasite aşımı (Ahmet'in 40 saat kapasitesi var, 25'i dolu. 20 saatlik görev eklenemez)
    proje.gorev_ata("Ödeme Sistemi Entegrasyonu", calisan1)

    # Hatalı Test: Bütçe yetersizliği (Kalan bütçe 4500 TL, Öneri Sistemi maliyeti: 15 * 600 = 9000 TL)
    proje.gorev_ata("Öneri Sistemi Algoritması", calisan3)
    print("-" * 65)

    # 5. Görev Tamamlama ve Bütçe Revizyonu Testleri
    # Erken biten görev -> Bütçeye para iadesi yapılır ve Ahmet'in iş yükü sıfırlanır
    proje.gorevi_tamamla("Veritabanı ve API Mimarisi", 20)  # 25 yerine 20 saat sürdü -> 5 * 500 = 2500 TL iade (Kalan: 7000 TL)

    # Uzun süren görev -> Bütçeden ek kesinti yapılır (Bütçe eksiye düşebilir)
    proje.gorevi_tamamla("Kullanıcı Arayüzü Tasarımı", 40)  # 20 yerine 40 saat sürdü -> 20 * 400 = 8000 TL ek kesinti (Kalan: -1000 TL)

    # 6. Proje Özeti Çıktısı
    proje.proje_ozeti()