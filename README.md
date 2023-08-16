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

## Data modeling

```js
model Toilet {
   id      String   @id @default(uuid())
   address Address?
   reviews Review[]
   isPaid  Boolean
   price   Int
}

model Address {
   id           String  @id @default(uuid())
   streetNumber String
   street       String
   city         String
   country      String
   toiletId     String  @unique
   toilet       Toilet? @relation(fields: [toiletId], references: [id], onUpdate: Cascade, onDelete: Cascade)
}

model Review {
   id            String   @id @default(uuid())
   cleanliness   Float
   performance   Float
   description   String?  @db.VarChar(1024)
   contributedBy String   @unique
   password      String
   toiletId      String
   toilet        Toilet?  @relation(fields: [toiletId], references: [id], onUpdate: Cascade, onDelete: Cascade)
   createdAt     DateTime @default(now())
   updatedAt     DateTime @updatedAt
}
```

## Tech Stack

### Backend

1. Main Backend
   - [x] Nest.js
2. API
   - [x] GraphQL
3. Database
   - [x] PostgreQL

### Frontend

1. Framerwork
   - [x] Next.js
2. Tailwind.css

### Utilities

1. Map API
   - [ ] Google
   - [ ] Others if any

### Deploy

1. Backend Candidates
   - [x] Google Cloud Run

2. Frontend
   - [ ] AWS Amplify
   - [ ] Vercel
