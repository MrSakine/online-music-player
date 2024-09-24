import { MusicModel } from "./MusicModel";

export interface TrackModel {
  title: string;
  file: string;
  index: number;
}

export interface AlbumModel extends MusicModel {
  tracks: Array<TrackModel>;
}