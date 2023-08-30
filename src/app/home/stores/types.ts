export interface AppDetails {
  name: string;
  icon: string;
  thumbnail: string;
  url: string;
  description: string;
  has_mobile_app: null | boolean;
  hide_on_mobile: null | boolean;
  mobile_class_name: null | string;
}

export interface useStoreInterface {
  apps: AppDetails[]
  setApp: (apps: AppDetails[]) => void
}