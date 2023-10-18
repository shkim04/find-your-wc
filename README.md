# Find Your W.C. - Temporary Project Title

## Description
The idea of the project got started from some experience about toilets when I traveled. I believe that I am not the only one who urgently wanted to find a nice toilet, ideally free. If it is an emergency toilet situation, the trip will probably end up being a nightmare. 

So, I have been thinking that it would be amazing to have a place where people can share their experiences about toilets such as addresses, price, cleanliness and etc.

This repository is particulary for the backend of the application I am building. 

## Data modeling

```js
model Toilet {
  id      Int      @id @default(autoincrement())
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
  toiletId     Int     @unique
  toilet       Toilet? @relation(fields: [toiletId], references: [id], onUpdate: Cascade, onDelete: Cascade)

  @@unique([country, city, street, streetNumber])
}

model Review {
  id            Int      @id @default(autoincrement())
  cleanliness   Float
  performance   Float
  description   String?  @db.VarChar(1024)
  contributedBy String   @unique
  password      String
  toiletId      Int
  toilet        Toilet?  @relation(fields: [toiletId], references: [id], onUpdate: Cascade, onDelete: Cascade)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### Tech Stack

1. Main Backend
   - Nest.js
2. API
   - GraphQL
3. Database
   - PostgreQL


### Deploy
- Google Cloud Run
