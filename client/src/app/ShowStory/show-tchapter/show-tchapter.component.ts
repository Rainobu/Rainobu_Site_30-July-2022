import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowstoryService } from 'src/app/_services/showstory.service';
@Component({
  selector: 'app-show-tchapter',
  templateUrl: './show-tchapter.component.html',
  styleUrls: ['./show-tchapter.component.css']
})
export class ShowTChapterComponent implements OnInit{
  chapterList:any;
  currentSection = '1';
  listener;
  constructor(private showStoryService:ShowstoryService,
              private route:ActivatedRoute, 
              private renderer2:Renderer2 
            ) { 
              this.listener = this.renderer2.listen('window', 'scroll', (e) => {
                console.log(this.getYPosition(e));
              });
            }

  ngOnInit(): void {
    this.showStoryService.getStoryNameChapter(this.getStoryName()).subscribe(res =>{
      this.chapterList = res;
    });
    this.AddViews();
    // this.router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
    //   const navigation = this.router.getCurrentNavigation();
    //   tracingService.trace({id: navigation.extras.state.tracingId});
    // });
  }
 
  getStoryName(){
    return this.route.snapshot.params.storyname;
  }
  AddViews(){
    this.showStoryService.getAddViews(this.getStoryName()).subscribe(()=>{
      
    })
  }

  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
    // console.log(this.currentSection);
  }

  scrollTo(section) {
    // console.log(section);
    document.querySelector('#' + section)
    .scrollIntoView();
  }
  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }
  ngOnDestroy(): void {
    this.listener();
}
}