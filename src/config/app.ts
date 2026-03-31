import { ILanguage } from "@/interface/common";

const appConfig = {
    BASE_URL: import.meta.env.VITE_BASE_URL,
    FILE_PATH: import.meta.env.VITE_BASE_URL + '/public',
    ENVIRONMENT : 'development',
    PERSIST_STORE_NAME : 'boilerplate',
	CACHE_TOKEN: '403e7e2b-89be-4ed1-b597-47c37c35bd9e'

}

export const AVAILABLE_LANGUAGES : ILanguage [] = [
	{
		 "code": "en",
		 "dir" : "ltr"
	}
]

export const {ENVIRONMENT, PERSIST_STORE_NAME,BASE_URL, FILE_PATH, CACHE_TOKEN} = appConfig;
export default appConfig;