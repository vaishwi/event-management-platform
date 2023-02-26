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
        country
      }
    }
  }
}`;

export const SEARCH_EVENTS = `
query getEvents($queryString: String!){
  events(
    filters: {or: [{country: { containsi: $queryString }}, {description: { containsi: $queryString }}]}
  ){
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
