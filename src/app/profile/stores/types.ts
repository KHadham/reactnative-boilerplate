export type basicData = {
  email: string,
  id_user: string,
  nama: string,
  nik: string,
  nrk: string,
  passport: string,
  telepon: string,
  username: string,
};

export interface employeeData {
  id_pegawai: string;
  nip: string;
  nrk: string;
  nama_pegawai: string;
  email: string;
  telepon: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  agama: string;
  usia: string | null;
  status_pegawai: string;
  masa_kerja: string;
  tanggal_pengangkatan_cpns: string | null;
  alamat: string;
  kode_kelurahan: string;
  nama_kelurahan: string;
  kode_kecamatan: string;
  nama_kecamatan: string;
  kode_kabupaten: string;
  nama_kabupaten: string;
  kode_provinsi: string;
  nama_provinsi: string;
  alamat_ktp: string;
  kode_kelurahan_ktp: string;
  nama_kelurahan_ktp: string;
  kode_kecamatan_ktp: string;
  nama_kecamatan_ktp: string;
  kode_kabupaten_ktp: string;
  nama_kabupaten_ktp: string;
  kode_provinsi_ktp: string;
  nama_provinsi_ktp: string;
  is_check: string | null;
  longitude: string;
  latitude: string;
  pendidikan: string;
  pendidikan_bkd: string;
  asal_sekolah: string | null;
  tgl_lulus: string | null;
  status_nikah: string;
  status_pegawai_pangkat: string | null;
  id_golongan: string;
  nomor_sk_pangkat: string | null;
  tanggal_sk_pangkat: string | null;
  tanggal_mulai_pangkat: string;
  tanggal_selesai_pangkat: string | null;
  id_status_jabatan: string;
  id_rumpun_jabatan: string;
  id_jabatan: string;
  id_bidang: string | null;
  jfu: string;
  unit_kerja: string | null;
  id_unit_kerja: string | null;
  id_satuan_kerja: string | null;
  lokasi_kerja: string;
  sublokasi_kerja: string | null;
  seksi: string;
  id_seksi: string;
  nomor_sk_jabatan: string | null;
  tanggal_sk_jabatan: string | null;
  tanggal_mulai_jabatan: string | null;
  tanggal_selesai_jabatan: string | null;
  id_eselon: string | null;
  tmt_eselon: string | null;
  signature: string;
  foto: string;
  thumb_foto: string;
  golongan: string;
  eselon: string | null;
  nama_status_jabatan: string;
  jabatan: string;
  nama_lokasi_kerja: string;
  sub_lokasi_kerja: string;
  lingkup_tugas: string;
  sub_lingkup_tugas: string;
  nama_rumpun_jabatan: string;
  nama_status_pegawai: string;
}

export interface personalData {
  ukpd: string;
  skpd: string;
  kodepos: number;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kelurahan: string;
  user_group: string;
  instansi: string | null;
  updated_at: string;
  created_at: string;
  updated_by: string;
  created_by: string;
  passport: string | null;
  nrk: string;
  nik: string | null;
  address: string;
  phone: string;
  email: string;
  name: string;
  id_user: string;
}

export interface useProfileStoreInterface {
  user: basicData
  setUserDetail: (data: basicData) => void
  personal: personalData
  setPersonalDetail: (data: personalData) => void
  employee: employeeData
  setEmployeeDetail: (data: employeeData) => void
}