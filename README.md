# Find Your W.C. - Temporary Project Title

## main - www.findyourwc.dev - imaginary domain address

1. select a city
2. maps
3. page description
4. link to contribution

## detail - www.findyourwc.dev/[city]

1. city info
2. city map
   - click one wc - www.findyourwc.dev/[city]/[toilet]
   - wc info shows up
3. link to contribution

## contribution - www.findyourwc.dev/[contribution]

1. email
2. experience
   - description
   - cleanliness
   - overall rating

## data expected - will be specified later

- city

```js
{
    country: string,
    city: string,
    address: string,
    type: string,
    price: number,
    experience {
        cleanliness: float,
        rating: float,
        room_for_improvement: string
    },
    contributors [
        {
            email: string,
            country: string,
            city: string,
            review: string | null, // Reference reviews id
            created_at: Date
        }
    ]
}
```

- review

```js
{
    reviewsId: string @unique,
    contents: string
}
```

## Tech Stack - Will choose each item step by step

### Frontend

1. Framerwork
   [ ] Next.js
   [ ] Svelte
2. Tailwind.css

### Backend

1. Main Backend
   - [x] Nest.js
   - [ ] express.js
2. API
   - [x] GraphQL
3. Database
   - [x] PostgreQL

### Utilities

1. Google Map API
2. Other Map API if any

### Deploy

1. Backend Candidates

   - [ ] Naver Cloud
   - [x] Google Cloud Run

2. Frontend
   - [ ] AWS Amplify
   - [ ] Vercel
