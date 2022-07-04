export enum JobActionType {
    FETCH_JOBS = 'FETCH_JOBS',
    FETCH_PAGE = 'FETCH_PAGE',
    FETCH_FAVOUR = 'ADD_FAVOUR',
    ADD_FAVOUR = "ADD_FAVOUR",
    GET_FAVOUR="GET_FAVOUR"
};
export type Profile = {
    email: string;
    phone: string;
    fname: string;
    sname:string;
    
}
export type Job = {
    id: string;
    name: string;
    department: string | null;
    has_test: boolean;
    area: Area;
    salary: Salary | null;
    schedule: Schedule;
    published_at: string;
    created_at: string;
    description: string;  
    snippet: Snippet;  
    employer: Employer;

};
export type Area = {
    id: string;
    name: string | null;
    url: string | null;
}
export type Salary = {
    from?: number | null ;
    to?: number | null ;
    currency: string;
    gross: boolean;
}
export type Employer = {
    name?: string;
}
export type Snippet= {
    requirement: string | null;
    responsibility: string | null;
}
type Schedule = {
    id: string| null;
    name: string| null;
}
export type JobState = {
    jobs: Job[];
    loading: boolean;
    page: number;
    total_page: number;
    per_page: number;
    favourites: Job[];
};
export type FetchJobAction = {
    type: JobActionType.FETCH_JOBS,
    payload: any;
};
export type FetchPageInfo = {
    type: JobActionType.FETCH_PAGE,
    payload: any;
};
export type FetchFavour = {
    type: JobActionType.GET_FAVOUR,
    payload: any;
};
export type FetchAddFavour = {
    type: JobActionType.ADD_FAVOUR,
    payload: any;
};
export type JobAction = FetchJobAction | FetchPageInfo | FetchFavour | FetchAddFavour;
 