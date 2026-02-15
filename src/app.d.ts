// See https://svelte.dev/docs/kit/types#app.d.ts

import type { User } from '$lib/types/user';

interface Weight {
	imperial?: string;
	metric?: string;
}

interface Height {
	imperial?: string;
	metric?: string;
}

interface Image {
	id?: string;
	url?: string;
	width?: number;
	height?: number;
}

interface Weight {
	imperial?: string;
	metric?: string;
}

interface Image {
	id?: string;
	width?: number;
	height?: number;
	url?: string;
}

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
		}
		interface DogBreed {
			id?: string;
			name?: string;
			species_id?: string;
			life_span?: string;
			temperament?: string;
			origin?: string;
			country_codes?: string;
			country_code?: string;
			description?: string;
			bred_for?: string | null;
			perfect_for?: string | null;
			breed_group?: string;
			history?: string;
			reference_image_id?: string;
			weight?: Weight;
			height?: Height;
			image?: Image;
		}
		interface Cats {
			weight?: Weight;
			id?: string;
			name?: string;
			breed_group?: string | null;
			cfa_url?: string;
			vetstreet_url?: string;
			vcahospitals_url?: string;
			temperament?: string;
			origin?: string;
			country_codes?: string;
			country_code?: string;
			description?: string;
			life_span?: string;
			indoor?: number;
			lap?: number;
			alt_names?: string;
			adaptability?: number;
			affection_level?: number;
			child_friendly?: number;
			dog_friendly?: number;
			energy_level?: number;
			grooming?: number;
			health_issues?: number;
			intelligence?: number;
			shedding_level?: number;
			social_needs?: number;
			stranger_friendly?: number;
			vocalisation?: number;
			experimental?: number;
			hairless?: number;
			natural?: number;
			rare?: number;
			rex?: number;
			suppressed_tail?: number;
			short_legs?: number;
			wikipedia_url?: string;
			hypoallergenic?: number;
			reference_image_id?: string;
			image?: Image;
		}

		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
