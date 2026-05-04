# FacePaw

FacePaw is a pet-focused web application where users can explore cat and dog breeds, share posts, and test their pet knowledge through an interactive quiz called PawLand.

## Features

- **Breed Explorer** — Browse cats and dogs with detailed info like origin, lifespan, weight, and temperament, with a sliding detail panel for each breed.
- **Posts & Comments** — Users can create posts with image uploads and leave comments.
- **PawLand Quiz** — A timed quiz that tests your knowledge of cat and dog breeds through origin, lifespan, and image-based questions. Supports Cat, Dog, and Hybrid modes.
- **User Accounts** — Register, log in, edit your profile, and track your quiz results.

## Tech Stack

-**Packege Manager** pnpm

- **Framework:** SvelteKit
- **Styling:** Tailwind CSS + shadcn-svelte
- **Database:** SQLite via better-sqlite3
- **Image Processing:** Sharp
- **Data:** Powered by The Cat API and the Dog API

## How to Run

Make sure you have [pnpm](https://pnpm.io) installed on your system, then:

1. Clone the repository

```bash
   git clone https://github.com/Promit22/facepaw.git
   cd facepaw
```

2. Install dependencies

```bash
   pnpm install
```

3. Start the dev server

```bash
   pnpm dev --open
```

also don't forget to provide env as CAT_API_KEY, DOG_API_KEY, GAP(GOOGLE APP PASSWORD), EU(EMAIL USER FOR NODE MAILER)

## File Structure

```
├── components.json
├── data
│   ├── cat_breeds.json
│   └── dog_breeds.json
├── eslint.config.js
├── facepaw.db
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── src
│   ├── app.css
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── assets
│   │   │   ├── server assets
│   │   ├── components
│   │   │   ├── AppSidebar.svelte
│   │   │   ├── BreedCard.svelte
│   │   │   ├── BreedDetailPannel.svelte
│   │   │   ├── CommentDrawer.svelte
│   │   │   ├── Navbar.svelte
│   │   │   ├── PostPreview.svelte
│   │   │   ├── Post.svelte
│   │   │   ├── ui
│   │   │   │   ├── shadcn components
│   │   ├── helper
│   │   │   ├── helper functions
│   │   ├── hooks
│   │   │   └── is-mobile.svelte.ts
│   │   ├── index.ts
│   │   ├── server
│   │   │   ├── db
│   │   │   │   └── db.ts
│   │   │   ├── models
│   │   │   │   ├──db interaction models
│   │   │   └── quiz
│   │   │       └── quizStore.ts
│   │   ├── types
│   │   │   ├── types
│   │   └── utils.ts
│   └── routes
│       ├── account
│       │   ├── connect
│       │   │   ├── +page.server.ts
│       │   │   └── +page.svelte
│       │   ├── edit
│       │   │   ├── +page.server.ts
│       │   │   └── +page.svelte
│       │   ├── forgot-password
│       │   │   ├── +page.server.ts
│       │   │   └── +page.svelte
│       │   ├── profile
│       │   │   └── [id]
│       │   │       ├── +page.server.ts
│       │   │       └── +page.svelte
│       │   └── reset-password
│       │       ├── +page.server.ts
│       │       └── +page.svelte
│       ├── breed
│       │   ├── cat
│       │   │   ├── +page.server.ts
│       │   │   └── +page.svelte
│       │   └── dog
│       │       ├── +page.server.ts
│       │       └── +page.svelte
│       ├── +layout.server.ts
│       ├── +layout.svelte
│       ├── +page.svelte
│       ├── posts
│       │   ├── create
│       │   │   ├── +page.server.ts
│       │   │   └── +page.svelte
│       │   ├── +page.server.ts
│       │   └── +page.svelte
│       └── quiz
│           ├── cat-quiz
│           │   ├── +page.server.ts
│           │   └── +page.svelte
│           ├── dog-quiz
│           │   ├── +page.server.ts
│           │   └── +page.svelte
│           ├── hybrid-quiz
│           │   ├── +page.server.ts
│           │   └── +page.svelte
│           ├── +page.server.ts
│           └── +page.svelte
├── static
│   ├── images
│   │   ├── posts
│   │   │   └── post images
│   │   └── profile
│   │       ├── profile images
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

## Limitations

- The app currently runs on a local SQLite database, so when the free server goes into sleep mode the internal db file might get wiped out which makes it unsuitable for free ephemeral hosting platforms. A migration to Turso is planned.
- File uploads are stored locally, which might not persist on ephemeral deployments either.

## Future Plans

- Leaderboard per quiz mode (Cat, Dog, Hybrid)
- Wrong answer review after quiz completion
- Migration to Turso for cloud-compatible database hosting
- Improved image handling based on portrait vs landscape detection
- Imporved UI
- Happy debugging!
