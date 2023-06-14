export interface IProfileList {
  totalItems: number
  data: IProfile[]
  totalPages: number
  currentPage: number
}
  
export interface IProfile {
  id: number
  name: string
  code: string
  desciption: string
  establishedOn: Date
  approved: boolean
  creationTime: Date
  lastUpdatedOn: Date
  seasonal: boolean
  logo: string
  popular: boolean
  servicesEnabled: boolean
  donationsEnabled: boolean
  ecommerceEnabled: boolean
  reelsEnabled: boolean
  eventsEnabled: boolean
}

export interface IFile {
  url: string,
  name: string,
}
  