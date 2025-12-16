export interface ITiendas extends Array<ITienda> {}

export interface ITienda {
  name: string;
  url: string;
  price: number;
  id: number;
}
