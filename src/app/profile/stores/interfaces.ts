export interface basicData {
  email: string;
  id_user: string;
  nama: string;
  nik: string;
  nrk: string;
  passport: string;
  telepon: string;
  username: string;
};

export interface employeeData {
  nama_pegawai: string;
  nip: string;
  nrk: string;
  email: string;
  telepon: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  agama: string;
  status_nikah: string;
  pendidikan: string;
  pendidikan_bkd: string;
  nama_status_pegawai: string;
  golongan: string;
  tanggal_mulai_pangkat: string;
  nama_status_jabatan: string;
  nama_rumpun_jabatan: string;
  jabatan: string;
  nama_lokasi_kerja: string;
  sub_lokasi_kerja: string;
  sub_lingkup_tugas: string;
  nama_kelurahan: string;
  nama_kecamatan: string;
  nama_kabupaten: string;
  nama_provinsi: string;
  alamat: string;
  nama_kelurahan_ktp: string;
  nama_kecamatan_ktp: string;
  nama_kabupaten_ktp: string;
  nama_provinsi_ktp: string;
  alamat_ktp: string;
  signature: '',
  foto: '',
}

export interface personalData {
  address: string;
  created_at: string;
  created_by: string;
  email: string;
  file_ktp: null|number|string;
  id_user: string;
  instansi: null|number|string;
  kabupaten: string;
  kecamatan: string;
  kelurahan: string;
  kodepos: number, 
  name: string;
  nik: null|number|string;
  nip: null|number|string;
  nrk: null|number|string;
  passport: null|number|string;
  phone: string;
  provinsi: string;
  rt: null|number|string;
  rw: null|number|string;
  updated_at: string;
  updated_by: string;
  user_group: string;
}

export const unexpectedData = {
  ukpd: '',
  skpd: '',
  id_user: '',
  kodepos: '',
  instansi: '',
  updated_at: '',
  created_at: '',
  updated_by: '',
  created_by: '',
  usia: '',
  id_pegawai: '',
  masa_kerja: '',
  tanggal_pengangkatan_cpns: '',
  kode_kelurahan: '',
  kode_kecamatan: '',
  kode_kabupaten: '',
  kode_provinsi: '',
  kode_kelurahan_ktp: '',
  kode_kecamatan_ktp: '',
  kode_kabupaten_ktp: '',
  kode_provinsi_ktp: '',
  is_check: '',
  longitude: '',
  latitude: '',
  status_pegawai: '',
  asal_sekolah: '',
  tgl_lulus: '',
  status_pegawai_pangkat: '',
  id_golongan: '',
  nomor_sk_pangkat: '',
  tanggal_sk_pangkat: '',
  tanggal_selesai_pangkat: '',
  id_status_jabatan: '',
  id_rumpun_jabatan: '',
  id_jabatan: '',
  id_bidang: '',
  jfu: '',
  unit_kerja: '',
  id_unit_kerja: '',
  id_satuan_kerja: '',
  lokasi_kerja: '',
  sublokasi_kerja: '',
  seksi: '',
  id_seksi: '',
  nomor_sk_jabatan: '',
  tanggal_sk_jabatan: '',
  tanggal_mulai_jabatan: '',
  tanggal_selesai_jabatan: '',
  id_eselon: '',
  tmt_eselon: '',
  thumb_foto: '',
  eselon: '',
  lingkup_tugas: '',
}

export interface useProfileStoreInterface {
  user: basicData
  setUserDetail: (data: basicData) => void
  personal: personalData
  setPersonalDetail: (data: personalData) => void
  employee: employeeData
  setEmployeeDetail: (data: employeeData) => void
}