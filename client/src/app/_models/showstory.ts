import { Photo } from "./photo";

export interface ShowStory {
    id:number;
    storyName : string;
    description :string;       
    genre :string;
    language:string;
    imageUrl:string;
    rating:number;
    views:number;
    created:Date;
    state:string;
    userName:string;
    //photos: Photo[];
}