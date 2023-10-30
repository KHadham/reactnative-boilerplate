export interface AttachmentInterface {
  filename: string,
  url: string
}

interface HistoriItem {
  CREATED_AT: string;
  CREATED_BY: string;
}

interface PenindakanItem {
  CAT_TINDAKAN: string | null;
  CREATED_BY: string;
  JENIS_TINDAKAN: string | null;
  TGL_TINDAKAN: string | null;
}

export interface ResponseDetailMarkerInterface {
  data_reklame:ResponseAtributInterface;
  data_histori: HistoriItem[];
  data_penindakan: PenindakanItem[];
}

export interface ResponseAtributInterface {
  ALMT_PMLK_IJIN: null | string;
  ALMT_PMLK_IJINI_KTN: null | string;
  ATTACHMENT: [AttachmentInterface]; // Assuming an array of a specific type
  BERADA_DI: null | string;
  BERBAHAYA: null | string;
  CAT_BERBAHAYA: null | string;
  CAT_KONDISI: null | string;
  CREATED_AT: string;
  CREATED_BY: string;
  CREATED_BY_ID: number;
  DIPASANG_PADA: null | string;
  EMAIL_PMLK_IJIN: null | string;
  EMAIL_PMLK_IJIN_KTN: null | string;
  INFO_PNYLNGGRA: null | string;
  JENIS: string;
  JENIS_TINDAKAN: null | string;
  KAWASAN: string;
  KD_BERADA_DI: number;
  KD_BERBAHAYA: null | string;
  KD_DIPASANG_PADA: number;
  KD_JENIS: number;
  KD_JENIS_TINDAKAN: number;
  KD_KAWASAN: number;
  KD_KEC: string;
  KD_KEC_PMLK_IJIN: string;
  KD_KEC_PMLK_IJIN_KTN: string;
  KD_KEL: string;
  KD_KEL_PMLK_IJIN: string;
  KD_KEL_PMLK_IJIN_KTN: string;
  KD_KONDISI: number;
  KD_LINGKUP: number;
  KD_MUKA: number;
  KD_PELETAKAN: number;
  KD_POSISI: number;
  KD_STATUS: number;
  KD_STATUS_IJIN: number;
  KD_STATUS_PAJAK: number;
  KD_STRUKTUR: number;
  KD_WIL: string;
  KD_WIL_PMLK_IJIN: string;
  KD_WIL_PMLK_IJIN_KTN: string;
  KEC: string;
  KEC_PMLK_IJIN: null | string;
  KEC_PMLK_IJIN_KTN: null | string;
  KEL: string;
  KEL_PMLK_IJIN: null | string;
  KEL_PMLK_IJIN_KTN: null | string;
  KET_LAINNYA: string;
  KODE: string;
  KOMENTAR: null | string;
  KONDISI: string;
  KONTEN: string;
  LEBAR: string;
  LINGKUP: string;
  LOKASI: string;
  MS_HBS_BRLKU: null | string;
  MS_IJIN: null | string;
  MUKA: null | string;
  NIK_PMLK_IJIN: null | string;
  NIK_PMLK_IJIN_KTN: null | string;
  NILAI_PAJAK: null | string;
  NM_PMLK_IJIN: null | string;
  NM_PMLK_IJIN_KTN: null | string;
  NM_PNYLNGGRA: null | string;
  NO_IMB: null | string;
  NO_IPR: null | string;
  NO_PPR: null | string;
  NO_TINDAKAN: null | string;
  NO_TLB: null | string;
  NPWP_PMLK_IJIN: null | string;
  NPWP_PMLK_IJIN_KTN: null | string;
  OBJECTID: number;
  PANJANG: string;
  PELETAKAN: null | string;
  PENENG: null | string;
  POSISI: string;
  REKLAME_ID: number;
  REL_OBJECTID: string;
  STATUS: null | string;
  STATUS_IJIN: null | string;
  STATUS_PAJAK: null | string;
  STRUKTUR: string;
  TELP_PMLK_IJIN: null | string;
  TELP_PNYLNGGRA: null | string;
  TGL_AKHR_PMSNGN: null | string;
  TGL_IJIN: null | string;
  TGL_PASANG: null | string;
  TGL_SURVEY: null | string;
  TGL_TINDAKAN: null | string;
  TINGGI: string;
  UPDATED_AT: null | string;
  UPDATED_BY: null | string;
  UPDATED_BY_ID: null | string;
  WIL: string;
  WIL_PMLK_IJIN: null | string;
  WIL_PMLK_IJIN_KTN: null | string;
  X: number;
  Y: number;
}

export interface BaseAtributInterface {
  ALMT_PMLK_IJIN: string | null,
  ALMT_PMLK_IJINI_KTN: string | null,
  BERADA_DI: string | null,
  BERBAHAYA: string | null,
  CAT_BERBAHAYA: string | null,
  CAT_KONDISI: string | null,
  CAT_PENINDAKAN: string | null,
  CREATED_AT: string,
  CREATED_BY: string,
  CREATED_BY_ID: number,
  DIPASANG_PADA: string,
  EMAIL_PMLK_IJIN: string | null,
  EMAIL_PMLK_IJIN_KTN: string | null,
  GROUP_BY: string,
  GROUP_BY_ID: number,
  ID_REF: string | null,
  INFO_PNYLNGGRA: string,
  IS_DELETE: number,
  JENIS: string,
  JENIS_TINDAKAN: string | null,
  KAWASAN: string,
  KD_BERADA_DI: number,
  KD_BERBAHAYA: string | null,
  KD_DIPASANG_PADA: number,
  KD_JENIS: number,
  KD_JENIS_TINDAKAN: number,
  KD_KAWASAN: number,
  KD_KEC: string,
  KD_KEC_PMLK_IJIN: string,
  KD_KEC_PMLK_IJIN_KTN: string,
  KD_KEL: string,
  KD_KEL_PMLK_IJIN: string,
  KD_KEL_PMLK_IJIN_KTN: string,
  KD_KONDISI: number,
  KD_LINGKUP: number,
  KD_MUKA: number,
  KD_PELETAKAN: number,
  KD_POSISI: number,
  KD_STATUS: number,
  KD_STATUS_IJIN: number,
  KD_STATUS_PAJAK: number,
  KD_STRUKTUR: number,
  KD_WIL: string,
  KD_WIL_PMLK_IJIN: string,
  KD_WIL_PMLK_IJIN_KTN: string,
  KEC: string,
  KEC_PMLK_IJIN: string | null,
  KEC_PMLK_IJIN_KTN: string,
  KEL: string,
  KEL_PMLK_IJIN: string | null,
  KEL_PMLK_IJIN_KTN: string,
  KET_LAINNYA: string,
  KODE: string,
  KOMENTAR: string | null,
  KONDISI: string,
  KONTEN: string,
  LEBAR: string,
  LINGKUP: string,
  LOKASI: string,
  LON_UNIF: string | null,
  LUM_JALAN: string | null,
  MS_HBS_BRLKU: string | null,
  MS_IJIN: string | null,
  MUKA: string | null,
  NIK_PMLK_IJIN: string | null,
  NIK_PMLK_IJIN_KTN: string,
  NILAI_PAJAK: string | null,
  NM_PMLK_IJIN: string | null,
  NM_PMLK_IJIN_KTN: string,
  NM_PNYLNGGRA: string,
  NO_DOCUMENT: string | null,
  NO_IMB: string | null,
  NO_IPR: string | null,
  NO_PPR: string,
  NO_TINDAKAN: string | null,
  NO_TLB: string | null,
  NPWP_PMLK_IJIN: string | null,
  NPWP_PMLK_IJIN_KTN: string | null,
  OBJECTID: number,
  OBJECTID_REL: string | null,
  OVL_UNIF: string | null,
  PANJANG: string,
  PELETAKAN: string | null,
  PENENG: string,
  POSISI: string,
  REKLAME_ID: number,
  REKLAME_ID_BPRD: string | null,
  REKLAME_ID_PTSP: string | null,
  REKLAME_ID_SATPOLPP: string | null,
  REL_OBJECTID: string | null,
  STATUS: string | null,
  STATUS_IJIN: string | null,
  STATUS_PAJAK: string | null,
  STRUKTUR: string,
  TELP_PMLK_IJIN: string | null,
  TELP_PNYLNGGRA: string | null,
  TGL_AKHR_PMSNGN: string | null,
  TGL_IJIN: string | null,
  TGL_PASANG: string | null,
  TGL_SURVEY: string,
  TGL_TINDAKAN: string | null,
  THRSLD_INC: string | null,
  TINGGI: string,
  UPDATED_AT: string | null,
  UPDATED_BY: string | null,
  UPDATED_BY_ID: string | null,
  WIL: string,
  WIL_PMLK_IJIN: string | null,
  WIL_PMLK_IJIN_KTN: string,
  X: number,
  Y: number,
}

export interface ReklameArcgisInterface {
  displayFieldName: string;
  fieldAliases: {
    [fieldName: string]: string,
  };
  geometryType: string;
  spatialReference: {
    wkid: number,
    latestWkid: number,
  };
  fields: {
    name: string,
    type: string,
    alias: string,
    length?: number,
  }[];
  features: {
    attributes: BaseAtributInterface
    geometry: {
      x: number,
      y: number,
    },
  }[];
}

export interface FormItem {
  DESCRIPTION: string;
  HAS_CREATE: number;
  HAS_DELETE: number;
  HAS_EDIT: number;
  HAS_VIEW: number;
  INPUT_ID: number;
  INPUT_TYPE_ID: number;
  LABEL: string;
  NAME: string;
  SORT: number;
  TYPE: number;
  USER_GROUP_ID: number;
  USER_GROUP_PRIVILEGE_ID: number;
}