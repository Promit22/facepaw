# FacePaw

FacePaw is a pet-focused web application where users can explore cat and dog breeds, share posts, and test their pet knowledge through an interactive quiz called PawLand.

## Features

- **Breed Explorer** — Browse cats and dogs with detailed info like origin, lifespan, weight, and temperament, with a sliding detail panel for each breed.
- **Posts & Comments** — Users can create posts with image uploads and leave comments.
- **PawLand Quiz** — A timed quiz that tests your knowledge of cat and dog breeds through origin, lifespan, and image-based questions. Supports Cat, Dog, and Hybrid modes.
- **User Accounts** — Register, log in, edit your profile, and track your quiz results.

## Tech Stack

- **Framework:** SvelteKit
- **Styling:** Tailwind CSS + shadcn-svelte
- **Database:** SQLite via better-sqlite3
- **Image Processing:** Sharp
- **Data:** Powered by The Cat API and the Dog API

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
│   │   │   ├── ctaImageOne.webp
│   │   │   ├── ctaImageTwo.webp
│   │   │   ├── favicon.svg
│   │   │   ├── hero.webp
│   │   │   ├── IMG-20250822-WA0001.jpg
│   │   │   ├── quizHero.webp
│   │   │   ├── test.webp
│   │   │   └── unavailable.webp
│   │   ├── components
│   │   │   ├── AppSidebar.svelte
│   │   │   ├── BreedCard.svelte
│   │   │   ├── BreedDetailPannel.svelte
│   │   │   ├── CommentDrawer.svelte
│   │   │   ├── Navbar.svelte
│   │   │   ├── PostPreview.svelte
│   │   │   ├── Post.svelte
│   │   │   ├── ui
│   │   │   │   ├── alert
│   │   │   │   │   ├── alert-description.svelte
│   │   │   │   │   ├── alert.svelte
│   │   │   │   │   ├── alert-title.svelte
│   │   │   │   │   └── index.ts
│   │   │   │   ├── avatar
│   │   │   │   │   ├── avatar-fallback.svelte
│   │   │   │   │   ├── avatar-image.svelte
│   │   │   │   │   ├── avatar.svelte
│   │   │   │   │   └── index.ts
│   │   │   │   ├── badge
│   │   │   │   │   ├── badge.svelte
│   │   │   │   │   └── index.ts
│   │   │   │   ├── button
│   │   │   │   │   ├── button.svelte
│   │   │   │   │   └── index.ts
│   │   │   │   ├── card
│   │   │   │   │   ├── card-action.svelte
│   │   │   │   │   ├── card-content.svelte
│   │   │   │   │   ├── card-description.svelte
│   │   │   │   │   ├── card-footer.svelte
│   │   │   │   │   ├── card-header.svelte
│   │   │   │   │   ├── card.svelte
│   │   │   │   │   ├── card-title.svelte
│   │   │   │   │   └── index.ts
│   │   │   │   ├── drawer
│   │   │   │   │   ├── drawer-close.svelte
│   │   │   │   │   ├── drawer-content.svelte
│   │   │   │   │   ├── drawer-description.svelte
│   │   │   │   │   ├── drawer-footer.svelte
│   │   │   │   │   ├── drawer-header.svelte
│   │   │   │   │   ├── drawer-nested.svelte
│   │   │   │   │   ├── drawer-overlay.svelte
│   │   │   │   │   ├── drawer-portal.svelte
│   │   │   │   │   ├── drawer.svelte
│   │   │   │   │   ├── drawer-title.svelte
│   │   │   │   │   ├── drawer-trigger.svelte
│   │   │   │   │   └── index.ts
│   │   │   │   ├── input
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── input.svelte
│   │   │   │   ├── label
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── label.svelte
│   │   │   │   ├── separator
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── separator.svelte
│   │   │   │   ├── sheet
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── sheet-close.svelte
│   │   │   │   │   ├── sheet-content.svelte
│   │   │   │   │   ├── sheet-description.svelte
│   │   │   │   │   ├── sheet-footer.svelte
│   │   │   │   │   ├── sheet-header.svelte
│   │   │   │   │   ├── sheet-overlay.svelte
│   │   │   │   │   ├── sheet-portal.svelte
│   │   │   │   │   ├── sheet.svelte
│   │   │   │   │   ├── sheet-title.svelte
│   │   │   │   │   └── sheet-trigger.svelte
│   │   │   │   ├── sidebar
│   │   │   │   │   ├── constants.ts
│   │   │   │   │   ├── context.svelte.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── sidebar-content.svelte
│   │   │   │   │   ├── sidebar-footer.svelte
│   │   │   │   │   ├── sidebar-group-action.svelte
│   │   │   │   │   ├── sidebar-group-content.svelte
│   │   │   │   │   ├── sidebar-group-label.svelte
│   │   │   │   │   ├── sidebar-group.svelte
│   │   │   │   │   ├── sidebar-header.svelte
│   │   │   │   │   ├── sidebar-input.svelte
│   │   │   │   │   ├── sidebar-inset.svelte
│   │   │   │   │   ├── sidebar-menu-action.svelte
│   │   │   │   │   ├── sidebar-menu-badge.svelte
│   │   │   │   │   ├── sidebar-menu-button.svelte
│   │   │   │   │   ├── sidebar-menu-item.svelte
│   │   │   │   │   ├── sidebar-menu-skeleton.svelte
│   │   │   │   │   ├── sidebar-menu-sub-button.svelte
│   │   │   │   │   ├── sidebar-menu-sub-item.svelte
│   │   │   │   │   ├── sidebar-menu-sub.svelte
│   │   │   │   │   ├── sidebar-menu.svelte
│   │   │   │   │   ├── sidebar-provider.svelte
│   │   │   │   │   ├── sidebar-rail.svelte
│   │   │   │   │   ├── sidebar-separator.svelte
│   │   │   │   │   ├── sidebar.svelte
│   │   │   │   │   └── sidebar-trigger.svelte
│   │   │   │   ├── skeleton
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── skeleton.svelte
│   │   │   │   ├── textarea
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── textarea.svelte
│   │   │   │   └── tooltip
│   │   │   │       ├── index.ts
│   │   │   │       ├── tooltip-content.svelte
│   │   │   │       ├── tooltip-portal.svelte
│   │   │   │       ├── tooltip-provider.svelte
│   │   │   │       ├── tooltip.svelte
│   │   │   │       └── tooltip-trigger.svelte
│   │   │   └── UserIcon.svelte
│   │   ├── helper
│   │   │   ├── number.ts
│   │   │   ├── questionHelper.ts
│   │   │   ├── randomid.ts
│   │   │   └── string.ts
│   │   ├── hooks
│   │   │   └── is-mobile.svelte.ts
│   │   ├── index.ts
│   │   ├── server
│   │   │   ├── db
│   │   │   │   └── db.ts
│   │   │   ├── models
│   │   │   │   ├── breedCache.ts
│   │   │   │   ├── comments.ts
│   │   │   │   ├── email.ts
│   │   │   │   ├── imageService.ts
│   │   │   │   ├── image.ts
│   │   │   │   ├── posts.ts
│   │   │   │   ├── question.ts
│   │   │   │   ├── sessions.ts
│   │   │   │   └── users.ts
│   │   │   └── quiz
│   │   │       └── quizStore.ts
│   │   ├── types
│   │   │   ├── breed.ts
│   │   │   ├── post.ts
│   │   │   ├── quizQuestion.ts
│   │   │   └── user.ts
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
│   │   │   └── bed87eab-7a8e-486b-a20f-57575e723c61.webp
│   │   └── profile
│   │       ├── 4403e0e7-2c52-4006-a089-f6e4354a663a.webp
│   │       ├── 82d4e4cb-4ead-4137-9616-331ec74b8280.webp
│   │       ├── dd44489e-3427-4887-98d8-c4e6b047cff8.webp
│   │       └── e05fad4d-6111-4290-b279-71bc3f10841a.webp
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

## Limitations

- The app currently runs on a local SQLite database, which makes it unsuitable for free ephemeral hosting platforms. A migration to Turso (libSQL) is planned.
- File uploads are stored locally, which won't persist on ephemeral deployments either.

## Future Plans

- Leaderboard per quiz mode (Cat, Dog, Hybrid)
- Wrong answer review after quiz completion
- Migration to Turso for cloud-compatible database hosting
- Improved image handling based on portrait vs landscape detection
- Happy debugging!
