export interface Endings {
  branches: Branches;
  neutral_routes: NeutralRoutes;
  neutral_endings: NeutralEndings;
}

export interface Branches {
  name: string;
  children: BranchesChild[];
}

export interface BranchesChild {
  name: string;
  children: PurpleChild[];
}

export interface PurpleChild {
  name: string;
  children: FluffyChild[];
}

export interface FluffyChild {
  name: string;
  children?: TentacledChild[];
  note?: string;
}

export interface TentacledChild {
  name: string;
  note?: string;
  children?: StickyChild[];
}

export interface StickyChild {
  name: string;
  children?: IndigoChild[];
  note?: string;
}

export interface IndigoChild {
  name: string;
  children?: IndecentChild[];
  note?: string;
}

export interface IndecentChild {
  name: string;
  note: string;
}

export interface NeutralEndings {
  name: string;
  children: NeutralEndingsChild[];
}

export interface NeutralEndingsChild {
  name: string;
  condition: string;
  children: HilariousChild[];
}

export interface HilariousChild {
  name: string;
}

export interface NeutralRoutes {
  name: string;
  children: NeutralRoutesChild[];
}

export interface NeutralRoutesChild {
  name: string;
  children: AmbitiousChild[];
}

export interface AmbitiousChild {
  name: string;
  children?: CunningChild[];
}

export interface CunningChild {
  name: string;
  children?: HilariousChild[];
}
