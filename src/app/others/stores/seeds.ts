import {
  FAQInterface,
  FAQItem,
  ProdukHukumInterface,
  ProdukHukumItem,
} from './interfaces';

export const FAQItemData: FAQItem = {
  id_faq: 0,
  id_kategori_faq: '',
  nama_faq: '',
  isi: '',
  created_at: '',
  updated_at: '',
};

export const FAQData: FAQInterface = {
  kategori: '',
  child: [FAQItemData],
};

export const ProdukHukumItemData: ProdukHukumItem = {
  created_at: '',
  file: '',
  file_path: '',
  file_path_url: '',
  id_kategori_peraturan: '',
  id_peraturan: 0,
  judul: '',
  keterangan: '',
  updated_at: '',
};

export const ProdukHukumData: ProdukHukumInterface = {
  child: [ProdukHukumItemData],
  kategori: '',
};
