export interface IProfile {
    displayName: string,
    username: string,
    biography: string,
    image: string,
    pictures: IPicture[]
  }
  
  export interface IPicture {
      id: string,
      url: string,
      isMain: boolean
  }
  