export interface Icon {
  name: string;
  character: string;
  unicode: string;
  hex: string;
  dec: string;
  entity: string;
  css: string;
  tags?: string[];
  category?: string;
  favorite: boolean;
}
export interface Icons {
  [key: string]: Icon[];
}
