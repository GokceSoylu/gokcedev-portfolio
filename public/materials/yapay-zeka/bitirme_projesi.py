import os
import webbrowser
from datetime import datetime

# ==============================================================================
# SMARTEVENT AI - TAMAMLANMIŞ BİTİRME PROJESİ KODU (PERŞEMBE + CUMA)
# Dosya Adı: main.py
# ==============================================================================

# 1. ADIM: ETKİNLİK SINIFI (OOP TEMELLERİ - 9 KASIM KAZANIMI)
class Etkinlik:
    def __init__(self, id_no, ad, tur, fiyat, kontenjan):
        self.id_no = int(id_no)
        self.ad = ad
        self.tur = tur
        self.fiyat = float(fiyat)
        self.kontenjan = int(kontenjan)

    def bilgi_yazdir(self):
        return f"[{self.id_no:2d}] {self.ad:28s} | {self.tur:10s} | {self.fiyat:6.2f} TL | Kalan Koltuk: {self.kontenjan}"

    def koltuk_dusur(self):
        if self.kontenjan > 0:
            self.kontenjan -= 1
            return True
        return False


# 2. ADIM: MÜŞTERİ ANA SINIFI VE KALITIM (10 KASIM KAZANIMI)
class Musteri:
    def __init__(self, ad_soyad, butce):
        self.ad_soyad = ad_soyad
        self._butce = float(butce)  # Kapsülleme (Encapsulation - Gizli Değişken)
        self.uyelik_tipi = "Standart Üye"

    def butce_getir(self):
        return self._butce

    def butce_goster(self):
        return self._butce

    def odeme_yap(self, tutar):
        if self._butce >= tutar:
            self._butce -= tutar
            return True
        return False

    def fiyat_hesapla(self, ham_fiyat):
        # Standart müşteri biletin tam fiyatını öder
        return float(ham_fiyat)


class VIPMusteri(Musteri):
    def __init__(self, ad_soyad, butce):
        # Üst sınıfın (Musteri) kurucu metodunu çağırıyoruz
        super().__init__(ad_soyad, butce)
        self.uyelik_tipi = "VIP Üye (%20 İndirimli)"

    def fiyat_hesapla(self, ham_fiyat):
        # Metot Ezme (Override): VIP müşteriye %20 indirim uygulanır
        return float(ham_fiyat) * 0.80


# 3. ADIM: CSV VERİ TABANI OKUMA (11 KASIM KAZANIMI)
def etkinlikleri_csvden_yukle(dosya_yolu):
    liste = []
    try:
        with open(dosya_yolu, "r", encoding="utf-8") as dosya:
            for satir in dosya.readlines()[1:]:
                parcalar = satir.strip().split(",")
                if len(parcalar) == 5:
                    liste.append(
                        Etkinlik(
                            parcalar[0],
                            parcalar[1],
                            parcalar[2],
                            parcalar[3],
                            parcalar[4]
                        )
                    )
    except FileNotFoundError:
        print(f"[HATA] '{dosya_yolu}' dosyası bulunamadı! Lütfen dosyanın main.py ile aynı klasörde olduğundan emin olun.")
    return liste


# 4. ADIM: AKILLI ÖNERİ FONKSİYONU (CUMA GÖREV 1)
def akilli_oneri_getir(etkinlikler, aranan_tur, musteri, maks_tutar):
    oneriler = []
    ust_limit = min(musteri.butce_getir(), float(maks_tutar))
    for etk in etkinlikler:
        indirimli_fiyat = musteri.fiyat_hesapla(etk.fiyat)
        if etk.tur.lower() == aranan_tur.lower() and indirimli_fiyat <= ust_limit and etk.kontenjan > 0:
            oneriler.append(etk)
    return oneriler


# 5. ADIM: HTML/CSS DİJİTAL BİLET ÜRETİCİ (CUMA GÖREV 2)
def html_bilet_uret(musteri, etkinlik, odenen_tutar):
    islem_tarihi = datetime.now().strftime("%d.%m.%Y %H:%M")

    html_metni = f"""<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>SmartEvent AI - Dijital Bilet</title>
    <style>
        body {{
            background: #f1f5f9;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }}
        .bilet-karti {{
            background: #ffffff;
            width: 420px;
            border-radius: 18px;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
            overflow: hidden;
            border: 1px solid #cbd5e1;
        }}
        .bilet-ust {{
            background: linear-gradient(135deg, #1e293b, #2563eb);
            color: #ffffff;
            padding: 24px;
            text-align: center;
        }}
        .bilet-ust img {{
            border-radius: 10px;
            margin-bottom: 8px;
        }}
        .bilet-icerik {{
            padding: 24px;
        }}
        .etkinlik-adi {{
            font-size: 20px;
            font-weight: bold;
            color: #0f172a;
            text-align: center;
            margin-bottom: 18px;
            padding-bottom: 12px;
            border-bottom: 2px dashed #cbd5e1;
        }}
        .satir {{
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 15px;
        }}
        .etiket {{
            color: #64748b;
            font-weight: 600;
        }}
        .deger {{
            color: #1e293b;
            font-weight: 700;
        }}
        .fiyat-alani {{
            background: #f8fafc;
            border-radius: 12px;
            padding: 14px;
            margin-top: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid #e2e8f0;
        }}
        .tutar {{
            font-size: 20px;
            font-weight: 800;
            color: #16a34a;
        }}
        .bilet-alt {{
            background: #f8fafc;
            text-align: center;
            padding: 14px;
            font-size: 13px;
            color: #475569;
            border-top: 1px solid #e2e8f0;
        }}
    </style>
</head>
<body>
    <div class="bilet-karti">
        <div class="bilet-ust">
            <img src="logo.png" width="80" alt="Logo" onerror="this.style.display='none'">
            <h2>SMARTEVENT AI</h2>
            <p>Resmi Dijital Bilet</p>
        </div>
        <div class="bilet-icerik">
            <div class="etkinlik-adi">{etkinlik.ad}</div>
            <div class="satir">
                <span class="etiket">Müşteri:</span>
                <span class="deger">{musteri.ad_soyad}</span>
            </div>
            <div class="satir">
                <span class="etiket">Üyelik Tipi:</span>
                <span class="deger">{musteri.uyelik_tipi}</span>
            </div>
            <div class="satir">
                <span class="etiket">Kategori:</span>
                <span class="deger">{etkinlik.tur}</span>
            </div>
            <div class="satir">
                <span class="etiket">Etkinlik ID:</span>
                <span class="deger">#{etkinlik.id_no}</span>
            </div>
            <div class="satir">
                <span class="etiket">Tarih:</span>
                <span class="deger">{islem_tarihi}</span>
            </div>
            <div class="fiyat-alani">
                <span class="etiket">Ödenen Tutar:</span>
                <span class="tutar">{odenen_tutar:.2f} TL</span>
            </div>
        </div>
        <div class="bilet-alt">
            ✔ Biletiniz onaylanmıştır. İyi eğlenceler!
        </div>
    </div>
</body>
</html>"""

    with open("bilet.html", "w", encoding="utf-8") as f:
        f.write(html_metni)


# 6. ADIM: SATIŞ GEÇMİŞİ KAYIT SİSTEMİ
def satis_gecmisi_kaydet(musteri, etkinlik, odenen_tutar):
    tarih = datetime.now().strftime("%d.%m.%Y %H:%M:%S")
    with open("satis_gecmisi.txt", "a", encoding="utf-8") as f:
        f.write(f"[{tarih}] {musteri.ad_soyad} ({musteri.uyelik_tipi}) | {etkinlik.ad} | {odenen_tutar:.2f} TL\n")


# 7. ADIM: KONSOL MENÜSÜ VE ANA PROGRAM AKIŞI
def main():
    print("=" * 72)
    print("         SMARTEVENT AI - AKILLI ETKİNLİK VE BİLET SİSTEMİ         ")
    print("=" * 72)

    etkinlikler = etkinlikleri_csvden_yukle("etkinlikler.csv")
    if not etkinlikler:
        return

    ad_soyad = input("Adınız ve Soyadınız: ").strip()
    if not ad_soyad:
        ad_soyad = "Misafir Müşteri"

    while True:
        try:
            butce = float(input("Mevcut Bütçeniz (TL): "))
            if butce < 0:
                print("[UYARI] Bütçe negatif olamaz!")
                continue
            break
        except ValueError:
            print("[HATA] Lütfen sayı yerine harf girmeyiniz! Geçerli bir tutar yazın.")

    vip_mi = input("VIP Müşteri misiniz? (%20 İndirim) (E/H): ").strip().upper()
    if vip_mi == "E":
        musteri = VIPMusteri(ad_soyad, butce)
    else:
        musteri = Musteri(ad_soyad, butce)

    satis_listesi = []

    while True:
        print("\n" + "-" * 72)
        print(f"Kullanıcı: {musteri.ad_soyad} | Statü: {musteri.uyelik_tipi} | Bakiye: {musteri.butce_getir():.2f} TL")
        print("-" * 72)
        print("1 - Tüm Etkinlikleri Listele")
        print("2 - Akıllı Etkinlik Önerisi Al")
        print("3 - Bilet Satın Al ve Dijital Bilet (bilet.html) Üret")
        print("4 - Satış Geçmişini Gör")
        print("0 - Çıkış")
        print("-" * 72)

        secim = input("Seçiminiz: ").strip()

        if secim == "1":
            print("\n--- TÜM ETKİNLİKLER ---")
            for etk in etkinlikler:
                print(etk.bilgi_yazdir())

        elif secim == "2":
            print("\n--- AKILLI ÖNERİ ALGORİTMASI ---")
            aranan_tur = input("Sevdiğiniz tür (Konser / Tiyatro / Teknoloji / Spor): ").strip()
            try:
                maks_tutar = float(input("Bu etkinlik için ödeyebileceğiniz maksimum tutar (TL): "))
            except ValueError:
                print("[HATA] Geçersiz sayı girdiniz! Mevcut bütçeniz baz alınıyor.")
                maks_tutar = musteri.butce_getir()

            oneriler = akilli_oneri_getir(etkinlikler, aranan_tur, musteri, maks_tutar)
            if oneriler:
                print(f"\nSize uygun {len(oneriler)} etkinlik bulundu:")
                for etk in oneriler:
                    indirimli = musteri.fiyat_hesapla(etk.fiyat)
                    print(f"-> {etk.bilgi_yazdir()} | Size Özel Fiyat: {indirimli:.2f} TL")
            else:
                print("[SONUÇ] Kriterlerinize ve bütçenize uygun boş kontenjanlı etkinlik bulunamadı.")

        elif secim == "3":
            print("\n--- BİLET SATIN ALMA ---")
            try:
                secilen_id = int(input("Satın almak istediğiniz etkinliğin ID numarası: "))
            except ValueError:
                print("[HATA] Lütfen sayısal bir ID numarası girin!")
                continue

            secilen_etkinlik = None
            for etk in etkinlikler:
                if etk.id_no == secilen_id:
                    secilen_etkinlik = etk
                    break

            if secilen_etkinlik is None:
                print("[HATA] Bu ID numarasına ait bir etkinlik bulunamadı!")
                continue

            if secilen_etkinlik.kontenjan <= 0:
                print("[ÜZGÜNÜZ] Bu etkinliğin kontenjanı dolmuştur!")
                continue

            odenecek_tutar = musteri.fiyat_hesapla(secilen_etkinlik.fiyat)
            print(f"Seçilen Etkinlik: {secilen_etkinlik.ad}")
            print(f"Ödenecek Tutar  : {odenecek_tutar:.2f} TL ({musteri.uyelik_tipi})")

            if musteri.odeme_yap(odenecek_tutar):
                secilen_etkinlik.koltuk_dusur()
                html_bilet_uret(musteri, secilen_etkinlik, odenecek_tutar)
                satis_gecmisi_kaydet(musteri, secilen_etkinlik, odenecek_tutar)
                satis_listesi.append((secilen_etkinlik.ad, odenecek_tutar))

                print("\n[BAŞARILI] Bilet satın alındı ve 'bilet.html' dosyası üretildi!")
                print(f"Kalan Bakiyeniz: {musteri.butce_getir():.2f} TL")

                acilsin_mi = input("Dijital bileti tarayıcıda açmak ister misiniz? (E/H): ").strip().upper()
                if acilsin_mi == "E":
                    webbrowser.open("file://" + os.path.abspath("bilet.html"))
            else:
                print("[YETERSİZ BAKİYE] Bütçeniz bu bileti satın almak için yeterli değil!")

        elif secim == "4":
            print("\n--- SATIŞ GEÇMİŞİ ---")
            if not satis_listesi:
                print("Henüz bilet satın almadınız.")
            else:
                for i, (ad, tutar) in enumerate(satis_listesi, 1):
                    print(f"{i}. {ad} - {tutar:.2f} TL")

        elif secim == "0":
            print("Sistemden çıkış yapılıyor. İyi günler!")
            break

        else:
            print("[UYARI] Geçersiz seçim! Lütfen menüdeki numaralardan birini girin.")


if __name__ == "__main__":
    main()
