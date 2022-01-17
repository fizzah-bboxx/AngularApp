export const baseUrl = "https://jsonplaceholder.typicode.com";

export type Dictionary = {
    [key: string]: any
}

// User's data structure
export type User = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
      street: string,
      suite: string,
      city: string,
      zipcode: string,
      geo: {
        lat: string,
        lng: string
      }
    },
    phone: string,
    website: string,
    company: {
      name: string,
      catchPhrase: string,
      bs: string
    }
  }

// Post's data structure
export type Post = {
    userId: number,
    id: number,
    title: string,
    body: string
}
