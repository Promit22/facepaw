import Database from 'better-sqlite3';

export const db = new Database('facepaw.db');

// db.exec(`
// CREATE TABLE IF NOT EXISTS users (
// 	id INTEGER PRIMARY KEY,
// 	image TEXT,
// 	name TEXT NOT NULL,
// 	email TEXT NOT NULL UNIQUE,
// 	password TEXT NOT NULL
// );
// `);

// db.exec(`
// CREATE TABLE IF NOT EXISTS sessions (
// 	id TEXT PRIMARY KEY,
// 	user_id INTEGER NOT NULL,
// 	created_at TEXT DEFAULT CURRENT_TIMESTAMP,
// 	FOREIGN KEY (user_id) REFERENCES users(id)
// );
// `);
// db.exec(`
// 	CREATE TABLE IF NOT EXISTS posts (
// 		id INTEGER PRIMARY KEY,
// 		created_At TEXT DEFAULT CURRENT_TIMESTAMP,
// 		user_id INTEGER NOT NULL,
// 		title TEXT,
// 		content TEXT,
// 		likes_count INTEGER DEFAULT 0,
// 		FOREIGN KEY (user_id) REFERENCES users(id)
// 	);
// 	`);

// db.exec(`
// 	CREATE TABLE IF NOT EXISTS image (
// 		id INTEGER PRIMARY KEY,
// 		post_id INTEGER NOT NULL,
// 		path TEXT,
// 		FOREIGN KEY (post_id) REFERENCES posts(id)
// 	);
// 	`);

// db.exec(`
// 	CREATE TABLE  IF NOT EXISTS post_likes (
// 		post_id INTEGER NOT NULL,
// 		user_id	INTEGER NOT NULL,

// 		PRIMARY KEY (post_id, user_id) ,

// 		FOREIGN KEY(post_id)
// 		REFERENCES posts(id) ON DELETE CASCADE,

// 		FOREIGN KEY (user_id)
// 		REFERENCES users(id) ON DELETE CASCADE
// 	);
// 	`);

// db.exec(`
// CREATE TABLE IF NOT EXISTS password_reset (
// 	id INTEGER PRIMARY KEY,
// 	user_id INTEGER,
// 	token_hash TEXT,
// 	expires_at TEXT,
// 	created_at TEXT DEFAULT CURRENT_TIMESTAMP,
// 	FOREIGN KEY(user_id) REFERENCES users(id)
// );
// `);

// db.exec(`
// CREATE TABLE IF NOT EXISTS quiz (
// 	id TEXT PRIMARY KEY,
// 	questions TEXT NOT NULL,
// 	expiresAt INTEGER NOT NULL,
// 	createdAt INTEGER NOT NULL
// );
// `);

// db.exec(`
// CREATE TABLE IF NOT EXISTS users_answer (
// 	id TEXT NOT NULL,
// 	qId TEXT NOT NULL,
// 	answer TEXT NOT NULL,
// 	createdAt INTEGER NOT NULL,
// 	PRIMARY KEY (id, qId)
// );
// `);

db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    image TEXT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    best_score_cat INTEGER,
    best_accuracy_cat INTEGER,
    best_score_dog INTEGER,
    best_accuracy_dog INTEGER,
    best_score_hybrid INTEGER,
    best_accuracy_hybrid INTEGER
);
`);

db.exec(`
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    /* Updated default format */
    created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY,
        /* Updated default format */
        created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
        user_id INTEGER NOT NULL,
        title TEXT,
        content TEXT,
        likes_count INTEGER DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    `);

db.exec(`
    CREATE TABLE IF NOT EXISTS image (
        id INTEGER PRIMARY KEY,
        post_id INTEGER NOT NULL,
        path TEXT,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    );  
    `);

db.exec(`
    CREATE TABLE IF NOT EXISTS post_likes (
        post_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        PRIMARY KEY (post_id, user_id),
        FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `);

db.exec(`
CREATE TABLE IF NOT EXISTS password_reset (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    token_hash TEXT,
    expires_at TEXT,
    /* Updated default format */
    created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    FOREIGN KEY(user_id) REFERENCES users(id)
);
`);

// db.exec(`
// CREATE TABLE IF NOT EXISTS quiz (
//     id TEXT PRIMARY KEY,
//     questions TEXT NOT NULL,
//     expiresAt INTEGER NOT NULL,
//     /* Note: Changed to TEXT to support the ISO string default */
//     createdAt TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
// );
// `);

// db.exec(`
// CREATE TABLE IF NOT EXISTS users_answer (
//     id TEXT NOT NULL,
//     qId TEXT NOT NULL,
//     answer TEXT NOT NULL,
//     /* Note: Changed to TEXT to support the ISO string default */
//     createdAt TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
//     PRIMARY KEY (id, qId)
// );
// `);

db.exec(`
   CREATE TABLE IF NOT EXISTS quiz_sessions (
  id          TEXT PRIMARY KEY,
  user_id     INTEGER REFERENCES users(id),
  status      TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'expired')),
  score       INTEGER NOT NULL DEFAULT 0,
  created_at  INTEGER NOT NULL DEFAULT (unixepoch()),
  expires_at  INTEGER NOT NULL              
)
    `);

db.exec(`
      CREATE TABLE IF NOT EXISTS quiz_questions (
      id TEXT PRIMARY KEY, 
      session_id TEXT NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
      position INTEGER NOT NULL,         
      questions TEXT NOT NULL
    );
        `);

db.exec(`
        CREATE TABLE IF NOT EXISTS quiz_answers (
  session_id    TEXT NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  question_id   TEXT NOT NULL,
  given_answer  TEXT NOT NULL,
  is_correct    INTEGER NOT NULL CHECK (is_correct IN (0, 1)),
  PRIMARY KEY (session_id, question_id)
);
    `);

db.exec(`
	CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT
);
`);

// on comment update:

// UPDATE comments SET content = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ? AND user_id = ?

/* 
quiz_sessions   → id, user_id, mode, status, score, expires_at
quiz_questions  → id, session_id, questions (JSON blob), position
quiz_answers    → session_id, question_id, answer, is_correct
*/
