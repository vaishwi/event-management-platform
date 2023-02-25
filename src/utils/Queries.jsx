export const GET_EVENTS = `
query{
  events(pagination: { limit: 10 }){
    data{
      id
      attributes{
        title
        description
        image{
          data{
            attributes{
              url
            }
          }
        }
        price
        slug
        start_date
        status
        address
        city
      }
    }
  }
}`;