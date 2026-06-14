export interface TreeRoot {
  children: Map<string, SuscriptionNode>;
};

export interface SuscriptionNode {
  suscription: string;
  children?: Map<string, TopicNode>;
};

export interface TopicNode {
  label: string;
  fullPath?: string;
  children?: Map<string, TopicNode>;
};