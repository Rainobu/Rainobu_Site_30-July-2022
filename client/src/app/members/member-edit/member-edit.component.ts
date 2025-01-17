import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member :Member;
  user : User;
  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  constructor(private accountService:AccountService,private memberServcice:MembersService,
      private toastr:ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.loadMember();
  }
  loadMember(){
    this.memberServcice.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }
  updateMember(){
    //console.log(this.member)
    this.memberServcice.updateMember(this.member).subscribe(() => {
       this.toastr.success('Profile update successfully');
       this.editForm.reset(this.member);
    })
  }
}
