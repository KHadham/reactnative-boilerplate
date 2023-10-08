import {
  AttachmentInterface,
  ResponseAtributInterface,
  BaseAtributInterface,
  ReklameArcgisInterface,
  FormItem,
} from './interfaces';

export const AttachmentData: AttachmentInterface = {
  filename: '',
  url: '',
};

export const ResponseAtributData: ResponseAtributInterface = {
  ALMT_PMLK_IJIN: null,
  ALMT_PMLK_IJINI_KTN: null,
  ATTACHMENT: [AttachmentData],
  BERADA_DI: null,
  BERBAHAYA: null,
  CAT_BERBAHAYA: null,
  CAT_KONDISI: null,
  CREATED_AT: '',
  CREATED_BY: '',
  CREATED_BY_ID: null,
  DIPASANG_PADA: null,
  EMAIL_PMLK_IJIN: null,
  EMAIL_PMLK_IJIN_KTN: null,
  INFO_PNYLNGGRA: null,
  JENIS: '',
  JENIS_TINDAKAN: null,
  KAWASAN: '',
  KD_BERADA_DI: null,
  KD_BERBAHAYA: null,
  KD_DIPASANG_PADA: null,
  KD_JENIS: null,
  KD_JENIS_TINDAKAN: null,
  KD_KAWASAN: null,
  KD_KEC: '',
  KD_KEC_PMLK_IJIN: '',
  KD_KEC_PMLK_IJIN_KTN: '',
  KD_KEL: '',
  KD_KEL_PMLK_IJIN: '',
  KD_KEL_PMLK_IJIN_KTN: '',
  KD_KONDISI: null,
  KD_LINGKUP: null,
  KD_MUKA: null,
  KD_PELETAKAN: null,
  KD_POSISI: null,
  KD_STATUS: null,
  KD_STATUS_IJIN: null,
  KD_STATUS_PAJAK: null,
  KD_STRUKTUR: null,
  KD_WIL: '',
  KD_WIL_PMLK_IJIN: '',
  KD_WIL_PMLK_IJIN_KTN: '',
  KEC: '',
  KEC_PMLK_IJIN: null,
  KEC_PMLK_IJIN_KTN: null,
  KEL: '',
  KEL_PMLK_IJIN: null,
  KEL_PMLK_IJIN_KTN: null,
  KET_LAINNYA: '',
  KODE: '',
  KOMENTAR: null,
  KONDISI: '',
  KONTEN: '',
  LEBAR: '',
  LINGKUP: '',
  LOKASI: '',
  MS_HBS_BRLKU: null,
  MS_IJIN: null,
  MUKA: null,
  NIK_PMLK_IJIN: null,
  NIK_PMLK_IJIN_KTN: null,
  NILAI_PAJAK: null,
  NM_PMLK_IJIN: null,
  NM_PMLK_IJIN_KTN: null,
  NM_PNYLNGGRA: null,
  NO_IMB: null,
  NO_IPR: null,
  NO_PPR: null,
  NO_TINDAKAN: null,
  NO_TLB: null,
  NPWP_PMLK_IJIN: null,
  NPWP_PMLK_IJIN_KTN: null,
  OBJECTID: 11553,
  PANJANG: '',
  PELETAKAN: null,
  PENENG: null,
  POSISI: '',
  REKLAME_ID: 1143,
  REL_OBJECTID: '',
  STATUS: null,
  STATUS_IJIN: null,
  STATUS_PAJAK: null,
  STRUKTUR: '',
  TELP_PMLK_IJIN: null,
  TELP_PNYLNGGRA: null,
  TGL_AKHR_PMSNGN: null,
  TGL_IJIN: null,
  TGL_PASANG: null,
  TGL_SURVEY: null,
  TGL_TINDAKAN: null,
  TINGGI: '',
  UPDATED_AT: null,
  UPDATED_BY: null,
  UPDATED_BY_ID: null,
  WIL: '',
  WIL_PMLK_IJIN: null,
  WIL_PMLK_IJIN_KTN: null,
  X: 106.75051833,
  Y: -6.23672,
};

export const BaseAtributData: BaseAtributInterface = {
  ALMT_PMLK_IJIN: '',
  ALMT_PMLK_IJINI_KTN: '',
  BERADA_DI: '',
  BERBAHAYA: '',
  CAT_BERBAHAYA: '',
  CAT_KONDISI: '',
  CAT_PENINDAKAN: '',
  CREATED_AT: '',
  CREATED_BY: '',
  CREATED_BY_ID: 0,
  DIPASANG_PADA: '',
  EMAIL_PMLK_IJIN: '',
  EMAIL_PMLK_IJIN_KTN: '',
  GROUP_BY: '',
  GROUP_BY_ID: 0,
  ID_REF: '',
  INFO_PNYLNGGRA: '',
  IS_DELETE: 0,
  JENIS: '',
  JENIS_TINDAKAN: '',
  KAWASAN: '',
  KD_BERADA_DI: 0,
  KD_BERBAHAYA: '',
  KD_DIPASANG_PADA: 0,
  KD_JENIS: 0,
  KD_JENIS_TINDAKAN: 0,
  KD_KAWASAN: 0,
  KD_KEC: '',
  KD_KEC_PMLK_IJIN: '',
  KD_KEC_PMLK_IJIN_KTN: '',
  KD_KEL: '',
  KD_KEL_PMLK_IJIN: '',
  KD_KEL_PMLK_IJIN_KTN: '',
  KD_KONDISI: 0,
  KD_LINGKUP: 0,
  KD_MUKA: 0,
  KD_PELETAKAN: 0,
  KD_POSISI: 0,
  KD_STATUS: 0,
  KD_STATUS_IJIN: 0,
  KD_STATUS_PAJAK: 0,
  KD_STRUKTUR: 0,
  KD_WIL: '',
  KD_WIL_PMLK_IJIN: '',
  KD_WIL_PMLK_IJIN_KTN: '',
  KEC: '',
  KEC_PMLK_IJIN: '',
  KEC_PMLK_IJIN_KTN: '',
  KEL: '',
  KEL_PMLK_IJIN: '',
  KEL_PMLK_IJIN_KTN: '',
  KET_LAINNYA: '',
  KODE: '',
  KOMENTAR: '',
  KONDISI: '',
  KONTEN: '',
  LEBAR: '',
  LINGKUP: '',
  LOKASI: '',
  LON_UNIF: '',
  LUM_JALAN: '',
  MS_HBS_BRLKU: '',
  MS_IJIN: '',
  MUKA: '',
  NIK_PMLK_IJIN: '',
  NIK_PMLK_IJIN_KTN: '',
  NILAI_PAJAK: '',
  NM_PMLK_IJIN: '',
  NM_PMLK_IJIN_KTN: '',
  NM_PNYLNGGRA: '',
  NO_DOCUMENT: '',
  NO_IMB: '',
  NO_IPR: '',
  NO_PPR: '',
  NO_TINDAKAN: '',
  NO_TLB: '',
  NPWP_PMLK_IJIN: '',
  NPWP_PMLK_IJIN_KTN: '',
  OBJECTID: 0,
  OBJECTID_REL: '',
  OVL_UNIF: '',
  PANJANG: '',
  PELETAKAN: '',
  PENENG: '',
  POSISI: '',
  REKLAME_ID: 0,
  REKLAME_ID_BPRD: '',
  REKLAME_ID_PTSP: '',
  REKLAME_ID_SATPOLPP: '',
  REL_OBJECTID: '',
  STATUS: '',
  STATUS_IJIN: '',
  STATUS_PAJAK: '',
  STRUKTUR: '',
  TELP_PMLK_IJIN: '',
  TELP_PNYLNGGRA: '',
  TGL_AKHR_PMSNGN: '',
  TGL_IJIN: '',
  TGL_PASANG: '',
  TGL_SURVEY: '',
  TGL_TINDAKAN: '',
  THRSLD_INC: '',
  TINGGI: '',
  UPDATED_AT: '',
  UPDATED_BY: '',
  UPDATED_BY_ID: '',
  WIL: '',
  WIL_PMLK_IJIN: '',
  WIL_PMLK_IJIN_KTN: '',
  X: 0,
  Y: 0,
};

export const ReklameArcgisData: ReklameArcgisInterface = {
  displayFieldName: null,
  fieldAliases: {
    field1: null,
    field2: null,
    // Add aliases for other fields as needed
  },
  geometryType: null,
  spatialReference: {
    wkid: null,
    latestWkid: null,
  },
  fields: [
    {
      name: null,
      type: null,
      alias: null,
    },
    {
      name: null,
      type: null,
      alias: null,
    },
  ],
  features: [
    {
      attributes: BaseAtributData,
      geometry: {
        x: null,
        y: null,
      },
    },
  ],
};

export const FormItemData: FormItem = {
  DESCRIPTION: '',
  HAS_CREATE: 0,
  HAS_DELETE: 0,
  HAS_EDIT: 0,
  HAS_VIEW: 0,
  INPUT_ID: 0,
  INPUT_TYPE_ID: 0,
  LABEL: '',
  NAME: '',
  SORT: 0,
  TYPE: 0,
  USER_GROUP_ID: 0,
  USER_GROUP_PRIVILEGE_ID: 0,
};
