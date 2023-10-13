export type CollectionTitleType = {
  title: string;
  classes: string;
  graphCurrency?: string;
  link?: {
    linkRef?: any;
    text?: string
  }
  classBlock?: string;
};

export type GraphCollectinTitleType = {
  classes: string;
  title: string;
  graphCurrency: string | number;
};
