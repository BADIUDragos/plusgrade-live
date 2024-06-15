export enum Status {
    Active = "active",
    Cancelled = "cancelled",
    Default = "default"
  }
  
  export const StatusColors: { [key in Status]: string } = {
    [Status.Active]: "#d4edda",
    [Status.Cancelled]: "#f8d7da",
    [Status.Default]: "inherit"
  };