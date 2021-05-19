import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserManagementComponent } from '../admin/user-management/user-management.component';
import { ShowStory } from '../_models/showstory';
import { StoryParams } from '../_models/storyParams';
import { User } from '../_models/user';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class ShowstoryService {
  baseUrl = environment.apiUrl;
  showStories : ShowStory[] = [];
  showStory : ShowStory;
  showStoryCache = new Map();
  user :User;
  storyParams:StoryParams;
  constructor(private http:HttpClient,private accountService:AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.storyParams = new StoryParams(user);
    })
  }
  getStoryParams(){
    return this.storyParams;
  }

  setStoryParams(params: StoryParams){
    this.storyParams = params;
  }
  resetStoryParams(){
    this.storyParams = new StoryParams(this.user);
    return this.storyParams;
  }
  getShowStory(StoryParams:StoryParams){
    var response = this.showStoryCache.get(Object.values(StoryParams).join('-'));
    if(response){
      return of(response);
    }
    let params = getPaginationHeaders(StoryParams.pageNumber,StoryParams.pageSize);
        params = params.append('genre',StoryParams.genre.toString());
    // params = params.append('author',StoryParams.author.toString());
        params = params.append('orderBy',StoryParams.orderBy);
    return getPaginatedResult<ShowStory[]>(this.baseUrl+'showstory',params,this.http)
        .pipe(map(response => {
          console.log(response);
          this.showStoryCache.set(Object.values(StoryParams).join('-'),response);
          
          return response;
        }))
  }
  getStory(storyId:number){
    // const member = this.members.find(x=>x.username === username);
    // if(member !== undefined) return of(member);
    const story = [...this.showStoryCache.values()]
      .reduce((arr,elem)=> arr.concat(elem.result),[])
      .find((showStory:ShowStory)=> showStory.id === storyId);

      if(story){
        return of(story);
      }

    
    return this.http.get<ShowStory>(this.baseUrl + 'showstory/' + storyId);
  }
  getStoryName(storyName:string){
    const showstory = [...this.showStoryCache.values()]
      .reduce((arr,elem)=> arr.concat(elem.result),[])
      .find((showStory:ShowStory)=> showStory.storyName===storyName);
      if(showstory){
        return of(showstory);
      }
      return this.http.get<ShowStory>(this.baseUrl+'showstory/'+storyName);
  }

  getGenreList(){
    return this.http.get(this.baseUrl + 'story/GetAllGenre') ;
  }
  
}
