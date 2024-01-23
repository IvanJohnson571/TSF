export interface AudioDataModel {

  url: string;
  title: string;
  cover: string;

}

export interface AudioDataResponse {

  data: AudioDataModel[];
  success: boolean;

}

export interface EmailResponse {

  data: string;
  success: boolean;

}

export interface videoListModel {
  _id: any;
  nameEN: string;
  nameBG: string;
  videoId: string;
}

export interface AudioListModel {

  big: string;
  medium: string;
  small: string;
  type: string;
  _id: string;

}
