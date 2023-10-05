export interface FAQInterface {
  kategori: string;
  child: FAQItem[];
}

export interface FAQItem {
  id_faq: number;
  id_kategori_faq: string;
  nama_faq: string;
  isi: string;
  created_at: string;
  updated_at: string;
}

export interface ProdukHukumItem {
  created_at: string;
  file: string;
  file_path: string;
  file_path_url: string;
  id_kategori_peraturan: string;
  id_peraturan: number;
  judul: string;
  keterangan: string;
  updated_at: string;
}

export interface ProdukHukumInterface {
  child: ProdukHukumItem[];
  kategori: string;
}
